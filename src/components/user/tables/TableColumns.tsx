import _ from 'lodash';
import { getColumnSearchProps } from './TableHelpers';

export const columns = [
  {
    title: '#',
    key: 'index',
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
];
