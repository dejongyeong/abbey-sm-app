import { useEffect, useState } from 'react';
import { Card, Result, Typography } from 'antd';
import NoData from '@/components/shared/sensors/NoData';
import DataError from '@/components/shared/sensors/DataError';
import { SENSOR_INTERVAL } from '@/config/constant';
import OilAvailabilityChart from './OilAvailabilityChart';
import { getOilStatus } from '@/services/sensor/get-oil-status';

const { Title, Text } = Typography;

const OilAvailability = () => {
  const [value, setValue] = useState(0);
  const [timestamp, setTimestamp] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetching = async () => {
      try {
        const data = await getOilStatus({
          start: '-7d',
          end: 'now()',
          serial: 'T100',
        });

        const { dt, value } = data[0];
        setValue(value);
        setTimestamp(dt);
      } catch (error) {
        setError(true);
      }
    };

    fetching();

    // const interval = setInterval(fetching, SENSOR_INTERVAL.vacuumTemp);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);

  // TODO: add machine number (user input)
  return (
    <Card>
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
    </Card>
  );
};

export default OilAvailability;
