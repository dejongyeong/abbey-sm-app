import { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import NoData from '@/components/shared/sensors/NoData';
import DataError from '@/components/shared/sensors/DataError';
import VacuumTempChart from './VacuumTempChart';
import { SENSOR_INTERVAL } from '@/config/constant';

const { Title } = Typography;

const VacuumTemp = () => {
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

        const response = await fetch(`/api/sensors/vacuum-temp?${params}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(true);
      }
    };

    fetching();

    const interval = setInterval(fetching, SENSOR_INTERVAL.vacuumTemp);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // TODO: add machine number (user input)
  return (
    <Card className="h-max">
      <Title level={5}>Vacuum Pump Temperature</Title>
      <div className="mt-10">
        {error ? <DataError /> : null}
        {data && data.length > 0 && !error ? (
          <VacuumTempChart data={data} />
        ) : (
          <NoData />
        )}
      </div>
    </Card>
  );
};

export default VacuumTemp;

// try {
//   const channel = pusherClient.subscribe('sensor');
//   channel.bind('vacuum-temp', (data: any) => {
//     setData((prev) => [...prev, data]);
//   });
// } catch (error) {
//   setError(true);
// }

// const interval = setInterval(fetching, SENSOR_INTERVAL.vacuumTemp);
// return () => {
//   clearInterval(interval);
//   pusherClient.unsubscribe('vacuum-temp');
// };
