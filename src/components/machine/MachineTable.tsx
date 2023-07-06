import { Tooltip, Typography } from 'antd';

const { Text } = Typography;

export default function MachineTable() {
  return (
    <div className="mt-10">
      <Tooltip title="Reload page to see the latest list.">
        <Text className="font-semibold">Machine List:</Text>
      </Tooltip>
      <div className="mt-3 overflow-x-auto">
        list with conditional filtering based on use role
      </div>
    </div>
  );
}
