import {
  CloseOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import _ from 'lodash';

// farmers can only view
const renderActions = (_: any, record: any, role: any, handleUnassign: any) => {
  return (
    <Space size="small" wrap>
      <Tooltip title="View">
        <Button
          type="primary"
          size="small"
          icon={<EyeOutlined />}
          className="flex items-center justify-center bg-custom-color hover:bg-hover-color shadow-none"
        />
      </Tooltip>
      {role !== 'farmer' && role !== 'am-service-team' ? (
        <Tooltip title="Unassign">
          <Popconfirm
            placement="left"
            title="Unassign machine"
            description="Are you sure to unassign this machine from the user?"
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              className: 'bg-custom-color hover:bg-hover-color',
            }}
            onConfirm={() => handleUnassign(record)}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Button
              danger
              size="small"
              icon={<CloseOutlined />}
              className="flex items-center justify-center"
            />
          </Popconfirm>
        </Tooltip>
      ) : null}
    </Space>
  );
};

export const machineColumns: any = (
  column: any,
  role: any,
  handleUnassign: any
) => [
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
    render: (_: any, record: any) =>
      renderActions(_, record, role, handleUnassign),
  },
];
