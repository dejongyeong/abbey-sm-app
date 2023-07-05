import { useRouter } from 'next/router';
import { getNavList } from './NavList';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';

export default function Navigation({ role }: { role: string }) {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState(['1']);

  useEffect(() => {
    const current = router.asPath.split('/').slice(0, 2).join('/');
    switch (current) {
      case '/users':
        setSelectedKeys(['2']);
        break;
      case '/machines':
        setSelectedKeys(['3']);
        break;
      case '/analytics':
        setSelectedKeys(['4']);
        break;
      default:
        setSelectedKeys(['1']);
        break;
    }
  }, [router]);

  const items = getNavList(role, router, setSelectedKeys);

  return (
    <Menu
      theme="dark"
      mode="inline"
      items={items}
      selectedKeys={selectedKeys}
      className="mt-4"
    />
  );
}
