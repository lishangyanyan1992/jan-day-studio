-- Jan Day Studio inventory and rental reservation backend.
-- Apply this file through the Supabase SQL editor or Supabase CLI.

create extension if not exists pgcrypto;
create schema if not exists private;

create table if not exists public.staff_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role text not null default 'staff' check (role in ('admin', 'staff')),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function private.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.staff_profiles
    where user_id = (select auth.uid())
      and active = true
  );
$$;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.staff_profiles
    where user_id = (select auth.uid())
      and role = 'admin'
      and active = true
  );
$$;

grant usage on schema private to authenticated;
grant execute on function private.is_staff() to authenticated;
grant execute on function private.is_admin() to authenticated;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  sku text unique,
  name text not null,
  category text not null default 'Uncategorized',
  description text not null default '',
  rental_rate_cents integer not null default 0 check (rental_rate_cents >= 0),
  total_quantity integer not null default 0 check (total_quantity >= 0),
  maintenance_quantity integer not null default 0 check (
    maintenance_quantity >= 0 and maintenance_quantity <= total_quantity
  ),
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete restrict,
  event_start date not null,
  event_end date not null,
  status text not null default 'draft' check (
    status in ('draft', 'hold', 'confirmed', 'picked_up', 'returned', 'cancelled')
  ),
  hold_expires_at timestamptz,
  venue text not null default '',
  fulfillment text not null default 'pickup' check (
    fulfillment in ('pickup', 'delivery', 'unsure')
  ),
  notes text not null default '',
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (event_end >= event_start)
);

create table if not exists public.reservation_items (
  id uuid primary key default gen_random_uuid(),
  reservation_id uuid not null references public.reservations(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null default 0 check (unit_price_cents >= 0),
  created_at timestamptz not null default now(),
  unique (reservation_id, product_id)
);

create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete restrict,
  quantity_delta integer not null check (quantity_delta <> 0),
  reason text not null check (
    reason in ('purchase', 'manual_adjustment', 'damage', 'repair', 'loss', 'return_to_stock')
  ),
  notes text not null default '',
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now()
);

create table if not exists public.activity_log (
  id bigint generated always as identity primary key,
  entity_type text not null,
  entity_id uuid not null,
  action text not null,
  details jsonb not null default '{}'::jsonb,
  actor_id uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now()
);

create index if not exists reservations_event_dates_idx
  on public.reservations (event_start, event_end);
create index if not exists reservations_status_idx
  on public.reservations (status);
create index if not exists reservation_items_product_idx
  on public.reservation_items (product_id);
create index if not exists reservation_items_reservation_idx
  on public.reservation_items (reservation_id);
create index if not exists inventory_movements_product_idx
  on public.inventory_movements (product_id, created_at desc);
