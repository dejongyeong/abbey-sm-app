import { prisma } from '@/lib/prisma/db';
import { checkUserSessionApi } from '@/services/auth/check-session-api';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const session = await checkUserSessionApi(req, res);

    if (!session) {
      res
        .status(401)
        .json({
          roles: null,
          message: 'No active session or is not authenticated',
        });
    } else {
      const roles = await countUsersByRoles();
      res.status(200).json({ roles: roles, message: 'Success' });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ roles: null, message: 'Method not allowed' });
  }
}

const countUsersByRoles = async () => {
  const counts = await prisma.role.findMany({
    select: {
      name: true,
      users: {
        select: { id: true },
        where: { deleted_at: null },
      },
    },
  });

  const results = counts.map((role) => ({
    name: role.name,
    count: role.users.length,
  }));

  return results;
};
