export const convertTimezone = (utcDateTime: string) => {
  const utcDate = new Date(utcDateTime);
  const localDate = utcDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const localTime = utcDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const localDateTime = `${localDate} ${localTime}`;
  return localDateTime;
};
