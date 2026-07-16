import { getStaffForRoute } from "@/lib/inventory/auth";

export const dynamic = "force-dynamic";

function csvCell(value: unknown) {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

interface ExportReservation {
  id: string;
  event_start: string;
  event_end: string;
  status: string;
  venue: string;
  fulfillment: string;
  customers: { name: string; email: string | null; phone: string | null } | null;
  reservation_items: Array<{
    quantity: number;
    unit_price_cents: number;
    products: { name: string; sku: string | null } | null;
  }>;
}

export async function GET() {
  const context = await getStaffForRoute();
  if (!context) return new Response("Unauthorized", { status: 401 });

  const { data, error } = await context.supabase
    .from("reservations")
    .select("id, event_start, event_end, status, venue, fulfillment, customers(name, email, phone), reservation_items(quantity, unit_price_cents, products(name, sku))")
    .order("event_start", { ascending: false });
  if (error) return new Response(error.message, { status: 500 });

  const rows: unknown[][] = [["Reservation", "Customer", "Email", "Phone", "Start", "End", "Status", "Venue", "Fulfillment", "SKU", "Product", "Quantity", "Unit rate"]];
  for (const reservation of (data ?? []) as unknown as ExportReservation[]) {
    if (!reservation.reservation_items.length) {
      rows.push([reservation.id, reservation.customers?.name, reservation.customers?.email, reservation.customers?.phone, reservation.event_start, reservation.event_end, reservation.status, reservation.venue, reservation.fulfillment, "", "", 0, "0.00"]);
      continue;
    }
    for (const item of reservation.reservation_items) {
      rows.push([reservation.id, reservation.customers?.name, reservation.customers?.email, reservation.customers?.phone, reservation.event_start, reservation.event_end, reservation.status, reservation.venue, reservation.fulfillment, item.products?.sku, item.products?.name, item.quantity, (item.unit_price_cents / 100).toFixed(2)]);
    }
  }
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="jan-day-reservations.csv"',
    },
  });
}
