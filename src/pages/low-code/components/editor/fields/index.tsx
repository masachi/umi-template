import { Input, InputNumber, Radio, Select, Table } from 'antd';
import UniRadio from '@/pages/low-code/components/editor/components/UniRadio';
import UniEditableTable from '@/pages/low-code/components/editor/components/UniEditableTable';

export const rightFields = {
  Text: {
    component: Input,
    valueProcessor: (event) => {
      return event.target.value;
    },
  },
  Number: {
    component: InputNumber,
    valueProcessor: (event) => {
      return event;
    },
  },
  // Table: Table,
  Radio: {
    component: UniRadio,
  },
  EditableTable: {
    component: UniEditableTable,
  },
  // Select: Select,
  // TextArea: Input.TextArea,
};
