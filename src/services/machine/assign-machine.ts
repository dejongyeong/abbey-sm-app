import { getAssignMachineUrl } from './check-accessible';

export const assignMachine = async (user: any, mid: any, id: any) => {
  try {
    const url: any = getAssignMachineUrl(user, mid, id);
    console.log(url);
    const response = await fetch(url, {
      method: 'PUT',
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
