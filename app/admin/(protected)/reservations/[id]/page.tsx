import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/inventory/auth";
import {
  formatDate,
  formatMoney,
  type Customer,
  type Product,
  type ProductAvailability,
  type Reservation,
  type ReservationItem,
  type ReservationStatus,
} from "@/lib/inventory/types";
import {
  addReservationItemAction,
  removeReservationItemAction,
  updateReservationStatusAction,
} from "../../../actions";
import { FlashMessage, StatusBadge } from "../../../components";

interface ReservationDetail extends Reservation {
  customers: Customer | null;
}

const transitions: Record<ReservationStatus, ReservationStatus[]> = {
  draft: ["hold", "confirmed", "cancelled"],
  hold: ["draft", "confirmed", "cancelled"],
  confirmed: ["draft", "picked_up", "cancelled"],
  picked_up: ["returned"],
  returned: [],
  cancelled: ["draft"],
};

export default async function ReservationDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireStaff();
  if (!supabase) return null;

  const { data: reservationData } = await supabase
    .from("reservations")
    .select("*, customers(*)")
    .eq("id", id)
    .maybeSingle();
  if (!reservationData) notFound();
  const reservation = reservationData as unknown as ReservationDetail;

  const [{ data: itemsData }, { data: productsData }, { data: availabilityData }, flash] = await Promise.all([
    supabase
      .from("reservation_items")
      .select("*, products(name, sku, total_quantity, maintenance_quantity)")
      .eq("reservation_id", id)
      .order("created_at"),
    supabase.from("products").select("*").eq("active", true).order("name"),
    supabase.rpc("product_availability", {
      p_start_date: reservation.event_start,
      p_end_date: reservation.event_end,
    }),
    searchParams,
  ]);
  const items = (itemsData ?? []) as unknown as ReservationItem[];
  const products = (productsData ?? []) as unknown as Product[];
  const availability = (availabilityData ?? []) as unknown as ProductAvailability[];
  const availabilityByProduct = new Map(availability.map((item) => [item.product_id, item]));
  const total = items.reduce((sum, item) => sum + item.quantity * item.unit_price_cents, 0);
  const totalPieces = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="admin-page">
      <Link className="admin-back-link" href="/admin/reservations">← All reservations</Link>
      <header className="admin-page-header admin-reservation-header">
        <div>
          <p className="admin-kicker">Reservation</p>
          <h1>{reservation.customers?.name ?? "Unnamed customer"}</h1>
          <p>{formatDate(reservation.event_start)}{reservation.event_end !== reservation.event_start ? ` – ${formatDate(reservation.event_end)}` : ""} · {reservation.venue || "Venue not set"}</p>
        </div>
        <StatusBadge status={reservation.status} />
      </header>
      <FlashMessage success={flash.success} error={flash.error} />

      <section className="admin-reservation-grid">
        <div className="admin-panel admin-reservation-main">
          <div className="admin-panel-heading">
            <div><p className="admin-kicker">{totalPieces} pieces</p><h2>Reserved collection</h2></div>
            <strong>{formatMoney(total)}</strong>
          </div>
          {items.length ? (
            <div className="admin-line-items">
              {items.map((item) => {
                const stock = availabilityByProduct.get(item.product_id);
                return (
                  <article key={item.id}>
                    <div><strong>{item.products?.name ?? "Unknown product"}</strong><span>{item.products?.sku || "No SKU"}</span></div>
                    <span>{item.quantity} × {formatMoney(item.unit_price_cents)}</span>
                    <span>{stock?.available_quantity ?? 0} remaining on these dates</span>
                    <strong>{formatMoney(item.quantity * item.unit_price_cents)}</strong>
                    {reservation.status === "draft" ? (
                      <form action={removeReservationItemAction}>
                        <input type="hidden" name="reservation_id" value={id} />
                        <input type="hidden" name="item_id" value={item.id} />
                        <button type="submit" aria-label={`Remove ${item.products?.name ?? "item"}`}>×</button>
                      </form>
                    ) : null}
                  </article>
                );
              })}
            </div>
          ) : <div className="admin-empty"><p>No products have been added.</p></div>}

          {reservation.status === "draft" ? (
            <form action={addReservationItemAction} className="admin-add-line-form">
              <input type="hidden" name="reservation_id" value={id} />
              <label>Product<select name="product_id" required defaultValue=""><option value="" disabled>Choose a product</option>{products.filter((product) => !items.some((item) => item.product_id === product.id)).map((product) => {
                const stock = availabilityByProduct.get(product.id);
                return <option value={product.id} key={product.id}>{product.name} · {stock?.available_quantity ?? 0} available</option>;
              })}</select></label>
              <label>Quantity<input name="quantity" type="number" min="1" defaultValue="1" required /></label>
              <button className="admin-button admin-button--small" type="submit">Add item</button>
            </form>
          ) : (
            <p className="admin-lock-note">Items are locked while this reservation is {reservation.status.replace("_", " ")}. Move it back to draft to make changes.</p>
          )}
        </div>

        <aside className="admin-detail-stack">
          <section className="admin-panel">
            <p className="admin-kicker">Workflow</p>
            <h2>Reservation status</h2>
            <p>Availability is checked again inside the database before a hold or confirmation succeeds.</p>
            <div className="admin-status-actions">
              {transitions[reservation.status].map((status) => (
                <form action={updateReservationStatusAction} key={status}>
                  <input type="hidden" name="reservation_id" value={id} />
                  <input type="hidden" name="status" value={status} />
                  <button className={status === "cancelled" ? "admin-text-button admin-text-button--danger" : "admin-button admin-button--small"} type="submit">
                    Move to {status.replace("_", " ")}
                  </button>
                </form>
              ))}
              {!transitions[reservation.status].length ? <span>No further action required.</span> : null}
            </div>
            {reservation.hold_expires_at ? <small>Hold expires {new Date(reservation.hold_expires_at).toLocaleString("en-US")}</small> : null}
          </section>

          <section className="admin-panel admin-customer-card">
            <p className="admin-kicker">Customer</p>
            <h2>{reservation.customers?.name}</h2>
            {reservation.customers?.email ? <a href={`mailto:${reservation.customers.email}`}>{reservation.customers.email}</a> : <span>No email</span>}
            {reservation.customers?.phone ? <a href={`tel:${reservation.customers.phone}`}>{reservation.customers.phone}</a> : <span>No phone</span>}
          </section>

          <section className="admin-panel">
            <p className="admin-kicker">Details</p>
            <dl className="admin-detail-list">
              <div><dt>Fulfillment</dt><dd>{reservation.fulfillment}</dd></div>
              <div><dt>Venue</dt><dd>{reservation.venue || "Not set"}</dd></div>
              <div><dt>Notes</dt><dd>{reservation.notes || "No notes"}</dd></div>
            </dl>
          </section>
        </aside>
      </section>
    </main>
  );
}
