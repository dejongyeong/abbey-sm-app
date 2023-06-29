import { SENSOR_INTERVAL } from '@/config/constant';
import DLeafletMap from '@/config/leaflet/dynamic-leaflet-map';
import { DLeafletMarker } from '@/config/leaflet/dynamic-leaflet-marker';
import { DLeafletPolyline } from '@/config/leaflet/dynamic-leaflet-polyline';
import { DLeafletPopup } from '@/config/leaflet/dynamic-leaflet-popup';
import { convertToLatLng } from '@/services/sensor/convert-gps';
import { getGps } from '@/services/sensor/get-gps-data';
import { useEffect, useState } from 'react';
import { Typography } from 'antd';
import DataError from '../shared/sensors/DataError';
import NoData from '../shared/sensors/NoData';

const { Title, Text } = Typography;

export default function MachineMap() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      try {
        const data = await getGps({
          start: '-14d',
          end: 'now()',
          serial: 'T100',
        });

        setData(data);
      } catch (error) {
        setError(true);
      }
    };

    fetching();

    // const interval = setInterval(fetching, SENSOR_INTERVAL.gps);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  return (
    <div className="w-full flex flex-col flex-1 h-[800px] border-2 border-[#f0f0f0] rounded-lg p-6">
      <div className="mb-5">
        <Title level={5}>GPS Data</Title>
        <Text type="secondary">Last recorded timestamp: {data[0]?.dt}</Text>
      </div>

      {error ? <DataError /> : null}

      {!error && data && data.length > 0 ? (
        <DLeafletMap
          center={[52.85331759764098, -8.052514052701099]}
          zoom={10}
          markerZoomAnimation={true}
        >
          <>
            <DLeafletMarker position={[data[0]?.lat, data[0]?.lon]}>
              <DLeafletPopup>Last location: {data[0]?.dt}</DLeafletPopup>
            </DLeafletMarker>
            <DLeafletPolyline positions={convertToLatLng(data)} color="blue" />
          </>
        </DLeafletMap>
      ) : (
        <NoData />
      )}
    </div>
  );
}
