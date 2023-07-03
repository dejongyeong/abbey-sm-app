import _ from 'lodash';
import { getColumnSearchProps } from './TableHelpers';
import { Badge, Button, Popconfirm, Space, Tag, Tooltip } from 'antd';
import {
  DeleteOutlined,
  EyeOutlined,
  MailOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import moment from 'moment';

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
        <Popconfirm
          placement="left"
          title="Delete User"
          description="Are you sure to delete this user?"
          okText="Yes"
          cancelText="No"
          okButtonProps={{ className: 'bg-custom-color hover:bg-hover-color' }}
          onConfirm={() => handleDelete(record)}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        >
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            className="flex items-center justify-center"
          />
        </Popconfirm>
      </Tooltip>

      {!record.status ? (
        <Tooltip title="Resend Invitation">
          <Button
            type="default"
            size="small"
            icon={<MailOutlined />}
            className="flex items-center justify-center"
            onClick={() => handleSendInvite(record)}
          />
        </Tooltip>
      ) : null}
    </Space>
  );
};

export const userColumns: any = (
  handleView: any,
  handleDelete: any,
  handleSendInvite: any,
  searchInput: any
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
    ...getColumnSearchProps('first_name', searchInput),
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
    ...getColumnSearchProps('email', searchInput),
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
    sorter: (a: any, b: any) => {
      return (
        moment(a.invited_at, 'DD-MM-YYYY HH:mm:ss').unix() -
        moment(b.invited_at, 'DD-MM-YYYY HH:mm:ss').unix()
      );
    },
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
    width: 170,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: Boolean) => (
      <Badge
        status={status ? 'success' : 'error'}
        text={status ? 'Registered' : 'Pending'}
      />
    ),
    filters: [
      { text: 'Registered', value: true },
      { text: 'Pending', value: false },
    ],
    onFilter: (value: boolean, record: any) => record.status === value,
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
    width: 150,
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
    width: 150,
    render: (_: any, record: any) =>
      renderActions(_, record, handleView, handleDelete, handleSendInvite),
  },
];
