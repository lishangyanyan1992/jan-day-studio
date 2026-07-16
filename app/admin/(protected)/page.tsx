import Link from "next/link";
import { requireStaff } from "@/lib/inventory/auth";
import {
  formatDate,
  type ProductAvailability,
  type ReservationListItem,
} from "@/lib/inventory/types";
import { StatusBadge } from "../components";

function todayInChicago() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}

function weekdayInChicago() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
  }).format(new Date());
}

export default async function AdminOverviewPage() {
  const { supabase, profile } = await requireStaff();
  if (!supabase) return null;

  const today = todayInChicago();
  const [productsResult, reservationsResult, availabilityResult] = await Promise.all([
    supabase.from("products").select("id, active, total_quantity, maintenance_quantity"),
    supabase
      .from("reservations")
      .select("*, customers(name, email), reservation_items(quantity)")
      .gte("event_end", today)
      .in("status", ["draft", "hold", "confirmed", "picked_up"])
      .order("event_start")
      .limit(6),
    supabase.rpc("product_availability", { p_start_date: today, p_end_date: today }),
  ]);

  const products = productsResult.data ?? [];
  const reservations = (reservationsResult.data ?? []) as unknown as ReservationListItem[];
  const availability = (availabilityResult.data ?? []) as unknown as ProductAvailability[];
  const totalPieces = products.reduce((total, product) => total + product.total_quantity, 0);
  const maintenancePieces = products.reduce((total, product) => total + product.maintenance_quantity, 0);
  const lowAvailability = availability.filter((product) => product.available_quantity <= 2).length;

  return (
    <main className="admin-page">
      <header className="admin-page-header admin-page-header--overview">
        <div>
          <p className="admin-kicker">{weekdayInChicago()}, studio check-in</p>
          <h1>Good morning, {profile?.display_name}.</h1>
          <p>Here is what is moving through the collection.</p>
        </div>
        <Link className="admin-button" href="/admin/reservations#new">New reservation <span aria-hidden="true">+</span></Link>
      </header>

      <section className="admin-metrics" aria-label="Inventory summary">
        <article><span>Active products</span><strong>{products.filter((product) => product.active).length}</strong><small>styles in the collection</small></article>
        <article><span>Total pieces</span><strong>{totalPieces}</strong><small>physical items tracked</small></article>
        <article><span>Upcoming events</span><strong>{reservations.length}</strong><small>next reservations shown</small></article>
        <article><span>Needs attention</span><strong>{maintenancePieces + lowAvailability}</strong><small>maintenance + low availability</small></article>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <p className="admin-kicker">The next few dates</p>
            <h2>Upcoming reservations</h2>
          </div>
          <Link className="admin-text-link" href="/admin/reservations">View all</Link>
        </div>
        {reservations.length ? (
          <div className="admin-reservation-list">
            {reservations.map((reservation) => (
              <Link href={`/admin/reservations/${reservation.id}`} key={reservation.id} className="admin-reservation-row">
                <time dateTime={reservation.event_start}>
                  <strong>{new Date(`${reservation.event_start}T00:00:00Z`).getUTCDate()}</strong>
                  <span>{new Date(`${reservation.event_start}T00:00:00Z`).toLocaleString("en-US", { month: "short", timeZone: "UTC" })}</span>
                </time>
                <div>
                  <strong>{reservation.customers?.name ?? "Unnamed customer"}</strong>
                  <span>{reservation.venue || "Venue not set"} · {formatDate(reservation.event_start)}</span>
                </div>
                <span>{reservation.reservation_items.reduce((sum, item) => sum + item.quantity, 0)} pieces</span>
                <StatusBadge status={reservation.status} />
                <b aria-hidden="true">→</b>
              </Link>
            ))}
          </div>
        ) : (
          <div className="admin-empty"><p>No upcoming reservations yet.</p><Link href="/admin/reservations#new">Create the first one →</Link></div>
        )}
      </section>

      <section className="admin-split-panels">
        <article className="admin-panel">
          <p className="admin-kicker">Collection health</p>
          <h2>{maintenancePieces ? `${maintenancePieces} pieces need care` : "Everything is event-ready"}</h2>
          <p>{maintenancePieces ? "Review items marked for cleaning, repair, or replacement." : "No pieces are currently marked for maintenance."}</p>
          <Link className="admin-text-link" href="/admin/inventory">Review inventory</Link>
        </article>
        <article className="admin-panel admin-panel--clay">
          <p className="admin-kicker">Quick export</p>
          <h2>Take the collection with you.</h2>
          <p>Download a spreadsheet-friendly inventory snapshot for planning or sharing.</p>
          <a className="admin-text-link" href="/admin/export/inventory">Download inventory CSV</a>
        </article>
      </section>
    </main>
  );
}
