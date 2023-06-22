import { NextApiResponse } from 'next';

export const sendEvent = (data: any, res: NextApiResponse) => {
  if (res && !res.writableEnded) {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }
};
