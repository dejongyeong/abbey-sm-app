import Logout from '@/components/auth/Logout';
import { Divider, Layout } from 'antd';
import Notification from './Notification';
import UserAva from './UserAva';
import UserInfo from './UserInfo';

const { Header } = Layout;

export default function Banner() {
  return (
    <Header className="w-full flex justify-end items-center bg-white pe-12">
      <div className="flex flex-row gap-3 justify-end items-center">
        <Notification />
        <Logout />
        <Divider type="vertical" className="h-8" />
        <UserAva />
        <UserInfo />
      </div>
    </Header>
  );
}
