import Logout from '@/components/auth/Logout';
import { Divider, Layout } from 'antd';
import Notification from './Notification';
import UserAva from './UserAva';
import UserInfo from './UserInfo';
import { getShortName } from '@/utils/get-short-name';

const { Header } = Layout;

export default function Banner({ user }: any) {
  const fullName = `${user?.first_name} ${user?.last_name}`;
  const shortName = getShortName(fullName);
  const role = user.role.name;

  return (
    <Header className="w-full flex justify-end items-center bg-white pe-12 max-[425px]:p-0 max-[425px]:pe-6">
      <div className="flex flex-row gap-3 justify-end items-center">
        <Notification />
        <Logout />
        <Divider type="vertical" className="h-8" />
        <UserAva shortName={shortName} />
        <UserInfo fullName={fullName} role={role} />
      </div>
    </Header>
  );
}
