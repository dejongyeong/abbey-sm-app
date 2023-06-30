import { Table, Typography } from 'antd';
import { columns } from './tables/TableColumns';

const { Text } = Typography;

export default function UserTable({ users }: any) {
  const dataSource = users?.map((user: any) => ({
    key: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: `${user.dial_code} ${user.phone}`,
    role: user.role.name,
    inviter: `${user.invites_received[0]?.sender.first_name} ${user.invites_received[0]?.sender.last_name}`,
    status: user.invites_received[0]?.is_accepted,
    company: `${user.company.name ? user.company.name : '-'}`,
    country: `${user.company.state ? user.company.state : '-'}`,
    zip: `${user.company.zip ? user.company.zip : '-'}`,
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
          bordered={true}
          loading={false}
          scroll={{ x: 2000 }}
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
