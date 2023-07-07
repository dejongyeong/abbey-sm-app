import _ from 'lodash';
import { defaultColumns } from '@/components/machine/tables/columns/DefaultColumns';

export const getTableColumns = (user: any, searchInput: any) => {
  switch (user?.role.alias) {
    case 'dealership':
      break;
    case 'farm-manager':
      break;
    case 'farmer':
      break;
    default:
      return defaultColumns(searchInput);
  }
};
