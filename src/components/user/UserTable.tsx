import { Table, Typography } from 'antd';

const { Text } = Typography;

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
  {
    key: '3',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

export default function UserTable({ users }: any) {
  return (
    <div className="lg:w-9/12 order-1 lg:order-2">
      <div className="mb-4">
        <Text>User List:</Text>
      </div>
      <div className=" overflow-x-auto">
        <Table
          size="middle"
          rowKey="key"
          bordered={false}
          loading={false}
          scroll={{ x: '100%' }}
          dataSource={dataSource}
          columns={columns}
          pagination={{
            position: ['bottomRight'],
            showTotal: (total: any, range: any) =>
              `${range[0]}-${range[1]} of ${total} items`,
            showSizeChanger: true,
          }}
        />
      </div>
    </div>
  );
}
