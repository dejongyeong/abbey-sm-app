import flags, { IFlag } from '@/lib/countries/dial';

export const getDialCode = () => {
  return flags.map(({ code, dial_code }: IFlag) => {
    return {
      value: `${dial_code}`,
      label: `${code} ${dial_code}`,
    };
  });
};
