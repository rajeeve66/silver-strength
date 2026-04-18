import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// This will show a clear error if keys are missing
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('❌ Missing Supabase keys! Check Vercel environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getSessionId(): string {
  let sessionId = localStorage.getItem('silver_strength_session');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('silver_strength_session', sessionId);
  }
  return sessionId;
}
