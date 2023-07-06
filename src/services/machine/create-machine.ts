export const createMachine = async (params: any) => {
  try {
    const response = await fetch('/api/machines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
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
