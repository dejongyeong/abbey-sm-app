import { Card, Divider, Statistic, Typography } from 'antd';

const { Text } = Typography;

export default function RolesCount({ counts }: any) {
  return (
    <div className="grid min-[1441px]:grid-cols-7 max-[1440px]:grid-cols-4 max-[758px]:grid-cols-3 max-[605px]:grid-cols-2 max-[375px]:grid-cols-1 gap-3">
      {counts?.map((data: any, index: any) => {
        return (
          <Card key={index}>
            <Statistic title={data.name} value={data.count} />
          </Card>
        );
      })}
    </div>
  );
}
