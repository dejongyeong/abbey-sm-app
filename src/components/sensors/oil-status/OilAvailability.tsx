import { Card, Typography } from 'antd';
import NoData from '@/components/shared/sensors/NoData';
import DataError from '@/components/shared/sensors/DataError';
import OilAvailabilityChart from './OilAvailabilityChart';

const { Title, Text } = Typography;

const OilAvailability = ({ data, error }: any) => {
  return (
    <Card>
      <Title level={5}>
        Oil Availability Status{' '}
        <Text type="secondary" className="text-xs">
          <span className="font-bold">Label:</span>{' '}
          <span className="font-bold">0</span> - No Oil,{' '}
          <span className="font-bold">1</span> - Oil Available,{' '}
          <span className="font-bold">-1</span>: Sensor Calibration Error
        </Text>
      </Title>

      <div className="mt-6">
        {error ? (
          <DataError />
        ) : data && data.length > 0 ? (
          <OilAvailabilityChart data={data} />
        ) : (
          <NoData />
        )}
      </div>
    </Card>
  );
};

export default OilAvailability;

// const [data, setData] = useState([]);
// const [error, setError] = useState(false);

// useEffect(() => {
//   const fetching = async () => {
//     try {
//       const data = await getOilStatus({
//         start: '-9d',
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

/************************************** */

// const [value, setValue] = useState(0);
//   const [timestamp, setTimestamp] = useState('');

{
  /* <Card>
      <Title level={5}>Oil Availability Status</Title>
      <Text type="secondary">{timestamp}</Text>
      <div className="mt-3">
        {error ? <DataError /> : null}

        {value !== null && value !== -1 && !error ? (
          <OilAvailabilityChart percent={value} />
        ) : (
          <NoData />
        )}

        {value === -1 ? (
          <Result
            status="error"
            title="Calibration Failed"
            subTitle="Please check oil sensor"
          />
        ) : null}
      </div>
    </Card> */
}
