import { prisma } from '@/lib/prisma/db';
import { getSupabaseServerAdminClient } from '@/lib/supabase/admin';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'PUT') {
      await confirm(req, res);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function confirm(req: NextApiRequest, res: NextApiResponse) {
  try {
    const supabaseServerAdminClient = getSupabaseServerAdminClient(req, res);

    const { uid, password } = req.body; // uid of the invited user
    const { error } = await supabaseServerAdminClient.auth.admin.updateUserById(
      uid,
      { password: password }
    );

    if (!error) {
      await updateInvite(uid);
      res.status(200).json({
        message: 'Account confirmed, use the password created to login.',
      });
    } else {
      res.status(400).json({ message: error.message });
    }
  } catch (error: any) {
    throw error;
  }
}

async function updateInvite(sbAuthId: string) {
  try {
    await prisma.invite.updateMany({
      where: {
        receiver_id: sbAuthId,
      },
      data: {
        is_accepted: true,
      },
    });
  } catch (error: any) {
    throw error;
  }
}
