import { Table } from 'antd';

// TODO: get data from database

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

export default function UserTable() {
  return (
    <Table
      size="middle"
      rowKey="key"
      bordered={true}
      loading={false}
      scroll={{ x: '100%' }}
      dataSource={dataSource}
      columns={columns}
      pagination={{
        position: ['bottomRight'],
        showTotal: (total: any, range: any) =>
          `${range[0]}-${range[1]} of ${total} items`,
      }}
    />
  );
}
