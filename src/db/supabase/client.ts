import { createBrowserClient } from '@supabase/ssr'
import { supabaseAnonKey, supabaseUrl } from '@/db/supabase/secret'

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
