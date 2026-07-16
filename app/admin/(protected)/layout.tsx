import Link from "next/link";
import Image from "next/image";
import { requireStaff } from "@/lib/inventory/auth";
import { signOutAction } from "../actions";
import { SetupNotice } from "../components";

const navItems = [
  ["Overview", "/admin"],
  ["Inventory", "/admin/inventory"],
  ["Reservations", "/admin/reservations"],
  ["Activity", "/admin/activity"],
];

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const { supabase, profile } = await requireStaff();

  if (!supabase) {
    return (
      <main className="admin-setup-page">
        <SetupNotice />
      </main>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-sidebar-logo">
          <Image src="/brand/jan-day-wordmark.png" alt="Jan Day Studio" width={682} height={230} priority />
        </Link>
        <p className="admin-sidebar-label">Studio operations</p>
        <nav aria-label="Inventory administration">
          {navItems.map(([label, href]) => (
            <Link href={href} key={href}>{label}<span aria-hidden="true">→</span></Link>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <div>
            <span>Signed in as</span>
            <strong>{profile?.display_name}</strong>
          </div>
          <form action={signOutAction}>
            <button type="submit">Sign out</button>
          </form>
          <Link href="/">View public site ↗</Link>
        </div>
      </aside>
      <div className="admin-workspace">{children}</div>
    </div>
  );
}
