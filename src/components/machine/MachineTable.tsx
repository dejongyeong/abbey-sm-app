import { Table, Tooltip, Typography } from 'antd';
import type { InputRef } from 'antd';
import { useRef } from 'react';
import { machineColumns } from './tables/TableColumns';
import { getTableColumns } from '@/services/machine/get-table-columns';
import { getTableData } from '@/services/machine/get-table-data';

const { Text } = Typography;

export default function MachineTable({ machines, user }: any) {
  const searchInput = useRef<InputRef>(null);
  const dataSource = getTableData(machines, user);

  // TODO: remove certain actions for farmers
  const cols = getTableColumns(user, searchInput);
  const columns = machineColumns(cols);

  return (
    <>
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
