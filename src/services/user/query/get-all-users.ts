import { prisma } from '@/lib/prisma/db';
import { roles } from '@/utils/filter-roles-list';

export async function getAllUsers(selfId: string, role: string) {
  const roleList = roles[role] || [];

  const users = await prisma.user.findMany({
    where: {
      sb_auth_id: { not: selfId },
      deleted_at: null,
      invites_received: { some: { sender_id: selfId } },
      role: { alias: { in: roleList } },
    },
    select: {
      id: true,
      sb_auth_id: true,
      email: true,
      first_name: true,
      last_name: true,
      dial_code: true,
      phone: true,
      company: true,
      role: true,
      created_at: true,
      invites_received: {
        select: {
          id: true,
          is_accepted: true,
          created_at: true,
          sender: {
            select: { first_name: true, last_name: true },
          },
        },
      },
    },
  });

  return users;
}
