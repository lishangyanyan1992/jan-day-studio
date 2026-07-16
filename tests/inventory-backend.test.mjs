import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const migrationUrl = new URL(
  "../supabase/migrations/202607150001_inventory_backend.sql",
  import.meta.url,
);

test("inventory tables are protected by row level security", async () => {
  const migration = await readFile(migrationUrl, "utf8");
  const protectedTables = [
    "staff_profiles",
    "products",
    "customers",
    "reservations",
    "reservation_items",
    "inventory_movements",
    "activity_log",
  ];

  for (const table of protectedTables) {
    assert.match(migration, new RegExp(`alter table public\\.${table} enable row level security`, "i"));
  }
  assert.match(migration, /private\.is_staff\(\)/i);
  assert.match(migration, /revoke all on public\.products from anon/i);
});

test("reservation confirmation serializes and rechecks availability", async () => {
  const migration = await readFile(migrationUrl, "utf8");

  assert.match(migration, /create or replace function public\.set_reservation_status/i);
  assert.match(migration, /pg_advisory_xact_lock/i);
  assert.match(migration, /event_start <= target\.event_end/i);
  assert.match(migration, /event_end >= target\.event_start/i);
  assert.match(migration, /not enough availability/i);
  assert.match(migration, /reservation items can only be changed while the reservation is a draft/i);
});

test("admin access remains setup-friendly without database credentials", async () => {
  const [protectedLayout, setupGuide] = await Promise.all([
    readFile(new URL("../app/admin/(protected)/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../docs/INVENTORY_SETUP.md", import.meta.url), "utf8"),
  ]);

  assert.match(protectedLayout, /SetupNotice/);
  assert.match(setupGuide, /staff_profiles/);
  assert.match(setupGuide, /NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/);
  assert.match(setupGuide, /single-use email link/i);
});
