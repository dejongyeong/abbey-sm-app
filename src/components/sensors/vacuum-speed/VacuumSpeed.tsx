import { useEffect, useState } from 'react';
import MultiLineChart from './MultiLineChart';
import { Typography } from 'antd';

const { Title } = Typography;

const VacuumSpeed = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState();

  const api =
    '/api/sensors/vacuum-speed?start=-5d&end=now()&measurement=Vacuumspeed&field_max=vacuum_rpm_max&field_avg=vacuum_rpm_avg&machine_serial=T100';

  useEffect(() => {
    const eventSource = new EventSource(api);

    eventSource.onmessage = (event: any) => {
      const points = JSON.parse(event.data);
      setData((prev) => [...prev, points]);
    };

    eventSource.onerror = (error: any) => {
      setError(error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  // TODO: include error
  return (
    <div>
      <Title level={5}>Vacuum Speed</Title>
      <MultiLineChart data={data} />
    </div>
  );
};

export default VacuumSpeed;
