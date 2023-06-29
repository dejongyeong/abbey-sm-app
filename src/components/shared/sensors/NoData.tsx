import { Empty } from 'antd';

export default function NoData() {
  const descr = (
    <div className="text-xs mt-3 flex flex-col gap-1">
      <p className="font-bold">No data available in the selected date range.</p>
      <p>
        Note: Data Retention Period on InfluxDB Cloud Trial Plan is 30 days
        only.
      </p>
    </div>
  );

  return (
    <div className="h-full flex flex-row items-center justify-center">
      <Empty description={descr} />
    </div>
  );
}
