import { Table, Tooltip, Typography, message } from 'antd';
import type { InputRef } from 'antd';
import { useRef } from 'react';
import { machineColumns } from './tables/TableColumns';
import { getTableColumns } from '@/services/machine/get-table-columns';
import { getTableData } from '@/services/machine/get-table-data';
import { displayMessage } from '@/utils/display-message';
import { unassignMachines } from '@/services/machine/unassign-machines';

const { Text } = Typography;

export default function MachineTable({ machines, user }: any) {
  const [messageApi, contextHolder] = message.useMessage();
  const searchInput = useRef<InputRef>(null);
  const dataSource = getTableData(machines, user);

  // handlers
  const handleUnassign = async (record: any) => {
    try {
      const machine = await unassignMachines(user, record.key);
      const message = `${machine.serial_no} unassign successful`;
      displayMessage(messageApi, 'success', message);
    } catch (error: any) {
      displayMessage(messageApi, 'error', error?.message);
    } finally {
      window.location.reload();
    }
  };

  const cols = getTableColumns(user, searchInput);
  const role = user?.role.alias;
  const columns = machineColumns(cols, role, handleUnassign);

  return (
    <>
      {contextHolder}
      <Tooltip title="Reload page to see the latest list.">
        <Text className="text-gray-600 font-semibold">Machine List:</Text>
      </Tooltip>
      <div className="mt-3 overflow-x-auto">
        <Table
          size="middle"
          rowKey="key"
          bordered={true}
          loading={false}
          scroll={{ x: 1500 }}
          dataSource={dataSource}
          columns={columns}
          pagination={{
            position: ['bottomRight'],
            showTotal: (total: any, range: any) =>
              `${range[0]}-${range[1]} of ${total} items`,
            showSizeChanger: true,
          }}
          className="mt-1"
        />
      </div>
    </>
  );
}
