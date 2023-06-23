import dynamic from 'next/dynamic';

export const DLineChart = dynamic(
  async () => (await import('@ant-design/plots')).Line,
  { ssr: false }
);
