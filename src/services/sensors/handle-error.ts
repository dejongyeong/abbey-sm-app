import { NextApiResponse } from 'next';

export const handleError = (error: any, res: NextApiResponse) => {
  const response = {
    event: 'error',
    data: 'Error occurred during data stream',
  };

  if (res && !res.writableEnded) {
    res.write(`data: ${JSON.stringify(response)}`);
    res.end();
  }
};
