import { Result, Typography } from 'antd';

const { Title } = Typography;

export default function DataError() {
  const title = <Title level={5}>Failed to Retrieve Data</Title>;
  const subtitle = <p>Try reload page. Contact support if the error persist</p>;

  return <Result status="error" title={title} subTitle={subtitle} />;
}
