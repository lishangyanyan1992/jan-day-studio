import { requireStaff } from "@/lib/inventory/auth";

interface Activity {
  id: number;
  entity_type: string;
  entity_id: string;
  action: string;
  details: Record<string, unknown>;
  created_at: string;
}

function activityTitle(activity: Activity) {
  const after = activity.details.after as Record<string, unknown> | undefined;
  const before = activity.details.before as Record<string, unknown> | undefined;
  const record = after ?? before;
  if (record && typeof record.name === "string") return record.name;
  if (activity.entity_type === "reservations") return `Reservation ${activity.entity_id.slice(0, 8)}`;
  return `${activity.entity_type.replaceAll("_", " ")} ${activity.entity_id.slice(0, 8)}`;
}

export default async function ActivityPage() {
  const { supabase } = await requireStaff();
  if (!supabase) return null;

  const { data } = await supabase
    .from("activity_log")
    .select("id, entity_type, entity_id, action, details, created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  const activities = (data ?? []) as unknown as Activity[];

  return (
    <main className="admin-page">
      <header className="admin-page-header">
        <div><p className="admin-kicker">Accountability</p><h1>Activity</h1><p>A chronological record of product, reservation, and line-item changes.</p></div>
      </header>
      <section className="admin-panel">
        {activities.length ? (
          <div className="admin-timeline">
            {activities.map((activity) => (
              <article key={activity.id}>
                <span className="admin-timeline-dot" aria-hidden="true" />
                <div>
                  <p><strong>Staff</strong> {activity.action} <strong>{activityTitle(activity)}</strong></p>
                  <span>{activity.entity_type.replaceAll("_", " ")}</span>
                </div>
                <time dateTime={activity.created_at}>{new Date(activity.created_at).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}</time>
              </article>
            ))}
          </div>
        ) : <div className="admin-empty"><p>Activity will appear here as the collection changes.</p></div>}
      </section>
    </main>
  );
}
