import dynamic from 'next/dynamic';

export const DGaugeChart = dynamic(
  async () => (await import('@ant-design/plots')).Gauge,
  { ssr: false }
);
