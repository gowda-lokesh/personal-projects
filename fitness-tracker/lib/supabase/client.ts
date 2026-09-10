import { createBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

let browserClient: SupabaseClient | null = null

function getBrowserClient() {
  if (!browserClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    if (!url || !key) {
      throw new Error('Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in Vercel.')
    }
    browserClient = createBrowserClient(url, key)
  }
  return browserClient
}

export function createClient(): SupabaseClient {
  // Keep the client lazy during Next.js server prerendering. Supabase is only
  // initialized once the browser starts executing the app, which also gives a
  // clear runtime error if Vercel environment variables are not configured.
  if (typeof window === 'undefined') {
    return new Proxy({} as SupabaseClient, {
      get(_target, prop) {
        const client = getBrowserClient() as unknown as Record<PropertyKey, unknown>
        const value = client[prop]
        return typeof value === 'function' ? value.bind(client) : value
      },
    })
  }
  return getBrowserClient()
}
