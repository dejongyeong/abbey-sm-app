import { Table, Typography } from 'antd';
import { columns } from './tables/TableColumns';

const { Text } = Typography;

export default function UserTable({ users }: any) {
  const dataSource = users?.map((user: any) => ({
    key: user.sb_auth_id,
    first_name: user.first_name,
    last_name: user.last_name,
  }));

  console.log(users);

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
