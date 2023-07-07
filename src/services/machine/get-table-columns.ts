import _ from 'lodash';
import { defaultColumns } from '@/components/machine/tables/columns/DefaultColumns';
import { farmerColumns } from '@/components/machine/tables/columns/FarmerColumns';
import { farmManagerColumns } from '@/components/machine/tables/columns/FarmManagerColumns';
import { dealershipColumns } from '@/components/machine/tables/columns/DealershipColumns';

export const getTableColumns = (user: any, searchInput: any) => {
  switch (user?.role.alias) {
    case 'dealership':
      return dealershipColumns(searchInput);
    case 'farm-manager':
      return farmManagerColumns(searchInput);
    case 'farmer':
      return farmerColumns(searchInput);
    default:
      return defaultColumns(searchInput);
  }
};
