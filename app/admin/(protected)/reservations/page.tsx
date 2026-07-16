import Link from "next/link";
import { requireStaff } from "@/lib/inventory/auth";
import { formatDate, type Product, type ReservationListItem } from "@/lib/inventory/types";
import { createReservationAction } from "../../actions";
import { FlashMessage, StatusBadge } from "../../components";

export default async function ReservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { supabase } = await requireStaff();
  if (!supabase) return null;

  const [{ data: reservationsData }, { data: productsData }, flash] = await Promise.all([
    supabase
      .from("reservations")
      .select("*, customers(name, email), reservation_items(quantity)")
      .order("event_start", { ascending: false }),
    supabase.from("products").select("*").eq("active", true).order("name"),
    searchParams,
  ]);
  const reservations = (reservationsData ?? []) as unknown as ReservationListItem[];
  const products = (productsData ?? []) as unknown as Product[];

  return (
    <main className="admin-page">
      <header className="admin-page-header">
        <div><p className="admin-kicker">Calendar and orders</p><h1>Reservations</h1><p>Create a draft, add pieces, and confirm only after availability is checked.</p></div>
        <a className="admin-button admin-button--outline" href="/admin/export/reservations">Export CSV <span aria-hidden="true">↓</span></a>
      </header>
      <FlashMessage success={flash.success} error={flash.error} />

      <details className="admin-disclosure" id="new" open={!reservations.length}>
        <summary>New reservation <span aria-hidden="true">+</span></summary>
        <form action={createReservationAction} className="admin-form admin-form-grid">
          <label>Customer name<input name="customer_name" required autoComplete="name" /></label>
          <label>Email<input name="customer_email" type="email" autoComplete="email" /></label>
          <label>Phone<input name="customer_phone" type="tel" autoComplete="tel" /></label>
          <label>Venue<input name="venue" placeholder="Venue or pickup" /></label>
          <label>Event start<input name="event_start" type="date" required /></label>
          <label>Event end<input name="event_end" type="date" /></label>
          <label>Fulfillment<select name="fulfillment" defaultValue="pickup"><option value="pickup">Madison pickup</option><option value="delivery">Delivery</option><option value="unsure">Not decided</option></select></label>
          <label>First product<select name="product_id" defaultValue=""><option value="">Add later</option>{products.map((product) => <option value={product.id} key={product.id}>{product.name} · {product.total_quantity - product.maintenance_quantity} usable</option>)}</select></label>
          <label>Quantity<input name="quantity" type="number" min="1" defaultValue="1" /></label>
          <label className="admin-form-span">Notes<textarea name="notes" rows={3} placeholder="Delivery window, ceremony time, styling notes…" /></label>
          <button className="admin-button" type="submit">Create draft <span aria-hidden="true">→</span></button>
        </form>
      </details>

      <section className="admin-panel admin-table-panel">
        <div className="admin-panel-heading"><div><p className="admin-kicker">{reservations.length} records</p><h2>All reservations</h2></div></div>
        {reservations.length ? (
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead><tr><th>Customer</th><th>Event dates</th><th>Venue</th><th>Pieces</th><th>Status</th><th></th></tr></thead>
              <tbody>{reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td><strong>{reservation.customers?.name ?? "Unnamed"}</strong><small>{reservation.customers?.email || "No email"}</small></td>
                  <td>{formatDate(reservation.event_start)}{reservation.event_end !== reservation.event_start ? <small>through {formatDate(reservation.event_end)}</small> : null}</td>
                  <td>{reservation.venue || "—"}</td>
                  <td>{reservation.reservation_items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                  <td><StatusBadge status={reservation.status} /></td>
                  <td><Link className="admin-row-link" href={`/admin/reservations/${reservation.id}`}>Open →</Link></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        ) : <div className="admin-empty"><p>No reservations yet.</p></div>}
      </section>
    </main>
  );
}
