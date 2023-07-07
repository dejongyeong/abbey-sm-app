import { EyeOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import _ from 'lodash';

const renderActions = (_: any, record: any) => {
  return (
    <Space size="small" wrap>
      <Tooltip title="View">
        <Button
          type="primary"
          size="small"
          icon={<EyeOutlined />}
          className="flex items-center justify-center bg-custom-color hover:bg-hover-color"
        />
      </Tooltip>
    </Space>
  );
};

export const machineColumns: any = (column: any) => [
  {
    title: '#',
    key: 'index',
    width: '3%',
    render: (_: any, __: any, index: any) => <div>{index + 1}</div>,
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
  ...column,
  {
    title: 'Actions',
    key: 'actions',
    width: 150,
    render: (_: any, record: any) => renderActions(_, record),
  },
];
