import { prisma } from '@/lib/prisma/db';

export async function countUsersByRole() {
  const counts = await prisma.role.findMany({
    select: {
      name: true,
      alias: true,
      users: {
        select: { id: true },
        where: { deleted_at: null },
      },
    },
  });

  const results = counts.map((role) => ({
    name: role.name,
    alias: role.alias,
    count: role.users.length,
  }));

  return results;
}
