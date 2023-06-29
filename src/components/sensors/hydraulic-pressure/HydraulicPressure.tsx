import { Card, Typography } from 'antd';
import NoData from '@/components/shared/sensors/NoData';
import DataError from '@/components/shared/sensors/DataError';
import HydraulicPressureChart from './HydraulicPressureChart';

const { Title } = Typography;

const HydraulicPressure = ({ data, error }: any) => {
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

// const [data, setData] = useState<any[]>([]);
// const [error, setError] = useState(false);

// useEffect(() => {
//   const fetching = async () => {
//     try {
//       const data = await getHydraulicPressure({
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

//   const interval = setInterval(fetching, SENSOR_INTERVAL.pressure);
//   return () => {
//     clearInterval(interval);
//   };
// }, []);
