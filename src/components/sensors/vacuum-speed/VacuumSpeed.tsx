import { useEffect, useState } from 'react';
import VacuumSpeedChart from './VacuumSpeedChart';
import { Card, Typography } from 'antd';
import NoData from '@/components/shared/sensors/NoData';
import DataError from '@/components/shared/sensors/DataError';
import { SENSOR_INTERVAL } from '@/config/constant';

const { Title } = Typography;

const VacuumSpeed = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      try {
        const params = new URLSearchParams({
          start: '-7d',
          end: 'now()',
          measurement: 'Vacuumspeed',
          field_max: 'vacuum_rpm_max',
          field_avg: 'vacuum_rpm_avg',
          machine_serial: 'T100',
        });

        const response = await fetch(`/api/sensors/vacuum-speed?${params}`);
        const data = await response.json();
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
        {error ? (
          <DataError />
        ) : data && data.length > 0 ? (
          <VacuumSpeedChart data={data} />
        ) : (
          <NoData />
        )}
      </div>
    </Card>
  );
};

export default VacuumSpeed;
