# Inventory backend setup

The admin application is implemented in this repository, but it needs a
Supabase project before it can persist data or authenticate staff.

## 1. Create and configure Supabase

1. Create a Supabase project.
2. Open **SQL Editor** and run
   `supabase/migrations/202607150001_inventory_backend.sql`.
3. Open **Authentication → Users** and create each staff user. Staff sign in
   with a single-use email link, so no shared or temporary password is needed.
   Do not add a public sign-up screen to the site.
4. Copy the new user's UUID and run this once in the SQL editor:

   ```sql
   insert into public.staff_profiles (user_id, display_name, role)
   values ('PASTE-USER-UUID-HERE', 'Yanyan', 'admin');
   ```

Only users present in `staff_profiles` can read or change inventory data. An
admin can add a second user with the same SQL, using either the `admin` or
`staff` role.

## 2. Configure the app

Copy `.env.example` to `.env.local`, then get both values from the Supabase
project's **Connect** dialog:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key
```

Add the same environment variables to the Vercel project before deploying.
Never place a Supabase secret key or service-role key in a
`NEXT_PUBLIC_...` variable.

## 3. Start using it

Run `npm run dev`, then open `/admin/login`. Enter an allowlisted staff email
and use the single-use link delivered to that inbox. The admin application
supports:

- product and quantity management;
- maintenance and damaged-stock tracking;
- customer and reservation creation;
- overlapping-date availability checks;
- holds, confirmations, pickup, return, and cancellation states;
- CSV exports and an audit trail.

Reservation confirmation is enforced in the database. The transaction locks
the relevant product records, rechecks availability, and refuses an operation
that would overbook stock.
