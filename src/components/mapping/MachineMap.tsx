import DLeafletMap from '@/config/leaflet/dynamic-leaflet-map';

export default function MachineMap() {
  return (
    <div className="w-full flex flex-col flex-1 h-[700px]">
      <DLeafletMap center={[53.41291, -8.24389]} zoom={7} />
    </div>
  );
}
