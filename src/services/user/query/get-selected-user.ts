import { prisma } from '@/lib/prisma/db';

export async function getSelectedUser(id: string) {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { sb_auth_id: id },
      include: {
        role: true,
        invites_sent: true,
        invites_received: true,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}
