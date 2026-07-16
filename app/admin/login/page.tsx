import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FlashMessage, SetupNotice } from "../components";
import { sendMagicLinkAction } from "../actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

const errors: Record<string, string> = {
  "not-authorized": "This account is not on the Jan Day staff allowlist.",
  "setup-required": "Connect Supabase before signing in.",
  "magic-link": "We could not send a sign-in link. Confirm the email is a staff account and try again.",
  "callback": "That sign-in link is invalid or expired. Request a new one below.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string }>;
}) {
  if (!isSupabaseConfigured()) {
    return (
      <main className="admin-setup-page">
        <SetupNotice />
      </main>
    );
  }

  const supabase = await createClient();
  const { data } = (await supabase?.auth.getClaims()) ?? { data: null };
  if (data?.claims?.sub) redirect("/admin");

  const { error, sent } = await searchParams;

  return (
    <main className="admin-login-page">
      <section className="admin-login-brand">
        <Link href="/" aria-label="Return to Jan Day Studio">
          <Image src="/brand/jan-day-wordmark.png" alt="Jan Day Studio" width={682} height={230} priority />
        </Link>
        <div>
          <p className="admin-kicker">Studio operations</p>
          <h1>Every piece,<br />accounted for.</h1>
          <p>Inventory, availability, and reservations in one quiet place.</p>
        </div>
      </section>
      <section className="admin-login-panel">
        <div className="admin-login-form-wrap">
          <p className="admin-kicker">Staff access</p>
          <h2>Welcome back.</h2>
          <p>Enter your staff email and we&apos;ll send a secure, single-use sign-in link.</p>
          <FlashMessage error={error ? errors[error] ?? "Unable to sign in." : undefined} />
          <FlashMessage success={sent ? "Check your inbox. Your secure sign-in link is on its way." : undefined} />
          <form action={sendMagicLinkAction} className="admin-form admin-login-form">
            <label>
              Staff email
              <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
            </label>
            <button className="admin-button" type="submit">Email me a sign-in link <span aria-hidden="true">→</span></button>
          </form>
          <Link className="admin-text-link" href="/">Back to jandayrentals.com</Link>
        </div>
      </section>
    </main>
  );
}
