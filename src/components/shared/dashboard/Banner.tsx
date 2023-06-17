import Logout from '@/components/auth/Logout';
import { Divider, Layout } from 'antd';
import Notification from './Notification';

const { Header } = Layout;

export default function Banner() {
  return (
    <Header className="w-full flex justify-end items-center bg-white pe-10">
      <div className="flex flex-row gap-3 justify-end items-center">
        <Logout />
        <Notification />
        <Divider type="vertical" className="h-8" />
        <div>Avatar</div>
        <div>User Info</div>
      </div>
    </Header>
  );
}
