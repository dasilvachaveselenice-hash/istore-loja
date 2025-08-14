import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zxpihyhsuphlqwtkcvwm.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4cGloeWhzdXBobHF3dGtjdndtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxMTg4NzIsImV4cCI6MjA3MDY5NDg3Mn0.zve4CP-FIBevxva4iGd4UzmEVM_w0LGgnbw0vvB_3-U'

const supabaseOptions = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
}

export const supabase = createClient(supabaseUrl, supabaseKey, supabaseOptions)

export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .select('id, nome')
      .limit(1)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
