import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getSessionId(): string {
  let sessionId = localStorage.getItem('silver_strength_session');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('silver_strength_session', sessionId);
  }
  return sessionId;
}
