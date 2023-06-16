/* eslint-disable no-unused-vars */
// General
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : process.env.NEXT_PUBLIC_SITE_URL;

// Supabase
export const SUPABASE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  serviceKey: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY,
  jwtSecret: process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET,
};

// SendGrid
export const SENDGRID_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_SENDGRID_API_KEY,
  sendFrom: 'dejong.yeong@mtu.ie',
};

// Redis
export const REDIS_CONFIG = {
  host: process.env.NEXT_PUBLIC_REDIS_HOST,
  port: process.env.NEXT_PUBLIC_REDIS_PORT,
  password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,
};
