import { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import NoData from '@/components/shared/sensors/NoData';
import DataError from '@/components/shared/sensors/DataError';
import VacuumTempChart from './VacuumTempChart';

const { Title } = Typography;

const VacuumTemp = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const api =
      '/api/sensors/vacuum-temp?start=-2d&end=now()&machine_serial=T100';
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

  // TODO: add machine number (user input)
  return (
    <Card>
      <Title level={5}>Vacuum Pump Temperature</Title>
      <div className="mt-6">
        {error ? (
          <DataError />
        ) : data && data.length > 0 ? (
          <VacuumTempChart data={data} />
        ) : (
          <NoData />
        )}
      </div>
    </Card>
  );
};

export default VacuumTemp;
