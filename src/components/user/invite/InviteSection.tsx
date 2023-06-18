import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

// TODO: add user form

export default function InviteSection({ senderId }: any) {
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
          children: <div className="p-2">{senderId}</div>,
        },
      ]}
    />
  );
}
