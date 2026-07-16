import { getStaffForRoute } from "@/lib/inventory/auth";

export const dynamic = "force-dynamic";

function csvCell(value: unknown) {
  const text = value == null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET() {
  const context = await getStaffForRoute();
  if (!context) return new Response("Unauthorized", { status: 401 });

  const { data, error } = await context.supabase.from("products").select("*").order("name");
  if (error) return new Response(error.message, { status: 500 });

  const rows = [
    ["SKU", "Product", "Category", "Rental rate", "Total quantity", "Maintenance", "Usable", "Active"],
    ...(data ?? []).map((product) => [
      product.sku,
      product.name,
      product.category,
      (product.rental_rate_cents / 100).toFixed(2),
      product.total_quantity,
      product.maintenance_quantity,
      product.total_quantity - product.maintenance_quantity,
      product.active ? "Yes" : "No",
    ]),
  ];
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="jan-day-inventory.csv"',
    },
  });
}
