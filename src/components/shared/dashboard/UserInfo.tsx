import { Typography } from 'antd';

const { Text } = Typography;

//TODO: get user full name and roles
export default function UserInfo() {
  return (
    <div className="flex flex-col gap-1 justify-center align-top">
      <Text strong>Full Name</Text>
      <Text type="secondary" className="text-xs leading-none">
        User Role
      </Text>
    </div>
  );
}
