import { useRouter } from 'next/router';
import { getNavList } from './NavList';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState(['1']);

  useEffect(() => {
    const current = router.asPath;
    switch (current) {
      case '/users':
        setSelectedKeys(['2']);
        break;
      default:
        setSelectedKeys(['1']);
        break;
    }
  }, [router]);

  const items = getNavList(router, setSelectedKeys);

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
