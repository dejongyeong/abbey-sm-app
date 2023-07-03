import { BASE_URL } from '@/config/constant';

export const getSpecificUser = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${response.status}: ${data.message}`);
    }

    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
