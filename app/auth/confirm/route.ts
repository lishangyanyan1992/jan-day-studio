import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

function safeNextPath(value: string | null) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/admin";
}

export async function GET(request: NextRequest) {
  const redirectTo = request.nextUrl.clone();
  const code = request.nextUrl.searchParams.get("code");
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type") as EmailOtpType | null;
  const next = safeNextPath(request.nextUrl.searchParams.get("next"));
  const supabase = await createClient();

  let error = !supabase;
  if (supabase && code) {
    const result = await supabase.auth.exchangeCodeForSession(code);
    error = Boolean(result.error);
  } else if (supabase && tokenHash && type) {
    const result = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
    error = Boolean(result.error);
  } else {
    error = true;
  }

  redirectTo.pathname = error ? "/admin/login" : next;
  redirectTo.search = error ? "?error=callback" : "";
  return NextResponse.redirect(redirectTo);
}
