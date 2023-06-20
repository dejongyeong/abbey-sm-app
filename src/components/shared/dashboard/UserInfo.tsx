import { Typography } from 'antd';

const { Text } = Typography;

const UserInfo = ({ fullName, role }: { fullName: string; role: string }) => {
  return (
    <div className="flex flex-col gap-1 justify-center align-top">
      <Text strong>{fullName}</Text>
      <Text type="secondary" italic className="text-xs leading-none -mt-0.5">
        {role}
      </Text>
    </div>
  );
};

export default UserInfo;
