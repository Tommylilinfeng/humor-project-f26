import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
      "Copy .env.example to .env.local locally, and set both in Vercel → Settings → Environment Variables.",
  );
}

// Anon key only: this client is safe to use from server components and the
// browser. Every table it touches must have an RLS policy that allows it.
export const supabase = createClient(url, anonKey);
