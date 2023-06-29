import { Card, Typography } from 'antd';
import NoData from '@/components/shared/sensors/NoData';
import DataError from '@/components/shared/sensors/DataError';
import VacuumTempChart from './VacuumTempChart';

const { Title } = Typography;

const VacuumTemp = ({ data, error }: any) => {
  return (
    <Card>
      <Title level={5}>Vacuum Pump Temperature</Title>
      <div className="mt-6">
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

// const [data, setData] = useState<any[]>([]);
// const [error, setError] = useState(false);

// useEffect(() => {
//   const fetching = async () => {
//     try {
//       const data = await getVacuumTemperature({
//         start: '-7d',
//         end: 'now()',
//         serial: 'T100',
//       });

//       setData(data);
//     } catch (error) {
//       setError(true);
//     }
//   };

//   fetching();

//   const interval = setInterval(fetching, SENSOR_INTERVAL.vacuumTemp);
//   return () => {
//     clearInterval(interval);
//   };
// }, []);

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
