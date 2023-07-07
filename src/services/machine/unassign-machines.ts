import { getUrl } from './check-accessible';

export const unassignMachines = async (user: any, mid: any) => {
  try {
    const url: any = getUrl(user, mid);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${response.status}: ${data.message}`);
    }

    return data.machine;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
