import {
  HomeOutlined,
  LineChartOutlined,
  SettingOutlined,
  ToolOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { MenuProps } from 'antd';
import { NextRouter } from 'next/router';

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
  onClick?: Function
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
    onClick,
  } as MenuItem;
};

export const getNavList = (
  role: string,
  router: NextRouter,
  setSelectedKeys: Function
): MenuItem[] => {
  let items: MenuItem[] = [
    // Home dashboard
    getItem('Dashboard', '1', <HomeOutlined />, undefined, undefined, () => {
      router.push('/');
    }),

    // Machines
    getItem('Machines', '3', <ToolOutlined />),

    // Analytics
    getItem(
      'Analytics',
      '4',
      <LineChartOutlined />,
      undefined,
      undefined,
      () => {
        router.push('/analytics');
      }
    ),

    // Divider
    {
      type: 'divider',
      className: 'border border-gray-700 bg-gray-700 bg-opacity-75',
    },

    // Settings
    getItem('Settings', '5', <SettingOutlined />),
  ];

  const allow = ['am-admin', 'am-manager', 'dealership', 'dealership'];
  if (allow.includes(role)) {
    // Users
    items.splice(
      1,
      0,
      getItem(
        'Users',
        '2',
        <UserSwitchOutlined />,
        undefined,
        undefined,
        () => {
          router.push('/users');
        }
      )
    );
  }

  return items;
};