create index if not exists activity_log_created_at_idx
  on public.activity_log (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists customers_set_updated_at on public.customers;
create trigger customers_set_updated_at
before update on public.customers
for each row execute function public.set_updated_at();

drop trigger if exists reservations_set_updated_at on public.reservations;
create trigger reservations_set_updated_at
before update on public.reservations
for each row execute function public.set_updated_at();

create or replace function public.ensure_reservation_items_mutable()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  parent_status text;
begin
  select status into parent_status
  from public.reservations
  where id = coalesce(new.reservation_id, old.reservation_id);

  if parent_status <> 'draft' then
    raise exception 'Reservation items can only be changed while the reservation is a draft';
  end if;

  return coalesce(new, old);
end;
$$;

drop trigger if exists reservation_items_require_draft on public.reservation_items;
create trigger reservation_items_require_draft
before insert or update or delete on public.reservation_items
for each row execute function public.ensure_reservation_items_mutable();

create or replace function public.audit_inventory_change()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
declare
  record_id uuid;
begin
  record_id := coalesce(new.id, old.id);
  insert into public.activity_log (entity_type, entity_id, action, details, actor_id)
  values (
    tg_table_name,
    record_id,
    lower(tg_op),
    case
      when tg_op = 'DELETE' then jsonb_build_object('before', to_jsonb(old))
      when tg_op = 'INSERT' then jsonb_build_object('after', to_jsonb(new))
      else jsonb_build_object('before', to_jsonb(old), 'after', to_jsonb(new))
    end,
    (select auth.uid())
  );
  return coalesce(new, old);
end;
$$;

drop trigger if exists products_audit on public.products;
create trigger products_audit
after insert or update or delete on public.products
for each row execute function public.audit_inventory_change();

drop trigger if exists reservations_audit on public.reservations;
create trigger reservations_audit
after insert or update or delete on public.reservations
for each row execute function public.audit_inventory_change();

drop trigger if exists reservation_items_audit on public.reservation_items;
create trigger reservation_items_audit
after insert or update or delete on public.reservation_items
for each row execute function public.audit_inventory_change();

alter table public.staff_profiles enable row level security;
alter table public.products enable row level security;
alter table public.customers enable row level security;
alter table public.reservations enable row level security;
alter table public.reservation_items enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.activity_log enable row level security;

drop policy if exists "Staff can view staff profiles" on public.staff_profiles;
create policy "Staff can view staff profiles"
on public.staff_profiles for select to authenticated
using ((select private.is_staff()));

drop policy if exists "Admins can manage staff profiles" on public.staff_profiles;
create policy "Admins can manage staff profiles"
on public.staff_profiles for all to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

drop policy if exists "Staff can manage products" on public.products;
create policy "Staff can manage products"
on public.products for all to authenticated
using ((select private.is_staff()))
with check ((select private.is_staff()));

drop policy if exists "Staff can manage customers" on public.customers;
create policy "Staff can manage customers"
on public.customers for all to authenticated
using ((select private.is_staff()))
with check ((select private.is_staff()));

drop policy if exists "Staff can manage reservations" on public.reservations;
create policy "Staff can manage reservations"
on public.reservations for all to authenticated
using ((select private.is_staff()))
with check ((select private.is_staff()));

drop policy if exists "Staff can manage reservation items" on public.reservation_items;
create policy "Staff can manage reservation items"
on public.reservation_items for all to authenticated
using ((select private.is_staff()))
with check ((select private.is_staff()));

drop policy if exists "Staff can manage inventory movements" on public.inventory_movements;
create policy "Staff can manage inventory movements"
on public.inventory_movements for all to authenticated
using ((select private.is_staff()))
with check ((select private.is_staff()));

drop policy if exists "Staff can view activity" on public.activity_log;
create policy "Staff can view activity"
on public.activity_log for select to authenticated
using ((select private.is_staff()));

drop policy if exists "Staff can add activity" on public.activity_log;
create policy "Staff can add activity"
on public.activity_log for insert to authenticated
with check ((select private.is_staff()));

create or replace function public.product_availability(
  p_start_date date,
  p_end_date date
)
returns table (
  product_id uuid,
  sku text,
  product_name text,
  total_quantity integer,
  maintenance_quantity integer,
  reserved_quantity bigint,
  available_quantity bigint
)
language sql
stable
security invoker
set search_path = ''
as $$
  select
    p.id,
    p.sku,
    p.name,
    p.total_quantity,
    p.maintenance_quantity,
    coalesce(sum(ri.quantity) filter (
      where r.id is not null
        and (
          r.status in ('confirmed', 'picked_up')
          or (r.status = 'hold' and r.hold_expires_at > now())
        )
    ), 0)::bigint as reserved_quantity,
    greatest(
      p.total_quantity - p.maintenance_quantity - coalesce(sum(ri.quantity) filter (
        where r.id is not null
          and (
            r.status in ('confirmed', 'picked_up')
            or (r.status = 'hold' and r.hold_expires_at > now())
          )
      ), 0),
      0
    )::bigint as available_quantity
  from public.products p
  left join public.reservation_items ri on ri.product_id = p.id
  left join public.reservations r
    on r.id = ri.reservation_id
    and r.event_start <= p_end_date
    and r.event_end >= p_start_date
  where p.active = true
  group by p.id
  order by p.name;
$$;

create or replace function public.adjust_inventory(
  p_product_id uuid,
  p_quantity_delta integer,
  p_reason text,
  p_notes text default ''
)
returns integer
language plpgsql
security invoker
set search_path = ''
as $$
declare
  new_quantity integer;
begin
  if not (select private.is_staff()) then
    raise exception 'Staff access required';
  end if;
  if p_quantity_delta = 0 then
    raise exception 'Quantity adjustment cannot be zero';
  end if;
  if p_reason not in ('purchase', 'manual_adjustment', 'damage', 'repair', 'loss', 'return_to_stock') then
    raise exception 'Invalid inventory adjustment reason';
  end if;

  update public.products
  set total_quantity = total_quantity + p_quantity_delta
  where id = p_product_id
    and total_quantity + p_quantity_delta >= maintenance_quantity
  returning total_quantity into new_quantity;

  if new_quantity is null then
    raise exception 'Adjustment would make usable inventory invalid';
  end if;

  insert into public.inventory_movements (
    product_id, quantity_delta, reason, notes, created_by
  ) values (
    p_product_id, p_quantity_delta, p_reason, coalesce(p_notes, ''), (select auth.uid())
  );

  return new_quantity;
end;
$$;

create or replace function public.set_reservation_status(
  p_reservation_id uuid,
  p_status text
)
returns public.reservations
language plpgsql
security invoker
set search_path = ''
as $$
declare
  target public.reservations;
  line record;
  quantity_available bigint;
begin
  if not (select private.is_staff()) then
    raise exception 'Staff access required';
  end if;
  if p_status not in ('draft', 'hold', 'confirmed', 'picked_up', 'returned', 'cancelled') then
    raise exception 'Invalid reservation status';
  end if;

  select * into target
  from public.reservations
  where id = p_reservation_id
  for update;

  if target.id is null then
    raise exception 'Reservation not found';
  end if;

  if p_status in ('hold', 'confirmed', 'picked_up') then
    for line in
      select product_id, quantity
      from public.reservation_items
      where reservation_id = p_reservation_id
      order by product_id
    loop
      perform pg_advisory_xact_lock(hashtextextended(line.product_id::text, 0));

      select greatest(
        p.total_quantity - p.maintenance_quantity - coalesce(sum(ri.quantity), 0),
        0
      ) into quantity_available
      from public.products p
      left join public.reservation_items ri on ri.product_id = p.id
      left join public.reservations r
        on r.id = ri.reservation_id
        and r.id <> p_reservation_id
        and r.event_start <= target.event_end
        and r.event_end >= target.event_start
        and (
          r.status in ('confirmed', 'picked_up')
          or (r.status = 'hold' and r.hold_expires_at > now())
        )
      where p.id = line.product_id
      group by p.id;

      if line.quantity > coalesce(quantity_available, 0) then
        raise exception 'Not enough availability for product %: requested %, available %',
          line.product_id, line.quantity, coalesce(quantity_available, 0);
      end if;
    end loop;
  end if;

  update public.reservations
  set
    status = p_status,
    hold_expires_at = case
      when p_status = 'hold' then coalesce(hold_expires_at, now() + interval '48 hours')
      else null
    end
  where id = p_reservation_id
  returning * into target;

  return target;
end;
$$;

revoke all on function public.product_availability(date, date) from public;
revoke all on function public.adjust_inventory(uuid, integer, text, text) from public;
revoke all on function public.set_reservation_status(uuid, text) from public;
grant execute on function public.product_availability(date, date) to authenticated;
grant execute on function public.adjust_inventory(uuid, integer, text, text) to authenticated;
grant execute on function public.set_reservation_status(uuid, text) to authenticated;

revoke all on public.staff_profiles from anon;
revoke all on public.products from anon;
revoke all on public.customers from anon;
revoke all on public.reservations from anon;
revoke all on public.reservation_items from anon;
revoke all on public.inventory_movements from anon;
revoke all on public.activity_log from anon;
