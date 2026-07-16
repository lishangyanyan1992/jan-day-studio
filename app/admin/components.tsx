import Link from "next/link";
import type { ReservationStatus } from "@/lib/inventory/types";
import { labelStatus } from "@/lib/inventory/types";

export function SetupNotice() {
  return (
    <section className="admin-setup-card">
      <p className="admin-kicker">One-time setup</p>
      <h1>Connect your inventory database.</h1>
      <p>
        The dashboard is ready. Add a Supabase project, run the included migration,
        and create your first staff account to begin managing inventory.
      </p>
      <ol>
        <li>Run the SQL migration in your Supabase project.</li>
        <li>Add the two public Supabase environment variables.</li>
        <li>Create an Auth user and add them to the staff allowlist.</li>
      </ol>
      <a className="admin-button" href="https://supabase.com/dashboard" target="_blank" rel="noreferrer">
        Open Supabase <span aria-hidden="true">↗</span>
      </a>
      <p className="admin-setup-path">
        Full instructions: <code>docs/INVENTORY_SETUP.md</code>
      </p>
      <Link className="admin-text-link" href="/">Return to the public site</Link>
    </section>
  );
}

export function FlashMessage({
  success,
  error,
}: {
  success?: string;
  error?: string;
}) {
  if (!success && !error) return null;
  return (
    <p className={`admin-flash ${error ? "admin-flash--error" : "admin-flash--success"}`} role="status">
      {error ?? success}
    </p>
  );
}

export function StatusBadge({ status }: { status: ReservationStatus }) {
  return <span className={`admin-status admin-status--${status}`}>{labelStatus(status)}</span>;
}
