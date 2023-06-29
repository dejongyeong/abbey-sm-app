import moment from 'moment-timezone';

export const convertTimezone = (utcDateTime: string) => {
  const iso = moment
    .utc(utcDateTime)
    .utcOffset(0)
    .tz('Europe/Dublin')
    .format('DD-MM-YY HH:mm:ss');

  return iso;
};
