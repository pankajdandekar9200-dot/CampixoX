import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://fhimmtxojcdrogicuomi.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoaW1tdHhvamNkcm9naWN1b21pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2Njk2NjAsImV4cCI6MjA5MjI0NTY2MH0.-JfbaPmTLCS3XJYmMTOLfCSTZxMFa5gx5XM1saraBnw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  },
});
