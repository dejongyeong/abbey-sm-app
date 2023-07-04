import { prisma } from '@/lib/prisma/db';

export async function updateUser(id: any, data: any) {
  try {
    const user = await prisma.user.update({
      where: { sb_auth_id: id },
      data,
    });

    return user;
  } catch (error) {
    throw error;
  }
}
