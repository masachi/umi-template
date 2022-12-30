import { Input } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';

export const FIELD_ADD_TABLE_COLUMN = [
  {
    dataIndex: 'Operate',
    title: '',
    visible: true,
    width: 50,
    center: true,
    render: (node, record, index) => {
      return <MinusCircleOutlined />;
    },
  },
  {
    dataIndex: 'Prefix',
    title: '字段名称',
    visible: true,
    center: true,
    render: (node, record, index) => {
      return <Input placeholder={'请输入字段名称'} />;
    },
  },
  {
    dataIndex: 'Component',
    title: '字段显示',
    visible: true,
    center: true,
  },
  {
    dataIndex: 'Suffix',
    title: '额外',
    visible: true,
    center: true,
    render: (node, record, index) => {
      return <Input placeholder={'请输入额外字段'} />;
    },
  },
];

export const DRG_TABLE_COLUMN = [
  {
    dataIndex: 'drgCode',
    title: '病种代码',
    visible: true,
  },
  {
    dataIndex: 'drgName',
    title: '病种名称',
    visible: true,
  },
];

export const SURGERY_TABLE_COLUMN = [
  {
    dataIndex: 'surgeryCode',
    title: '手术代码',
    visible: true,
  },
  {
    dataIndex: 'surgeryName',
    title: '手术名称',
    visible: true,
  },
];
