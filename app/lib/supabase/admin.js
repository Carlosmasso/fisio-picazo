import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Uses the secret key — bypasses RLS entirely. Only ever call this from
// Server Actions/Components already gated by requireAdmin(). Never import
// this file into anything that could end up in a Client Component bundle.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
