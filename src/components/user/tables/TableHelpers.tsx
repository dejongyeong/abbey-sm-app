import { Input, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React from 'react';

export const handleSearch = (confirm: any) => {
  confirm();
};

export const handleReset = (
  setSelectedKeys: any,
  clearFilters: any,
  confirm: any
) => {
  clearFilters();
  setSelectedKeys([]);
  confirm();
};

export const getColumnSearchProps = (dataIndex: any) => {
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(confirm)}
          className="mb-2 block"
        />
        <Space>
          <Button
            type="primary"
            onClick={confirm}
            size="small"
            className="w-24 bg-custom-color hover:bg-hover-color"
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(setSelectedKeys, clearFilters, confirm)}
            size="small"
            className="w-24 text-custom-color"
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <SearchOutlined className={filtered ? 'text-blue-500' : ''} />
    ),
    onFilter: (value: any, record: any) =>
      record.first_name.toLowerCase().includes(value.toLowerCase()),
  };
};
