import dynamic from 'next/dynamic';

export const DLeafletPolyline = dynamic(
  async () => (await import('react-leaflet')).Polyline,
  { ssr: false }
);
