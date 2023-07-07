import _ from 'lodash';
import { Tag } from 'antd';
import { getColumnSearchProps } from '../../../shared/tables/TableHelpers';

export const dealershipColumns: any = (searchInput: any) => [
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
    title: 'Provider Name',
    dataIndex: 'registrar_name',
    key: 'registrar_name',
    render: (_: any, record: any) =>
      `${record.registrar_first_name} ${record.registrar_last_name}`,
    ...getColumnSearchProps('Provider Name', searchInput),
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
  {
    title: `Provider Phone`,
    dataIndex: 'registrar_phone',
    key: 'registrar_phone',
    render: (_: any, record: any) =>
      `${record.registrar_dial_code} ${record.registrar_phone}`,
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
  {
    title: `Provider Email`,
    dataIndex: 'registrar_email',
    key: 'registrar_email',
    shouldCellUpdate: (record: any, prev: any) => !_.isEqual(record, prev),
  },
];
