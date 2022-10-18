import React from 'react';
import { Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Emitter, EventConstant } from '@/utils/emitter';

interface SearchItemProcessorProps {
  columnItem: any;
  dataIndex: string;
  title: string;

  filteredInfo: object;
  backendPagination: boolean | object;
  searchFilter: Array<{ searchText: string; searchedColumn: string }>;
}

const processSearchFilter = (columns, dataIndexKey = 'dataIndex') => {
  return columns
    .filter((item) => item.filterType === 'search')
    .map((item) => {
      return {
        searchText: item.defaultText || '',
        searchedColumn: item[dataIndexKey],
      };
    });
};

const onFilterHandler = (value, record, dataKeys: string[]) => {
  let hasMatched = false;
  for (let dataKey of dataKeys) {
    hasMatched = record[dataKey].toString().includes(value);
    if (hasMatched) {
      break;
    }
  }

  return hasMatched;
};

const SearchItemProcessor = (props: SearchItemProcessorProps) => {
  if (props.columnItem?.filterType !== 'search') {
    return {
      ...props.columnItem,
    };
  }

  // 当为search的时候才给
  return {
    ...props.columnItem,
    // 新增filteredValue
    filteredValue: props.filteredInfo[props.dataIndex] || null,
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`搜索:${props.title}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => {
            confirm();
            Emitter.emit(EventConstant.TABLE_COLUMN_SEARCH_CONFIRM, {
              selectedKeys: selectedKeys,
              dataIndex: props.dataIndex,
            });
          }}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              confirm();
              Emitter.emit(EventConstant.TABLE_COLUMN_SEARCH_CONFIRM, {
                selectedKeys: selectedKeys,
                dataIndex: props.dataIndex,
              });
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              Emitter.emit(EventConstant.TABLE_COLUMN_SEARCH_RESET, {
                dataIndex: props.dataIndex,
              });
            }}
            size="small"
            style={{ width: 90 }}
          >
            重置
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      return props.backendPagination
        ? record[props.dataIndex]
        : record[props.dataIndex]
        ? onFilterHandler(value, record, [props.dataIndex])
        : false;
    },
    render: (node, record, index) => {
      return props.searchFilter.find(
        (searchFilterItem) =>
          searchFilterItem?.searchedColumn === props.dataIndex,
      )?.searchText ? (
        <>
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[
              props.searchFilter.find(
                (searchFilterItem) =>
                  searchFilterItem?.searchedColumn === props.dataIndex,
              )?.searchText,
            ]}
            autoEscape
            textToHighlight={record[props.dataIndex]}
          />
        </>
      ) : (
        node
      );
    },
  };
};

export { SearchItemProcessor, processSearchFilter };
