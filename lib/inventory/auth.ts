import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireStaff() {
  const supabase = await createClient();

  if (!supabase) {
    return { supabase: null, profile: null, userId: null };
  }

  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (claimsError || !userId) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("staff_profiles")
    .select("user_id, display_name, role, active")
    .eq("user_id", userId)
    .eq("active", true)
    .maybeSingle();

  if (!profile) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=not-authorized");
  }

  return { supabase, profile, userId };
}

export async function getStaffForRoute() {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data: claimsData } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  if (!userId) return null;

  const { data: profile } = await supabase
    .from("staff_profiles")
    .select("user_id")
    .eq("user_id", userId)
    .eq("active", true)
    .maybeSingle();

  return profile ? { supabase, userId } : null;
}
