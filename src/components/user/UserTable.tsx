import { Table, Typography } from 'antd';

const { Title } = Typography;

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
    <div className="lg:w-10/12 order-1 lg:order-2">
      <div className="mb-4">
        <Title level={5}>User List:</Title>
      </div>
      <div className=" overflow-x-auto">
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
      </div>
    </div>
  );
}
