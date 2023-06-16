import { SUPABASE_CONFIG } from '@/config/constant';
import jwt, { type JwtPayload } from 'jsonwebtoken';

// reset password
export const resetPassword = async (uid: string, password: string) => {
  try {
    const response = await fetch('/api/auth/reset-password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid: uid, password: password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${response.status}: ${data.message}`);
    }

    return data;
  } catch (error) {
    throw new Error('Error during API request');
  }
};

// get user id
export const getUid = async (path: string) => {
  try {
    const accessToken = new URLSearchParams(path.split('#')[1]).get(
      'access_token'
    );

    if (!accessToken) {
      throw new Error('Invalid reset password token.');
    }

    const { jwtSecret } = SUPABASE_CONFIG;
    if (!jwtSecret) {
      throw new Error('JWT secret token is missing.');
    }

    const decoded = jwt.verify(accessToken, jwtSecret) as JwtPayload;
    const uid = decoded?.sub;
    return uid;
  } catch (error) {
    throw error;
  }
};
