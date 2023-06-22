import { useEffect, useState } from 'react';

export default function VacuumSpeed() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState();

  const api =
    '/api/sensors/vacuum-speed?start=-30d&end=now()&measurement=Vacuumspeed&field_max=vacuum_rpm_max&field_avg=vacuum_rpm_avg&machine_serial=T100';
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

  // TODO: include error and antd graph
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{item.dt}</div>
      ))}
    </div>
  );
}
