import _ from 'lodash';
import { Tag } from 'antd';
import { getColumnSearchProps } from '../../../shared/tables/TableHelpers';

export const farmManagerColumns: any = (searchInput: any) => [
  {
    title: 'Serial No',
    dataIndex: 'serial_no',
    key: 'serial_no',
    ...getColumnSearchProps('Serial No', searchInput),
    onFilter: (value: any, record: any) =>
      record.serial_no.toLowerCase().includes(value.toLowerCase()),
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
  {
    title: 'Model No',
    dataIndex: 'model_no',
    key: 'model_no',
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (text: any) => (
      <Tag key={text} color={`${text === 'Feeder' ? 'geekblue' : 'volcano'}`}>
        {text}
      </Tag>
    ),
    filters: [
      { text: 'Feeder', value: 'feeder' },
      { text: 'Tanker', value: 'tanker' },
    ],
    onFilter: (value: string, record: any) =>
      record.type.toLowerCase() === value.toLowerCase(),
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
  {
    title: `Dealership`,
    dataIndex: 'dealer_name',
    key: 'dealer_name',
    ...getColumnSearchProps('Dealership', searchInput),
    onFilter: (value: any, record: any) =>
      record.dealer_name.toLowerCase().includes(value.toLowerCase()),
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
  {
    title: `Dealership's Company`,
    dataIndex: 'dealer_company',
    key: 'dealer_company',
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
  {
    title: `Dealership's Phone`,
    dataIndex: 'dealer_phone',
    key: 'dealer_phone',
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
  {
    title: `Dealership's Email`,
    dataIndex: 'dealer_email',
    key: 'dealer_email',
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
];
