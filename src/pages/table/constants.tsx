import { Table } from 'antd';

export const LEVEL_THREE_HOSPITAL_DATA_ANALYSIS_COLUMNS = [
  {
    dataIndex: '',
    title: '',
    visible: true,
    children: [
      {
        dataIndex: 'Index',
        title: '序号',
        visible: true,
      },
    ],
  },
  {
    dataIndex: 'Hospital',
    title: '1',
    visible: true,
  },
  {
    dataIndex: 'Works',
    title: '2',
    visible: true,
    children: [
      {
        dataIndex: 'OutHospitalCount',
        title: '2-1',
        visible: true,
        filterType: 'search',
      },
      {
        dataIndex: 'OperationCount',
        title: '2-2',
        visible: true,
        width: 100,
      },
      {
        dataIndex: 'OperationRatio',
        title: '2-3',
        visible: true,
      },
    ],
  },
  {
    dataIndex: 'Service',
    title: '3',
    visible: true,
    children: [
      {
        dataIndex: 'DRGCount',
        title: '3-1',
        visible: true,
        sorterType: true,
      },
      {
        dataIndex: 'CMI',
        title: '3-2',
        visible: true,
      },
      {
        dataIndex: 'LevelFourOperationCount',
        title: '3-3',
        visible: true,
        sorterType: true,
      },
      {
        dataIndex: 'LevelFourOperationRatio',
        title: '3-4',
        visible: true,
      },
      {
        dataIndex: 'MinimallyInvasiveOperationCount',
        title: '3-5',
        visible: true,
        sorterType: true,
      },
      {
        dataIndex: 'MinimallyInvasiveOperationRatio',
        title: '3-6',
        visible: true,
      },
      {
        dataIndex: 'DifficultiesCount',
        title: '3-7',
        visible: true,
        sorterType: true,
      },
      {
        dataIndex: 'DifficultiesRatio',
        title: '3-8',
        visible: true,
      },
      {
        dataIndex: 'RwGte2Count',
        title: '3-9',
        visible: true,
        sorterType: true,
      },
      {
        dataIndex: 'RwGte2Ratio',
        title: '3-10',
        visible: true,
      },
    ],
  },
  {
    dataIndex: 'Efficiency',
    title: '4',
    visible: true,
    children: [
      {
        dataIndex: 'AvgInPeriod',
        title: '4-1',
        visible: true,
        sorterType: true,
      },
    ],
  },
  {
    dataIndex: 'QualityControl',
    title: '5',
    visible: true,
    children: [
      {
        dataIndex: 'DeathRate',
        title: '5-1',
        visible: true,
        sorterType: true,
      },
      {
        dataIndex: 'DeathRateAfterOperation',
        title: '5-2',
        visible: true,
        sorterType: true,
      },
      {
        dataIndex: 'MediumLowDeathRate',
        title: '5-3',
        visible: true,
        sorterType: true,
      },
      {
        dataIndex: 'ReturnRate',
        title: '5-4',
        visible: true,
        sorterType: true,
      },
    ],
  },
  {
    dataIndex: 'FeeControl',
    title: '6',
    visible: true,
    children: [
      {
        dataIndex: 'FeeAvg',
        title: '6-1',
        visible: true,
        sorterType: true,
      },
      {
        dataIndex: 'MedicineRatio',
        title: '6-2',
        visible: true,
        sorterType: true,
      },
      {
        dataIndex: 'MaterialRatio',
        title: '6-3',
        visible: true,
        sorterType: true,
      },
    ],
  },
];

export const HOSPITAL_LEVEL_DATA_ANALYSIS_COLUMNS = [
  {
    dataIndex: 'Level',
    title: '1',
    visible: true,
    // 这里有个配置项 indent 缩进 ： true
    indent: true,
    width: 300,
    render: (node, record, index) => {
      return (
        <span
          style={{
            marginLeft: record?.left || 0,
          }}
        >
          {record.Level}
        </span>
      );
    },
  },
  {
    dataIndex: 'Hospital',
    title: '2',
    visible: true,
    width: 200,
  },
  {
    dataIndex: 'Hospitals',
    title: '',
    visible: true,
    children: [
      {
        dataIndex: 'All',
        title: '3-1',
        visible: true,
        width: 100,
      },
      {
        dataIndex: 'Chinese',
        title: '3-2',
        visible: true,
        width: 100,
      },
      {
        dataIndex: 'ChineseWestern',
        title: '3-3',
        visible: true,
        width: 100,
      },
      {
        dataIndex: 'Ethnic',
        title: '3-4',
        visible: true,
        width: 100,
      },
      {
        dataIndex: 'Special',
        title: '3-5',
        visible: true,
        width: 100,
      },
    ],
  },
  {
    dataIndex: 'MaternalChildHealth',
    title: '3-6',
    visible: true,
    width: 100,
  },
  {
    dataIndex: 'SpecialDisease',
    title: '3-7',
    visible: true,
    width: 100,
  },
];
