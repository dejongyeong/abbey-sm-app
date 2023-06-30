import { Card, Divider, Statistic, Typography } from 'antd';

const { Text } = Typography;

export default function RolesCount({ counts }: any) {
  return (
    <div className="lg:w-3/12 order-2 lg:order-1">
      <Divider className="lg:hidden" />
      <div className="mb-4">
        <Text>Total Users:</Text>
      </div>
      <div className="grid max-[1440px]:grid-cols-1 min-[1441px]:grid-cols-2 gap-3">
        {counts?.map((data: any, index: any) => {
          return (
            <Card key={index}>
              <Statistic title={data.name} value={data.count} />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
