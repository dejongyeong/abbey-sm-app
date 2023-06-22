import { useEffect, useState } from 'react';
import MultiLineChart from './MultiLineChart';
import { Card, Typography } from 'antd';
import NoData from '@/components/shared/sensors/NoData';
import DataError from '@/components/shared/sensors/DataError';

const { Title } = Typography;

const VacuumSpeed = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const api =
      '/api/sensors/vacuum-speed?start=-2d&end=now()&measurement=Vacuumspeed&field_max=vacuum_rpm_max&field_avg=vacuum_rpm_avg&machine_serial=T100';
    const eventSource = new EventSource(api);

    eventSource.onmessage = (event: any) => {
      const points = JSON.parse(event.data);
      setData((prev) => [...prev, points]);
    };

    eventSource.onerror = (error: any) => {
      setError(true);
      eventSource.close();
    };

    return () => {
      eventSource.close();
      setData([]); // beware of this if is causing problem to showing real-time
    };
  }, []);

  // TODO: add machine number
  return (
    <Card>
      <Title level={5}>Vacuum Speed</Title>
      <div className="mt-6">
        {error ? (
          <DataError />
        ) : data && data.length > 0 ? (
          <MultiLineChart data={data} />
        ) : (
          <NoData />
        )}
      </div>
    </Card>
  );
};

export default VacuumSpeed;
