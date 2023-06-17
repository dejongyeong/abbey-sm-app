import { useRouter } from 'next/router';
import { getNavList } from './NavList';
import { Menu } from 'antd';

export default function Navigation() {
  const router = useRouter();

  const items = getNavList(router);

  return <Menu theme="dark" mode="inline" items={items} className="mt-4" />;
}
