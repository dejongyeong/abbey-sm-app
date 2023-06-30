import _ from 'lodash';
import { getColumnSearchProps } from './TableHelpers';
import { Badge, Tag } from 'antd';

export const columns: any = [
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
  },
];
