import { Table, Typography } from 'antd';
import { userColumns } from './tables/TableColumns';
import moment from 'moment';

const { Text } = Typography;

export default function UserTable({ users }: any) {
  const dataSource = users?.map((user: any) => ({
    key: user.id,
    sb_auth_id: user.sb_auth_id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: `${user.dial_code} ${user.phone}`,
    role: user.role.name,
    inviter: `${user.invites_received[0]?.sender.first_name} ${user.invites_received[0]?.sender.last_name}`,
    invited_at: `${moment(user.invites_received[0]?.created_at).format(
      'DD-MM-YYYY HH:mm:ss'
    )}`,
    status: user.invites_received[0]?.is_accepted,
    company: `${user.company.name ? user.company.name : '-'}`,
    country: `${user.company.state ? user.company.state : '-'}`,
    zip: `${user.company.zip ? user.company.zip : '-'}`,
  }));

  console.log(users);

  const handleView = (record: any) => {
    alert(`view click: ${JSON.stringify(record)}`);
  };

  const handleDelete = (record: any) => {
    alert(`view click: ${JSON.stringify(record)}`);
  };

  const handleSendInvite = (record: any) => {
    alert(`view click: ${JSON.stringify(record)}`);
  };

  const columns = userColumns(handleView, handleDelete, handleSendInvite);

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
          scroll={{ x: 2300 }}
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
