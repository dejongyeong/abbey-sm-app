import dynamic from 'next/dynamic';

export const DLeafletPopup = dynamic(
  async () => (await import('react-leaflet')).Popup,
  { ssr: false }
);
