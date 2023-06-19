import { Avatar } from 'antd';

const UserAva = ({ shortName }: any) => {
  return (
    <Avatar
      size={40}
      gap={10}
      className="inline-block align-top bg-avatar-color text-white"
    >
      {shortName}
    </Avatar>
  );
};

export default UserAva;
