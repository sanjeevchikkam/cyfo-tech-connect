import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Helper to check if the URL is a valid Supabase endpoint
function isValidSupabaseUrl(url: string): boolean {
  if (!url) return false;
  if (url.includes("placeholder") || url.includes("YOUR_") || url.includes("MY_") || url.includes("example.com")) {
    return false;
  }
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

const isKeyValid = supabaseAnonKey && 
  supabaseAnonKey.startsWith("eyJ") &&
  !supabaseAnonKey.includes("placeholder") && 
  !supabaseAnonKey.includes("YOUR_") && 
  !supabaseAnonKey.includes("MY_");

// Exporting the Supabase client. It will be null if environment variables are not correctly configured.
export const supabase = isValidSupabaseUrl(supabaseUrl) && isKeyValid
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

