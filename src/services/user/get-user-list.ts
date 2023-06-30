import { getAllUsers } from './query/get-all-users';

export const getUserList = async (id: any, role: any) => {
  try {
    const users = await getAllUsers(id, role);
    return users;
  } catch (error) {
    throw error;
  }
};
