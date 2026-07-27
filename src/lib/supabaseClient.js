import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY

export const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey

if (!isSupabaseConfigured) {
  console.warn(
    'Faltan VUE_APP_SUPABASE_URL / VUE_APP_SUPABASE_ANON_KEY. Configuralas en .env.local.'
  )
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const ALLOWED_EMAIL = process.env.VUE_APP_ALLOWED_EMAIL
