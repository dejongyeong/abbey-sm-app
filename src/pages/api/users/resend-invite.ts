import { NextApiRequest, NextApiResponse } from 'next';
import { generateInviteLink, mail } from './invite';
import { checkUserSessionApi } from '@/services/auth/check-session-api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await checkUserSessionApi(req, res);

    if (!session) {
      res
        .status(401)
        .json({ message: 'No active session or is not authenticated' });
    } else {
      try {
        await resendInvite(req, res);
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: 'Method not allowed' });
  }
}

async function resendInvite(req: NextApiRequest, res: NextApiResponse) {
  try {
    const inviteLink = await generateInviteLink(req, res); // get user email

    const { email } = req.body;
    await mail(email, inviteLink.properties.action_link);

    res.status(200).json({ message: 'Invitation link re-sent!' });
  } catch (error) {
    throw error;
  }
}
