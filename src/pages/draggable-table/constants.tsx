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
