import _ from 'lodash';
import { getColumnSearchProps } from './TableHelpers';
import { Badge, Button, Space, Tag, Tooltip } from 'antd';
import { DeleteOutlined, EyeOutlined, MailOutlined } from '@ant-design/icons';

const renderActions = (
  _: any,
  record: any,
  handleView: any,
  handleDelete: any,
  handleSendInvite: any
) => {
  return (
    <Space size="small" wrap>
      <Tooltip title="View">
        <Button
          type="primary"
          size="small"
          icon={<EyeOutlined />}
          className="flex items-center justify-center bg-custom-color hover:bg-hover-color"
          onClick={() => handleView(record)}
        />
      </Tooltip>

      <Tooltip title="Delete">
        <Button
          danger
          type="primary"
          size="small"
          icon={<DeleteOutlined />}
          className="flex items-center justify-center"
        />
      </Tooltip>

      {!record.status ? (
        <Tooltip title="Send Invitation">
          <Button
            type="default"
            size="small"
            icon={<MailOutlined />}
            className="flex items-center justify-center"
          />
        </Tooltip>
      ) : null}
    </Space>
  );
};

export const userColumns: any = (
  handleView: any,
  handleDelete: any,
  handleSendInvite: any
) => [
  {
    title: '#',
    key: 'index',
    width: '3%',
    render: (_: any, __: any, index: any) => <div>{index + 1}</div>,
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
  {
    title: 'First Name',
    dataIndex: 'first_name',
    key: 'first_name',
    ...getColumnSearchProps('first_name'),
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
    key: 'last_name',
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    ...getColumnSearchProps('email'),
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
    width: 290,
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
    width: 160,
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (text: any) => (
      <Tag key={text} color="geekblue">
        {text}
      </Tag>
    ),
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
    width: 170,
  },
  {
    title: 'Inviter',
    dataIndex: 'inviter',
    key: 'inviter',
    render: (text: any) => (
      <Tag key={text} color="cyan">
        {text}
      </Tag>
    ),
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
    width: 170,
  },
  {
    title: 'Invited At',
    dataIndex: 'invited_at',
    key: 'invited_at',
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
    width: 170,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: Boolean) => (
      <Badge
        status={status ? 'success' : 'processing'}
        text={status ? 'Registered' : 'Pending'}
      />
    ),
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
    width: 150,
  },
  {
    title: 'Eir Code',
    dataIndex: 'zip',
    key: 'zip',
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
    width: 100,
  },
  {
    title: 'Actions',
    key: 'actions',
    fixed: 'right',
    width: 200,
    render: (_: any, record: any) =>
      renderActions(_, record, handleView, handleDelete, handleSendInvite),
  },
];

// record.sb_auth_id
