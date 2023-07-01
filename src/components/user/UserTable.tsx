import { Table, Typography, message } from 'antd';
import type { InputRef } from 'antd';
import { userColumns } from './tables/TableColumns';
import moment from 'moment';
import { resendInvite } from '@/services/user/resend-invite';
import { displayMessage } from '@/utils/display-message';
import { useRef } from 'react';
import { deleteUser } from '@/services/user/delete-user';

const { Text } = Typography;

export default function UserTable({ users }: any) {
  const [messageApi, contextHolder] = message.useMessage();
  const searchInput = useRef<InputRef>(null);

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

  const handleView = (record: any) => {
    alert(`view click: ${JSON.stringify(record)}`);
  };

  const handleDelete = async (record: any) => {
    try {
      const data = await deleteUser(record.sb_auth_id);
      displayMessage(messageApi, 'success', data?.message);
    } catch (error: any) {
      displayMessage(messageApi, 'error', error?.message);
    } finally {
      window.location.reload();
    }
  };

  const handleSendInvite = async (record: any) => {
    try {
      const data = await resendInvite(record.email);
      displayMessage(messageApi, 'success', data?.message);
    } catch (error: any) {
      displayMessage(messageApi, 'error', error?.message);
    }
  };

  const columns = userColumns(
    handleView,
    handleDelete,
    handleSendInvite,
    searchInput
  );

  return (
    <>
      {contextHolder}
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
    </>
  );
}
