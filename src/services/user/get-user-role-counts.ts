import { countUsersByRole } from '../role/count-users-by-role';
import { filterRoleList } from '../role/filter-role-list';

export const userRoleCounts = async (user: any) => {
  try {
    const counts = await countUsersByRole();
    const filtered = await filterRoleList(user, counts);
    return filtered;
  } catch (error) {
    throw error;
  }
};
