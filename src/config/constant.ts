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

// Influx DB
export const INFLUX_CONFIG = {
  url: process.env.NEXT_PUBLIC_INFLUX_URL,
  token: process.env.NEXT_PUBLIC_INFLUX_TOKEN,
  org: process.env.NEXT_PUBLIC_INFLUX_ORG,
  bucket: 'demo',
};

// Redis
export const REDIS_CONFIG = {
  host: process.env.NEXT_PUBLIC_REDIS_HOST,
  port: process.env.NEXT_PUBLIC_REDIS_PORT,
  password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,
};

// Pusher
export const PUSHER_CONFIG = {
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.NEXT_PUBLIC_PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
};

// Super Admin has no invitation - to bypass nextjs middleware
export const SUPER_ADMIN = {
  email: 'dejong.re2@gmail.com',
};

// Mapbox
export const MAPBOX_CONFIG = {
  token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
};

// All value are in milliseconds.
export const SENSOR_INTERVAL = {
  vacuumSpeed: 10000, // 10 seconds
  vacuumTemp: 60000, // 1 minute
  pressure: 10000, // 10 seconds
  oilAvailability: 600000, // 10 minutes
  gps: 10000, // 10 seconds
};

export const DATE_FORMAT = 'YYYY-MM-DD';
