import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Divider } from 'antd';
import { Typography } from 'antd';
import InviteForm from './InviteForm';

const { Text } = Typography;

export default function InviteSection({ senderId, roles }: any) {
  return (
    <Collapse
      size="small"
      bordered={false}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      items={[
        {
          key: '1',
          label: (
            <div className="font-semibold text-custom-color">Invite User</div>
          ),
          children: (
            <div className="p-2">
              <Text type="secondary">
                System will send an invitation email to the user upon successful
                registration.
              </Text>
              <Divider className="mt-4" />
              <InviteForm senderId={senderId} roles={roles} />
            </div>
          ),
        },
      ]}
    />
  );
}
