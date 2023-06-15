/* eslint-disable no-unused-vars */
// General
export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

// SendGrid
export const SENDGRID_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_SENDGRID_API_KEY,
};
