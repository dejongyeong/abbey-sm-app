// TODO: check params
// current session user id (sender id), other info of the invited user
export const invite = async (params: any) => {
  try {
    const response = await fetch('/api/users/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
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
