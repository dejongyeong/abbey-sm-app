import { Card, Typography } from 'antd';
import VacuumSpeedChart from './VacuumSpeedChart';
import NoData from '@/components/shared/sensors/NoData';
import DataError from '@/components/shared/sensors/DataError';

const { Title } = Typography;

const VacuumSpeed = ({ data, error }: any) => {
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

// const [data, setData] = useState<any[]>([]);

// useEffect(() => {
//   const fetching = async () => {
//     try {
//       const data = await getVacuumSpeed({
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

// const interval = setInterval(fetching, SENSOR_INTERVAL.vacuumSpeed);
// return () => {
//   clearInterval(interval);
// };
// }, []);
