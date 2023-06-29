import dayjs from 'dayjs';
import SensorData from '@/components/sensors/historical-data/SensorData';
import { getDefaultStartEndDate } from '@/utils/get-default-start-end-date';
import { selectionSchema } from '@/validations/sensors/selection-schema';
import { Button, DatePicker, Form, Select } from 'antd';
import { useState } from 'react';
import { DATE_FORMAT } from '@/config/constant';
import { getVacuumSpeed } from '@/services/sensor/get-vacuum-speed';
import { getVacuumTemperature } from '@/services/sensor/get-vacuum-temperature';
import { getHydraulicPressure } from '@/services/sensor/get-hydraulic-pressure';
import { getOilStatus } from '@/services/sensor/get-oil-status';
import { getGps } from '@/services/sensor/get-gps-data';

const { RangePicker } = DatePicker;

const yupSync = {
  async validator({ field }: any, value: any) {
    await selectionSchema.validateSyncAt(field, { [field]: value });
  },
};
const DataSection = () => {
  const [form] = Form.useForm();
  const { defaultStartDate, defaultEndDate } = getDefaultStartEndDate();

  // sensor data
  const [vacuumSpeed, setVacuumSpeed] = useState([]);
  const [vacuumSpeedError, setVacuumSpeedError] = useState(false);
  const [vacuumTemp, setVacuumTemp] = useState([]);
  const [vacuumTempError, setVacuumTempError] = useState(false);
  const [hydraulicPressure, setHydraulicPressure] = useState([]);
  const [hydraulicPressureError, setHydraulicPressureError] = useState(false);
  const [oilStatus, setOilStatus] = useState([]);
  const [oilStatusError, setOilStatusError] = useState(false);
  const [gps, setGps] = useState([]);
  const [gpsError, setGpsError] = useState(false);

  const onFinish = async ({ serial, range_picker }: any) => {
    const start = dayjs(range_picker[0]).format(DATE_FORMAT);
    const end = dayjs(range_picker[1]).format(DATE_FORMAT);

    // vacuum speed data
    try {
      const vacuumSpeedData = await getVacuumSpeed({
        start: start,
        end: end,
        serial: serial,
      });
      setVacuumSpeed(vacuumSpeedData);
    } catch (error) {
      setVacuumSpeedError(true);
    }

    // vacuum temperature data
    try {
      const vacuumTempData = await getVacuumTemperature({
        start: start,
        end: end,
        serial: serial,
      });
      setVacuumTemp(vacuumTempData);
    } catch (error) {
      setVacuumTempError(true);
    }

    // hydraulic pressure data
    try {
      const hydraulicPressureData = await getHydraulicPressure({
        start: start,
        end: end,
        serial: serial,
      });
      setHydraulicPressure(hydraulicPressureData);
    } catch (error) {
      setHydraulicPressureError(true);
    }

    // oil status data
    try {
      const oilStatusData = await getOilStatus({
        start: start,
        end: end,
        serial: serial,
      });
      setOilStatus(oilStatusData);
    } catch (error) {
      setOilStatusError(true);
    }

    // gps data
    try {
      const gpsData = await getGps({ start: start, end: end, serial: serial });
      setGps(gpsData);
    } catch (error) {
      setGpsError(true);
    }
  };

  const initialValues = {
    range_picker: [dayjs(defaultStartDate), dayjs(defaultEndDate)],
  };

  return (
    <>
      <div className="flex justify-between align-middle gap-3 mb-3">
        <Form
          form={form}
          name="historical"
          layout="horizontal"
          labelWrap
          labelAlign="left"
          labelCol={{ span: 7 }}
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Form.Item name="serial" label="Machines:" required rules={[yupSync]}>
            <Select placeholder="Machine Serial Number">
              <Select.Option value="T100">T100</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="range_picker"
            label="Date Range:"
            required
            rules={[yupSync]}
          >
            <RangePicker className="w-full" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-custom-color hover:bg-hover-color"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      <SensorData
        vacuumSpeed={vacuumSpeed}
        vacuumSpeedError={vacuumSpeedError}
        vacuumTemp={vacuumTemp}
        vacuumTempError={vacuumTempError}
        hydraulicPressure={hydraulicPressure}
        hydraulicPressureError={hydraulicPressureError}
        oilStatus={oilStatus}
        oilStatusError={oilStatusError}
        gps={gps}
        gpsError={gpsError}
      />
    </>
  );
};

export default DataSection;
