import _ from 'lodash';
import { Tag } from 'antd';
import { getColumnSearchProps } from '../../../shared/tables/TableHelpers';

export const farmerColumns: any = (searchInput: any) => [
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
    title: 'Farm Manager',
    dataIndex: 'farm_manager_name',
    key: 'farm_manager_name',
    ...getColumnSearchProps('Farm Manager', searchInput),
    onFilter: (value: any, record: any) =>
      record.farm_manager_name.toLowerCase().includes(value.toLowerCase()),
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
  {
    title: `Farm Manager's Phone`,
    dataIndex: 'farm_manager_phone',
    key: 'farm_manager_phone',
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
];
