import { Result, Typography } from 'antd';

const { Title } = Typography;

export default function DataError() {
  const title = <Title level={5}>Failed to Retrieve Data</Title>;
  const subtitle = <p>Try reload page. Contact support if the error persist</p>;

  return (
    <div className="h-full flex flex-row items-center justify-center">
      <Result status="error" title={title} subTitle={subtitle} />
    </div>
  );
}
