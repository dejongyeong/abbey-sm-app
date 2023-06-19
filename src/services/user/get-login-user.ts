import { prisma } from '@/lib/prisma/db';

export async function getLoginUser(uid: string) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { sb_auth_id: uid },
    select: {
      id: true,
      sb_auth_id: true,
      email: true,
      first_name: true,
      last_name: true,
      dial_code: true,
      phone: true,
      company: true,
      role: {
        select: {
          id: true,
          name: true,
          alias: true,
        },
      },
    },
  });

  return user;
}
