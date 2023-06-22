import dynamic from 'next/dynamic';

export const DMultiLineChart = dynamic(
  async () => (await import('@ant-design/plots')).Line,
  { ssr: false }
);
