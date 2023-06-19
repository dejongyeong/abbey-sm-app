import { Typography } from 'antd';

const { Text } = Typography;

const UserInfo = ({ fullName, role }: { fullName: string; role: string }) => {
  return (
    <div className="flex flex-col gap-1 justify-center align-top">
      <Text strong>{fullName}</Text>
      <Text type="secondary" className="text-xs leading-none">
        {role}
      </Text>
    </div>
  );
};

export default UserInfo;
