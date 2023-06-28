import dynamic from 'next/dynamic';

const DLeafletMap = dynamic(() => import('@/components/mapping/Map'), {
  ssr: false,
});

export default DLeafletMap;
