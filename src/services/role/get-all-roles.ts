import { prisma } from '@/lib/prisma/db';
import { IRole } from '@/types/role';

export async function getAllRoles(): Promise<IRole[]> {
  const roles = await prisma.role.findMany({
    select: {
      id: true,
      name: true,
      alias: true,
      descr: true,
    },
  });

  return roles;
}
