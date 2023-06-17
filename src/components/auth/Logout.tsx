import { logout } from '@/services/auth/logout';
import { LoadingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    setLoading(true);
    try {
      const data = await logout();
      toast.success(data.message);
      router.push('/auth/login');
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center align-middle">
      <Tooltip title="Logout">
        <Button
          type="text"
          shape="circle"
          icon={!loading ? <LogoutOutlined /> : <LoadingOutlined />}
          className="flex items-center justify-center"
          onClick={signOut}
        />
      </Tooltip>
    </div>
  );
}
