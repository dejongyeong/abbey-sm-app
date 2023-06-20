import { BASE_URL } from '@/config/constant';

export async function checkUserConfirmation(uid: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/auth/check-confirmation?uid=${uid}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${response.status}: ${data.message}`);
    }

    return data.confirm;
  } catch (error) {
    console.log(error);
    throw new Error('500: Error during API request: Check User Confirmation');
  }
}

// https://abbey-sm-app.vercel.app
