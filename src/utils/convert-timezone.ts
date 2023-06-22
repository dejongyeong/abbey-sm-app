export const convertTimezone = (utcDateTime: string) => {
  const utcDate = new Date(utcDateTime);
  const iso = utcDate.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return iso;
};
