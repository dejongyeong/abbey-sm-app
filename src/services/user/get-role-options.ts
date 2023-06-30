import { filterRoleList } from '../role/filter-role-list';
import { getAllRoles } from '../role/get-all-roles';

export const roleOptions = async (user: any) => {
  try {
    const roles = await getAllRoles();
    const filtered = await filterRoleList(user, roles);
    return filtered;
  } catch (error) {
    throw error;
  }
};
