import { Card, Divider, Statistic } from 'antd';

export default function RolesCount() {
  return (
    <div className="col-span-1 max-[1024px]:order-2">
      <Divider className="min-[1025px]:hidden max-[1024px]:visible" />
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
