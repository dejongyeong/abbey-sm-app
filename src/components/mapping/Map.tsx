import { MapContainer, TileLayer, MapContainerProps } from 'react-leaflet';
import L, { MapOptions } from 'leaflet';
import { FC } from 'react';

L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl: 'leaflet/images/map-marker.svg',
  iconUrl: 'leaflet/images/map-marker.svg',
  shadowUrl: 'leaflet/images/marker-shadow.png',
  shadowRetinaUrl: 'leaflet/images/marker-shadow.png',
  iconSize: [24, 24], // [25, 41]
  iconAnchor: [12, 24], // [12, 41]
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

const Map: FC<MapContainerProps & MapOptions> = ({ children, ...rest }) => {
  return (
    <MapContainer {...rest} className="flex-1 h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {children}
    </MapContainer>
  );
};

export default Map;
