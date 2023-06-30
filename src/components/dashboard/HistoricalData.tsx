import dayjs from 'dayjs';
import SensorData from '@/components/sensors/historical-data/SensorData';
import { getDefaultStartEndDate } from '@/utils/get-default-start-end-date';
import { selectionSchema } from '@/validations/sensors/selection-schema';
import { Button, DatePicker, Form, Select } from 'antd';
import { useState } from 'react';
import { DATE_FORMAT } from '@/config/constant';
import getAllData from '@/services/sensor/get-all-data';

const { RangePicker } = DatePicker;

const yupSync = {
  async validator({ field }: any, value: any) {
    await selectionSchema.validateSyncAt(field, { [field]: value });
  },
};
const HistoricalData = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const { defaultStartDate, defaultEndDate } = getDefaultStartEndDate();

  // sensor data
  const [sensorData, setSensorData] = useState({
    vacuumSpeed: [],
    vacuumSpeedError: false,
    vacuumTemp: [],
    vacuumTempError: false,
    hydraulicPressure: [],
    hydraulicPressureError: false,
    oilStatus: [],
    oilStatusError: false,
    gps: [],
    gpsError: false,
  });

  const onFinish = async ({ serial, range_picker }: any) => {
    setLoading(true);
    const start = dayjs(range_picker[0]).format(DATE_FORMAT);
    const end = dayjs(range_picker[1]).add(1, 'day').format(DATE_FORMAT);

    try {
      const updatedSensorData = await getAllData(start, end, serial);
      setSensorData(updatedSensorData);
    } catch (error) {
      // only show this when unable to get all the data
      setSensorData((prev) => ({
        ...prev,
        vacuumSpeedError: true,
        vacuumTempError: true,
        hydraulicPressureError: true,
        oilStatusError: true,
        gpsError: true,
      }));
    } finally {
      setLoading(false);
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
              loading={loading}
              disabled={loading}
              className="w-full bg-custom-color hover:bg-hover-color"
            >
              {!loading ? 'Populate' : 'Populating'}
            </Button>
          </Form.Item>
        </Form>
      </div>

      <SensorData {...sensorData} />
    </>
  );
};

export default HistoricalData;
