import { Button, Skeleton, Space, TablePaginationConfig } from 'antd';
import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ParamsType } from '@ant-design/pro-provider';
import { ColumnType, FilterValue } from 'antd/lib/table/interface';
import './index.less';
import { ProTable, ProTableProps } from '@ant-design/pro-table';
import { valueNullOrUndefinedReturnDash } from '@/utils/utils';
import { Emitter, EventConstant } from '@/utils/emitter';
import {
  processSearchFilter,
  SearchItemProcessor,
} from '@/components/table/processor/column/search-item';
import FilterItemProcessor from '@/components/table/processor/column/filter-item';
import { v4 as uuidv4 } from 'uuid';
import { FileExcelOutlined } from '@ant-design/icons';
import isEmpty from 'lodash/isEmpty';
import Toolbar from '@ant-design/pro-table/es/components/ToolBar';
import { processSummaryData } from '@/components/table/processor/data/summary-data';
import { exportExcel } from '@/utils/excel-export';
import cloneDeep from 'lodash/cloneDeep';
import ColumnDefinitionProcessor from '@/components/table/processor/column/columnDefinitionProcessor';

const defaultOptions = {
  density: false,
  reload: false,
  setting: false,
  fullScreen: false,
};

const defaultPagination: TablePaginationConfig = {
  size: 'default',
  pageSize: 10,
  pageSizeOptions: ['10', '20'],
  hideOnSinglePage: true,
};

interface ColumnItem<RecordType> extends ColumnType<RecordType> {
  data?: string;
  draggable?: boolean;
}

interface UniTableProps<T, U = ParamsType> extends ProTableProps<T, U> {
  id: string;
  tableHeader?: React.ReactNode;
  tableHeaderTitle?: string;
  columns?: any[];
  dataItemType?: string;
  columnDefinitions?: object;
  dataSource?: any[];
  rowKey: string;
  scroll?: object;
  height?: number;
  // 请求方法
  columnsFetch?: () => Promise<any[]>;
  dataFetch?: () => Promise<any[]>;
  // dataProcessor
  dataItemProcessor?: (dataItem: any, index: number) => any;
  // columnProcessor
  columnItemProcessor?: (columnItem: any, index: number) => any;
  // 样式
  className?: string;
  style?: CSSProperties;
  // drag
  onTableDataSourceOrderChange?: (tableData: any[]) => void;
  // toolbar
  extraToolBar?: ReactNode[];
  onCustomToolbarExportClick?: () => void;
  needExport?: boolean;
  // 是否需要总计行
  needSummary?: boolean;
  summaryDataIndex?: string;
  summaryExcludeKeys?: string[];
  summaryData?: any;
  // 导出
  exportName?: string;
  exportExcludeKeys?: string[];
  exportTableDataSourceProcessor?: (dataSource: any[]) => any[];
  // 是否能点击
  clickable?: boolean;
}

