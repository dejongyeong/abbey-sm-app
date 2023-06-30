import { Card, Divider, Statistic, Typography } from 'antd';

const { Title } = Typography;

export default function RolesCount() {
  return (
    <div className="lg:w-2/12 order-2 lg:order-1">
      <Divider className="lg:hidden" />
      <div className="mb-4">
        <Title level={5}>Total Users:</Title>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <Statistic title="Active Users" value={11111} />
        </Card>
        <Card>
          <Statistic title="Active Users" value={11111} />
        </Card>
        <Card>
          <Statistic title="Active Users" value={11111} />
        </Card>
        <Card>
          <Statistic title="Active Users" value={11111} />
        </Card>
        <Card>
          <Statistic title="Active Users" value={11111} />
        </Card>
        <Card>
          <Statistic title="Active Users" value={11111} />
        </Card>
      </div>
    </div>
  );
}
