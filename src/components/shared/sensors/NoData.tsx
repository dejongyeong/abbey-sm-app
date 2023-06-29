import { Empty } from 'antd';

export default function NoData() {
  const descr = (
    <div className="text-xs mt-3">
      Data Retention Period on <b>Trial Plan</b> is <b>30 days</b> only.
    </div>
  );

  return (
    <div className="h-full flex flex-row items-center justify-center">
      <Empty description={descr} />
    </div>
  );
}
