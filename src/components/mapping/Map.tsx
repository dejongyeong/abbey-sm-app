import {
  MapContainer,
  TileLayer,
  MapContainerProps,
  LayersControl,
} from 'react-leaflet';
import L, { MapOptions } from 'leaflet';
import { FC } from 'react';
import { MAPBOX_CONFIG } from '@/config/constant';

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
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="Open Street Map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="Satellite">
          <TileLayer
            attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=${MAPBOX_CONFIG.token}`}
            maxZoom={20}
            noWrap
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {children}
    </MapContainer>
  );
};

export default Map;
