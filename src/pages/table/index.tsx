import { Card, Table } from 'antd';
import React, { useState } from 'react';
import UniTable from '@/components/table';
import {
  HOSPITAL_LEVEL_DATA_ANALYSIS_COLUMNS,
  LEVEL_THREE_HOSPITAL_DATA_ANALYSIS_COLUMNS,
} from '@/pages/table/constants';
import { v4 as uuidv4 } from 'uuid';
import './index.less';

const expandData = [
  {
    id: uuidv4(),
    Level: '1',
    All: 0,
    childs: [
      {
        id: uuidv4(),
        Level: '1-expand',
        All: 0,
        left: 20,
        childs: [
          {
            Level: '1-expand-expand',
            All: 0,
            left: 40,
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    Level: '1-2',
    All: 0,
    left: 20,
  },
  {
    id: uuidv4(),
    Level: '1-3',
    All: 0,
    left: 40,
  },
  {
    id: uuidv4(),
    Level: '2-1',
    All: 0,
  },
  {
    id: uuidv4(),
    Level: '2-2',
    All: 0,
    left: 20,
  },
];

const TableContainer = (props: any) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const expandTableRender = (record) => {
    return (
      <UniTable
        id={'test-table4'}
        bordered={true}
        rowKey={'id'}
        showHeader={false}
        columns={HOSPITAL_LEVEL_DATA_ANALYSIS_COLUMNS}
        expandable={{
          expandedRowRender: (record) => expandTableRender(record),
          rowExpandable: (record) =>
            record?.childs && record?.childs?.length > 0,
          expandedRowClassName: (record, index, indent) => {
            return 'expanded-record';
          },
          onExpandedRowsChange: (expandedRows) => {
            setExpandedRowKeys(
              expandedRows.map((row) => {
                return row.toString();
              }),
            );
          },
          expandedRowKeys: expandedRowKeys,
        }}
        pagination={false}
        dataSource={record?.childs || []}
      />
    );
  };

  const processExpandableExportDataSource = (dataSource: any[]) => {
    let result = [];
    dataSource.forEach((dataItem) => {
      if (dataItem.childs) {
        if (!expandedRowKeys.includes(dataItem.id)) {
          delete dataItem['childs'];
        } else {
          processExpandableExportDataSource(dataItem.childs);
        }
      }

      result.push(dataItem);
    });

    return result;
  };

  return (
    <div className={'mock-table-container'}>
      <Card style={{ marginTop: 20 }} title={'测试用table'}>
        <UniTable
          id={'test-table'}
          bordered={true}
          tableHeaderTitle={'table-1 analysis'}
          rowKey={'id'}
          needExport={true}
          columns={LEVEL_THREE_HOSPITAL_DATA_ANALYSIS_COLUMNS}
          // TODO 暂定 总计字段 由后端算 key: summaryData
          needSummary={true}
          summaryDataIndex={'Hospital'}
          dataItemProcessor={(item, index) => {
            return {
              ...item,
              Index: index + 1,
              Hospital: `Label 1-${index + 1}`,
            };
          }}
          summaryExcludeKeys={['Index']}
          exportName={'测试用table'}
          exportExcludeKeys={['Index']}
          dataSource={[
            {
              OutHospitalCount: 0,
              OperationCount: 0,
              OperationRatio: 0,
              DRGCount: 0,
              CMI: 0,
              LevelFourOperationCount: 0,
              LevelFourOperationRatio: 0,
              MinimallyInvasiveOperationCount: 0,
              MinimallyInvasiveOperationRatio: 0,
              DifficultiesCount: 0,
              DifficultiesRatio: 0,
              RwGte2Count: 0,
              RwGte2Ratio: 0,
              AvgInPeriod: 0,
              DeathRate: 0,
              DeathRateAfterOperation: 0,
              MediumLowDeathRate: 0,
              ReturnRate: 0,
              FeeAvg: 0,
              MedicineRatio: 0,
              MaterialRatio: 0,
            },
            {
              OutHospitalCount: 0,
              OperationCount: 0,
              OperationRatio: 0,
              DRGCount: 0,
              CMI: 0,
              LevelFourOperationCount: 0,
              LevelFourOperationRatio: 0,
              MinimallyInvasiveOperationCount: 0,
              MinimallyInvasiveOperationRatio: 0,
              DifficultiesCount: 0,
              DifficultiesRatio: 0,
              RwGte2Count: 0,
              RwGte2Ratio: 0,
              AvgInPeriod: 0,
              DeathRate: 0,
              DeathRateAfterOperation: 0,
              MediumLowDeathRate: 0,
              ReturnRate: 0,
              FeeAvg: 0,
              MedicineRatio: 0,
              MaterialRatio: 0,
            },
            {
              OutHospitalCount: 0,
              OperationCount: 0,
              OperationRatio: 0,
              DRGCount: 0,
              CMI: 0,
              LevelFourOperationCount: 0,
              LevelFourOperationRatio: 0,
              MinimallyInvasiveOperationCount: 0,
              MinimallyInvasiveOperationRatio: 0,
              DifficultiesCount: 0,
              DifficultiesRatio: 0,
              RwGte2Count: 0,
              RwGte2Ratio: 0,
              AvgInPeriod: 0,
              DeathRate: 0,
              DeathRateAfterOperation: 0,
              MediumLowDeathRate: 0,
              ReturnRate: 0,
              FeeAvg: 0,
              MedicineRatio: 0,
              MaterialRatio: 0,
            },
            {
              OutHospitalCount: 0,
              OperationCount: 0,
              OperationRatio: 0,
              DRGCount: 0,
              CMI: 0,
              LevelFourOperationCount: 0,
              LevelFourOperationRatio: 0,
              MinimallyInvasiveOperationCount: 0,
              MinimallyInvasiveOperationRatio: 0,
              DifficultiesCount: 0,
              DifficultiesRatio: 0,
              RwGte2Count: 0,
              RwGte2Ratio: 0,
              AvgInPeriod: 0,
              DeathRate: 0,
              DeathRateAfterOperation: 0,
              MediumLowDeathRate: 0,
              ReturnRate: 0,
              FeeAvg: 0,
              MedicineRatio: 0,
              MaterialRatio: 0,
            },
          ]}
          columnItemProcessor={(columnItem) => {
            let column = {
              ...columnItem,
              width: 100,
            };

            if (column.children) {
              column.children = column?.children?.map((childItem) => {
                return {
                  ...childItem,
                  width: 100,
                };
              });
            }

            return column;
          }}
        />
      </Card>

      <Card style={{ marginTop: 20 }} title={'测试用table2'}>
        <UniTable
          id={'test-table2'}
          bordered={true}
          tableHeaderTitle={'测试用table2'}
          rowKey={'id'}
          needExport={true}
          columns={HOSPITAL_LEVEL_DATA_ANALYSIS_COLUMNS}
          dataItemProcessor={(item, index) => {
            return {
              ...item,
              Hospital: `Label 2-${index + 1}`,
            };
          }}
          needSummary={true}
          summaryDataIndex={'Level'}
          summaryExcludeKeys={['Hospital']}
          exportName={'测试用table2'}
          dataSource={[
            {
              Level: '1',
              All: 0,
            },
            {
              Level: '1-2',
              All: 0,
              left: 20,
            },
            {
              Level: '1-3',
              All: 0,
              left: 40,
            },
            {
              Level: '2-1',
              All: 0,
            },
            {
              Level: '2-2',
              All: 0,
              left: 20,
            },
          ]}
        />
      </Card>

      <Card style={{ marginTop: 20 }} title={'测试用展开table'}>
        <UniTable
          id={'test-table3'}
          bordered={true}
          tableHeaderTitle={'展开测试用table'}
          rowKey={'id'}
          scroll={{ x: 'max-content' }}
          needExport={true}
          columns={HOSPITAL_LEVEL_DATA_ANALYSIS_COLUMNS}
          needSummary={true}
          summaryDataIndex={'Level'}
          exportName={'展开测试用table'}
          exportTableDataSourceProcessor={(dataSource) => {
            return processExpandableExportDataSource(dataSource);
          }}
          expandable={{
            expandedRowClassName: (record, index, indent) => {
              return 'expanded-record';
            },
            expandedRowRender: (record) => expandTableRender(record),
            rowExpandable: (record) =>
              record?.childs && record?.childs?.length > 0,
            onExpandedRowsChange: (expandedRows) => {
              setExpandedRowKeys(
                expandedRows.map((row) => {
                  return row.toString();
                }),
              );
            },
            expandedRowKeys: expandedRowKeys,
            // expandIconColumnIndex: -1
          }}
          dataSource={expandData}
        />
      </Card>
    </div>
  );
};

export default TableContainer;
