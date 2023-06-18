import { BellOutlined } from '@ant-design/icons';
import { Badge, Button, Dropdown, MenuProps } from 'antd';

// TODO: get from database, integrate with influxdb
const items: MenuProps['items'] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

export default function Notification() {
  return (
    <div className="flex justify-center align-middle">
      <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
        <Button
          type="text"
          icon={
            <Badge dot className="-mt-1">
              <BellOutlined />
            </Badge>
          }
          className="flex items-center justify-center"
        />
      </Dropdown>
    </div>
  );
}
