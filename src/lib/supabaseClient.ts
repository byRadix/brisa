import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// These would typically come from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and anon key are required. Please connect to Supabase.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);