import { createClient } from "@supabase/supabase-js";
import userAuthUser from "src/composables/userAuthUser";

const supabaseUrl = "https://zziuvvorxkugtbmruglb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6aXV2dm9yeGt1Z3RibXJ1Z2xiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDYxMTczNzAsImV4cCI6MTk2MTY5MzM3MH0.akbIyEvNmCOfhf387CzZNqzliVt35Oj6eFMuUWcvKJY";
const supabase = createClient(supabaseUrl, supabaseKey);

// console.log('init supabase:', supabase)

supabase.auth.onAuthStateChange((event, session) => {
  const { user } = userAuthUser()

  user.value = session?.user

})

export default function useSupabase() {
  return { supabase };
}

