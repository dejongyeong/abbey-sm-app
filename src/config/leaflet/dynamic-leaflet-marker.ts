import dynamic from 'next/dynamic';

export const DLeafletMarker = dynamic(
  async () => (await import('react-leaflet')).Marker,
  { ssr: false }
);
