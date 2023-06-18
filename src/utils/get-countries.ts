import flags, { IFlag } from '@/lib/countries/dial';

export const getCountries = () => {
  return flags.map(({ name }: IFlag) => {
    return {
      value: `${name}`,
      label: `${name}`,
    };
  });
};