const UniTable = ({
  id,
  tableHeader,
  tableHeaderTitle,
  columns,
  dataSource,
  dataItemType,
  columnDefinitions,
  columnsFetch,
  columnItemProcessor,
  dataFetch,
  dataItemProcessor,
  onChange,
  className,
  style,
  scroll,
  height,
  needSummary,
  summaryDataIndex,
  summaryExcludeKeys,
  summaryData,
  exportName,
  exportExcludeKeys,
  pagination,
  clickable,
  ...restProps
}: UniTableProps<any>) => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableDataSource, setTableDataSource] = useState([]);
  // Loading
  const [tableLoading, setTableLoading] = useState(false);

  // filters & sorters
  const [searchFilter, setSearchFilter] = useState<
    Array<{ searchText: string; searchedColumn: string }>
  >([]);

  // controlled FilterValue && sortedInfo
  const [filteredInfo, setFilteredInfo] = useState<
    Record<string, FilterValue | null>
  >({});
  const [sortedInfo, setSortedInfo] = useState(undefined);

  // 初始化Event Listener
  // 部分依赖state的请监听state
  useEffect(() => {
    Emitter.on(
      EventConstant.TABLE_COLUMN_SEARCH_CONFIRM,
      onTableColumnSearchConfirm,
    );
    Emitter.on(
      EventConstant.TABLE_COLUMN_SEARCH_RESET,
      onTableColumnSearchReset,
    );

    return () => {
      Emitter.off(EventConstant.TABLE_COLUMN_SEARCH_CONFIRM);
      Emitter.off(EventConstant.TABLE_COLUMN_SEARCH_RESET);
    };
  }, [searchFilter]);

  useEffect(() => {
    let processors = [
      // ColumnDefinitionProcessor,
      commonColumnProcessor,
      FilterItemProcessor,
      SearchItemProcessor,
    ];
    processTableColumns(true, processors);
  }, [columns, columnsFetch]);

  useEffect(() => {
    processTableDataSource();
  }, [dataSource, dataFetch]);

  const onTableColumnSearchConfirm = (data) => {
    setSearchFilter(
      searchFilter.map((item) => {
        return item.searchedColumn === data.dataIndex
          ? {
              searchText: data.selectedKeys[0],
              searchedColumn: item.searchedColumn,
            }
          : item;
      }),
    );
  };

  const onTableColumnSearchReset = (data) => {
    setSearchFilter(
      searchFilter.map((item) => {
        return item.searchedColumn === data.dataIndex
          ? {
              searchText: '',
              searchedColumn: item.searchedColumn,
            }
          : item;
      }),
    );
  };

  // default column processor
  const commonColumnProcessor = ({ columnItem }) => {
    if (!columnItem.dataIndex) {
      return {
        ...columnItem,
      };
    }

    if (!columnItem.render) {
      columnItem.render = (node, record, index) => {
        return (
          <span>
            {valueNullOrUndefinedReturnDash(
              record[columnItem.dataIndex],
              columnItem['x-type'] || columnItem['format'],
              columnItem['x-scale'],
            )}
          </span>
        );
      };
    }

    return {
      ...columnItem,
    };
  };

  const commonDataSourceProcessor = (dataSourceItem) => {
    return {
      id: uuidv4(),
      ...dataSourceItem,
    };
  };

  const processTableColumns = async (
    fetchColumn: boolean = false,
    processors: Function[],
  ) => {
    let tableColumns = columns || [];
    if (fetchColumn && columnsFetch) {
      tableColumns = await columnsFetch();
    }

    setSearchFilter(processSearchFilter(tableColumns));

    // TODO 处理columns
    tableColumns = tableColumns.slice().map((item, index) => {
      processors.forEach((processor) => {
        item = Object.assign(
          {},
          processor({
            // definitionProcessor
            dataItemType: dataItemType,
            columnDefinitions: columnDefinitions,
            columnItem: item,
            ...item,
            backendPagination: false,
            // search props
            filteredInfo: filteredInfo,
            searchFilter: searchFilter,
            // sorter props
            sortedInfo: sortedInfo,
          }),
        );

        if (item.children && item.children?.length > 0) {
          item.children = item.children
            ?.map((childItem) => {
              return Object.assign(
                {},
                processor({
                  columnItem: childItem,
                  ...childItem,
                  backendPagination: false,
                  // search props
                  filteredInfo: filteredInfo,
                  searchFilter: searchFilter,
                  // sorter props
                  sortedInfo: sortedInfo,
                }),
              );
            })
            .slice();
        }
      });

      if (columnItemProcessor) {
        item = Object.assign({}, columnItemProcessor(item, index));
      }

      return item;
    });

    setTableColumns(tableColumns);
  };

  const processTableDataSource = async () => {
    let tableDataSource = dataSource || [];
    if (dataFetch) {
      tableDataSource = await dataFetch();
    }

    // TODO 处理 dataSource
    tableDataSource = tableDataSource.slice().map((item, index) => {
      if (dataItemProcessor) {
        item = Object.assign({}, dataItemProcessor(item, index));
      }
      return commonDataSourceProcessor(item);
    });

    if (needSummary && summaryDataIndex) {
      tableDataSource = processSummaryData(
        tableDataSource,
        summaryDataIndex,
        summaryData,
        summaryExcludeKeys,
      ).slice();
    }

    setTableDataSource(tableDataSource);
  };

  useEffect(() => {
    if (sortedInfo && tableColumns.length > 0) {
      setTableColumns(
        tableColumns.map((item) => {
          return FilterItemProcessor({
            columnItem: item,
            sortedInfo: sortedInfo,
            backendPagination: false,
          });
        }),
      );
    }
  }, [sortedInfo]);

  useEffect(() => {
    if (filteredInfo && tableColumns.length > 0) {
      setTableColumns(
        tableColumns.map((item) => {
          let columnItem = Object.assign(
            {},
            SearchItemProcessor({
              columnItem: item,
              ...item,
              backendPagination: false,
              // search props
              filteredInfo: filteredInfo,
              searchFilter: searchFilter,
            }),
          );

          if (columnItem.children && columnItem.children?.length > 0) {
            columnItem.children = columnItem.children
              ?.map((childItem) => {
                return SearchItemProcessor({
                  columnItem: childItem,
                  ...childItem,
                  backendPagination: false,
                  // search props
                  filteredInfo: filteredInfo,
                  searchFilter: searchFilter,
                });
              })
              .slice();
          }

          return columnItem;
        }),
      );
    }
  }, [filteredInfo]);

  const onToolbarExportClick = () => {
    const canExportColumns = tableColumns?.filter(
      (columnItem) =>
        columnItem.className?.indexOf('exportable') !== -1 &&
        columnItem.valueType !== 'option',
    );
    if (!isEmpty(canExportColumns)) {
      exportExcel(
        canExportColumns.slice() as any[],
        restProps.exportTableDataSourceProcessor
          ? restProps.exportTableDataSourceProcessor(
              cloneDeep(tableDataSource.slice()),
            )
          : cloneDeep(tableDataSource.slice()),
        exportName,
        exportExcludeKeys,
      );
    }
  };

  const defaultToolbar = () => (
    <>
      {restProps?.needExport || true ? (
        <Button
          key="export"
          icon={<FileExcelOutlined />}
          onClick={() => {
            restProps?.onCustomToolbarExportClick
              ? restProps.onCustomToolbarExportClick()
              : onToolbarExportClick();
          }}
        >
          导出Excel
        </Button>
      ) : (
        <></>
      )}
    </>
  );

  const renderToolbar: React.ReactNode[] = [
    defaultToolbar(),
    ...(restProps?.extraToolBar || []),
  ];

  return (
    <Skeleton active loading={tableLoading}>
      {/*table toolbar*/}
      {(restProps?.needExport || restProps.extraToolBar?.length > 0) && (
        <div className={'toolbar-container'}>
          <div className={'tools-left'} />
          <Space
            className={`tools-right`}
            direction={'horizontal'}
            size={16}
            align={'center'}
          >
            {renderToolbar.map((item) => {
              return item;
            })}
          </Space>
        </div>
      )}

      {/*table header*/}
      {(tableHeader || tableHeaderTitle) && (
        <div className={'header-container'}>
          {tableHeader ? (
            tableHeader
          ) : (
            <span className={'label'}>{tableHeaderTitle}</span>
          )}
        </div>
      )}
      <ProTable
        id={id}
        loading={tableLoading}
        className={`uni-table ${className}`}
        style={style || {}}
        columns={tableColumns}
        dataSource={tableDataSource}
        onChange={(pagination, filters, sorter, extra) => {
          setFilteredInfo(filters);
          setSortedInfo(sorter);
          onChange && onChange(pagination, filters, sorter, extra);
        }}
        scroll={scroll}
        pagination={
          pagination !== false
            ? { ...defaultPagination, ...(pagination || {}) }
            : false
        }
        toolBarRender={false}
        {...restProps}
        search={false}
        options={{ ...defaultOptions, ...(restProps?.options || {}) }}
        // TODO components 可能要定制拖拽
        onRow={(record, index) => {
          return {
            ...(restProps?.onRow || {}),
            onClick: (event) => {
              if (clickable) {
                Emitter.emit(EventConstant.TABLE_ROW_CLICK, { record, index });
              }
            },
          };
        }}
      />
    </Skeleton>
  );
};

export default UniTable;
