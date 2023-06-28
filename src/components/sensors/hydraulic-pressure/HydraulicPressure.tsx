import { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import NoData from '@/components/shared/sensors/NoData';
import DataError from '@/components/shared/sensors/DataError';
import { SENSOR_INTERVAL } from '@/config/constant';
import HydraulicPressureChart from './HydraulicPressureChart';

const { Title } = Typography;

const HydraulicPressure = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      try {
        const params = new URLSearchParams({
          start: '-7d',
          end: 'now()',
          machine_serial: 'T100',
        });

        const api = `/api/sensors/hydraulic-pressure?${params}`;
        const response = await fetch(api);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(true);
      }
    };

    fetching();

    // const interval = setInterval(fetching, SENSOR_INTERVAL.pressure);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  // TODO: add machine number
  return (
    <Card>
      <Title level={5}>Hydraulic Pressure</Title>
      <div className="mt-6">
        {error ? <DataError /> : null}
        {data && data.length > 0 && !error ? (
          <HydraulicPressureChart data={data} />
        ) : (
          <NoData />
        )}
      </div>
    </Card>
  );
};

export default HydraulicPressure;
