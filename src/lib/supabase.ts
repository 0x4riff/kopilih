import { createClient } from "@supabase/supabase-js";

const fallbackSupabaseUrl = "https://ebiqsudpqoqmlggwmhdv.supabase.co";
const fallbackSupabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViaXFzdWRwcW9xbWxnZ3dtaGR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NjAxNDMsImV4cCI6MjA5MTQzNjE0M30.CigaxviYFT2MSKUGFfDNY99kPT-bI0mvuvFtziYYb_0";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || fallbackSupabaseUrl;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || fallbackSupabaseAnonKey;

let browserClient: ReturnType<typeof createClient> | null = null;

export function hasSupabaseEnv() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseBrowserClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase environment variables are missing");
  }

  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return browserClient;
}
