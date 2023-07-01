import { logout } from '@/services/auth/logout';
import { displayMessage } from '@/utils/display-message';
import { LoadingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Tooltip, message } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const signOut = async () => {
    setLoading(true);
    try {
      const data = await logout();
      displayMessage(messageApi, 'success', data.message);
      router.push('/auth/login');
    } catch (error) {
      displayMessage(messageApi, 'error', (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center align-middle">
      {contextHolder}
      <Tooltip title="Logout">
        <Button
          type="text"
          icon={!loading ? <LogoutOutlined /> : <LoadingOutlined />}
          className="flex items-center justify-center"
          onClick={signOut}
        />
      </Tooltip>
    </div>
  );
}
