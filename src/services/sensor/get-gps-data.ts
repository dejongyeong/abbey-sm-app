interface IGetGpsProps {
  start: string;
  end: string;
  serial: string;
}

export const getGps = async ({ start, end, serial }: IGetGpsProps) => {
  try {
    const params = new URLSearchParams({
      start: start,
      end: end,
      machine_serial: serial,
    });

    const response = await fetch(`/api/sensors/gps?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${response.status}: ${data.message}`);
    }

    return data;
  } catch (error) {
    throw new Error('Error retrieving GPS data');
  }
};
