export const resendInvite = async (email: string) => {
  try {
    const response = await fetch('/api/users/resend-invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
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
