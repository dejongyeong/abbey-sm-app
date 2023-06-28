import { SENSOR_INTERVAL } from '@/config/constant';
import DLeafletMap from '@/config/leaflet/dynamic-leaflet-map';
import { DLeafletMarker } from '@/config/leaflet/dynamic-leaflet-marker';
import { DLeafletPolyline } from '@/config/leaflet/dynamic-leaflet-polyline';
import { DLeafletPopup } from '@/config/leaflet/dynamic-leaflet-popup';
import { convertToLatLng } from '@/services/sensor/convert-gps';
import { getGps } from '@/services/sensor/get-gps-data';
import { useEffect, useState } from 'react';

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
    <div className="w-full flex flex-col flex-1 h-[700px]">
      {error ? <p>error</p> : null}
      {!error && data && data.length > 0 ? (
        <>
          <div className="mb-4 mt-3">
            <p>
              Last 14 days data and the last recorded datetime: {data[0]?.dt}
            </p>
          </div>
          <DLeafletMap
            center={[52.85331759764098, -8.052514052701099]}
            zoom={10}
            markerZoomAnimation={true}
          >
            <>
              <DLeafletMarker position={[data[0]?.lat, data[0]?.lon]}>
                <DLeafletPopup>Last location: {data[0]?.dt}</DLeafletPopup>
              </DLeafletMarker>
              <DLeafletPolyline
                positions={convertToLatLng(data)}
                color="blue"
              />
            </>
          </DLeafletMap>
        </>
      ) : null}
    </div>
  );
}
