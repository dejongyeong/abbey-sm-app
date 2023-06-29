import { DATE_FORMAT } from '@/config/constant';
import dayjs from 'dayjs';

export const getDefaultStartEndDate = () => {
  const defaultStartDate = dayjs().subtract(7, 'day').format(DATE_FORMAT);
  const defaultEndDate = dayjs().format(DATE_FORMAT);

  return { defaultStartDate, defaultEndDate };
};
