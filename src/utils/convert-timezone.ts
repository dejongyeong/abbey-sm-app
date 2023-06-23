import moment from 'moment';

export const convertTimezone = (utcDateTime: string) => {
  const iso = moment.utc(utcDateTime).format('DD-MM-YY HH:mm:ss');

  return iso;
};
