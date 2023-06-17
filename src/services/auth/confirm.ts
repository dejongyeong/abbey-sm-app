export const confirm = async (uid: string, password: string) => {
  try {
    const response = await fetch('/api/auth/confirm', {
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
