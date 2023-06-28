import { useEffect, useState } from 'react';
import VacuumSpeedChart from './VacuumSpeedChart';
import { Card, Typography } from 'antd';
import NoData from '@/components/shared/sensors/NoData';
import DataError from '@/components/shared/sensors/DataError';
import { SENSOR_INTERVAL } from '@/config/constant';
import { getVacuumSpeed } from '@/services/sensor/get-vacuum-speed';

const { Title } = Typography;

const VacuumSpeed = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      try {
        const data = await getVacuumSpeed({
          start: '-7d',
          end: 'now()',
          serial: 'T100',
        });

        setData(data);
      } catch (error) {
        setError(true);
      }
    };

    fetching();

    // const interval = setInterval(fetching, SENSOR_INTERVAL.vacuumSpeed);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  // TODO: add machine number
  return (
    <Card>
      <Title level={5}>Vacuum Speed</Title>
      <div className="mt-6">
        {error ? <DataError /> : null}
        {data && data.length > 0 && !error ? (
          <VacuumSpeedChart data={data} />
        ) : (
          <NoData />
        )}
      </div>
    </Card>
  );
};

export default VacuumSpeed;
