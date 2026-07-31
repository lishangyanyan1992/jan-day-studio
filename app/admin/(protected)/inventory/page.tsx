import { requireStaff } from "@/lib/inventory/auth";
import { formatMoney, type Product } from "@/lib/inventory/types";
import {
  adjustInventoryAction,
  createProductAction,
  setMaintenanceAction,
  toggleProductAction,
} from "../../actions";
import { FlashMessage } from "../../components";

interface Movement {
  id: string;
  quantity_delta: number;
  reason: string;
  notes: string;
  created_at: string;
  products: { name: string } | null;
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { supabase } = await requireStaff();
  if (!supabase) return null;

  const [{ data: productsData }, { data: movementsData }, flash] = await Promise.all([
    supabase.from("products").select("*").order("active", { ascending: false }).order("name"),
    supabase
      .from("inventory_movements")
      .select("id, quantity_delta, reason, notes, created_at, products(name)")
      .order("created_at", { ascending: false })
      .limit(12),
    searchParams,
  ]);
  const products = (productsData ?? []) as unknown as Product[];
  const movements = (movementsData ?? []) as unknown as Movement[];

  return (
    <main className="admin-page">
      <header className="admin-page-header">
        <div>
          <p className="admin-kicker">Collection</p>
          <h1>Inventory</h1>
          <p>Track every rentable style, piece, and item currently out of service.</p>
        </div>
        <a className="admin-button admin-button--outline" href="/admin/export/inventory">Export CSV <span aria-hidden="true">↓</span></a>
      </header>
      <FlashMessage success={flash.success} error={flash.error} />

      <details className="admin-disclosure" id="new">
        <summary>Add a product <span aria-hidden="true">+</span></summary>
        <form action={createProductAction} className="admin-form admin-form-grid">
          <label>Product name<input name="name" required placeholder="Ivory real-touch bridal bouquet" /></label>
          <label>SKU<input name="sku" placeholder="TBL-001" /></label>
          <label>Category<input name="category" required placeholder="Personal Flowers" /></label>
          <label>Rental rate<input name="rental_rate" type="number" min="0" step="0.01" defaultValue="0.00" /></label>
          <label>Total quantity<input name="total_quantity" type="number" min="0" defaultValue="1" required /></label>
          <label>In maintenance<input name="maintenance_quantity" type="number" min="0" defaultValue="0" required /></label>
          <label className="admin-form-span">Image URL<input name="image_url" type="url" placeholder="https://…" /></label>
          <label className="admin-form-span">Description<textarea name="description" rows={3} placeholder="Materials, measurements, packing notes…" /></label>
          <button className="admin-button" type="submit">Add to inventory <span aria-hidden="true">→</span></button>
        </form>
      </details>

      <section className="admin-panel admin-table-panel">
        <div className="admin-panel-heading">
          <div><p className="admin-kicker">{products.length} products</p><h2>Collection inventory</h2></div>
        </div>
        {products.length ? (
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead><tr><th>Product</th><th>Category</th><th>Rate</th><th>Total</th><th>Available now</th><th>Care</th><th>Actions</th></tr></thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className={product.active ? undefined : "admin-row-muted"}>
                    <td><strong>{product.name}</strong><small>{product.sku || "No SKU"}{!product.active ? " · Archived" : ""}</small></td>
                    <td>{product.category}</td>
                    <td>{formatMoney(product.rental_rate_cents)}</td>
                    <td>{product.total_quantity}</td>
                    <td><strong>{Math.max(product.total_quantity - product.maintenance_quantity, 0)}</strong></td>
                    <td>
                      <form action={setMaintenanceAction} className="admin-inline-form">
                        <input type="hidden" name="product_id" value={product.id} />
                        <input name="maintenance_quantity" type="number" min="0" max={product.total_quantity} defaultValue={product.maintenance_quantity} aria-label={`Maintenance quantity for ${product.name}`} />
                        <button type="submit">Save</button>
                      </form>
                    </td>
                    <td>
                      <details className="admin-row-menu">
                        <summary>Manage</summary>
                        <div>
                          <form action={adjustInventoryAction} className="admin-mini-form">
                            <input type="hidden" name="product_id" value={product.id} />
                            <label>Quantity change<input name="quantity_delta" type="number" required placeholder="+2 or -1" /></label>
                            <label>Reason<select name="reason" defaultValue="manual_adjustment"><option value="purchase">Purchase</option><option value="manual_adjustment">Manual adjustment</option><option value="damage">Damage</option><option value="repair">Repair</option><option value="loss">Loss</option><option value="return_to_stock">Return to stock</option></select></label>
                            <label>Note<input name="notes" placeholder="Optional context" /></label>
                            <button className="admin-button admin-button--small" type="submit">Apply adjustment</button>
                          </form>
                          <form action={toggleProductAction}>
                            <input type="hidden" name="product_id" value={product.id} />
                            <input type="hidden" name="active" value={product.active ? "false" : "true"} />
                            <button className="admin-text-button" type="submit">{product.active ? "Archive product" : "Restore product"}</button>
                          </form>
                        </div>
                      </details>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <div className="admin-empty"><p>No inventory yet.</p><span>Use “Add a product” above to begin.</span></div>}
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading"><div><p className="admin-kicker">Audit trail</p><h2>Recent quantity changes</h2></div></div>
        {movements.length ? (
          <div className="admin-activity-list">
            {movements.map((movement) => (
              <article key={movement.id}>
                <span className={movement.quantity_delta > 0 ? "admin-delta-positive" : "admin-delta-negative"}>{movement.quantity_delta > 0 ? "+" : ""}{movement.quantity_delta}</span>
                <div><strong>{movement.products?.name ?? "Deleted product"}</strong><p>{movement.reason.replaceAll("_", " ")}{movement.notes ? ` · ${movement.notes}` : ""}</p></div>
                <time>{new Date(movement.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
              </article>
            ))}
          </div>
        ) : <div className="admin-empty"><p>No quantity changes recorded yet.</p></div>}
      </section>
    </main>
  );
}
