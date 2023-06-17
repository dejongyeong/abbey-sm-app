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

export const getNavList = (router: NextRouter): MenuItem[] => {
  const items: MenuItem[] = [
    // Home dashboard
    getItem('Dashboard', '1', <HomeOutlined />, undefined, undefined, () => {
      router.push('/');
    }),

    // Users
    getItem('Users', '2', <UserSwitchOutlined />),

    // Machines
    getItem('Machines', '3', <ToolOutlined />),

    // Analytics
    getItem('Analytics', '4', <LineChartOutlined />),

    // Divider
    {
      type: 'divider',
      className: 'border border-gray-700 bg-gray-700 bg-opacity-75',
    },

    // Settings
    getItem('Settings', '5', <SettingOutlined />),
  ];

  return items;
};
