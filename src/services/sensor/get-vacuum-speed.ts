import { ISensorProps } from '@/types/sensor';

export const getVacuumSpeed = async ({ start, end, serial }: ISensorProps) => {
  try {
    const params = new URLSearchParams({
      start: start,
      end: end,
      machine_serial: serial,
    });

    const response = await fetch(`/api/sensors/vacuum-speed?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${response.status}: ${data.message}`);
    }

    return data;
  } catch (error) {
    throw new Error('Error retrieving vacuum speed data');
  }
};
