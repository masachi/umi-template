import { request } from 'umi';
import jsonp from 'fetch-jsonp';
import { UniInputNumber } from '@/components/input';

interface IProps {
  key: string;
  name: string;
  type: string;
  propsKey?: string;

  valueProcessor?: (value: any) => any;
  propsValueProcessor?: (value: any) => any;
}

export const prefix = {
  key: 'label',
  name: '前缀提示',
  type: 'Text',
};

export const width = {
  key: 'width',
  name: '宽度',
  type: 'Number',
};

export const height = {
  key: 'height',
  name: '高度',
  type: 'Number',
};

export const selectValueKey = {
  key: 'optionValueKey',
  name: '下拉框value key',
  type: 'Text',
};

export const selectLabelKey = {
  key: 'optionNameKey',
  name: '下拉框显示字段',
  type: 'Text',
};

export const placeHolder = {
  key: 'placeholder',
  name: '占位显示',
  type: 'Text',
};

export const clear = {
  key: 'allowClear',
  name: '是否支持一键清除',
  type: 'Radio',
  options: [
    {
      value: true,
      label: '是',
    },
    {
      value: false,
      label: '否',
    },
  ],
};

export const dataSource = {};

export const dataSourceUrl: IProps = {
  key: 'dataSourceUrl',
  propsKey: 'dataSource',
  name: '数据源URL',
  type: 'Text',
  valueProcessor: (event) => {
    return event.target.value;
  },
  propsValueProcessor: async (event) => {
    let response = await jsonp(
      `https://suggest.taobao.com/sug?q=${event.target.value}&code=utf-8`,
    );
    let data = await response.json();

    return data?.result?.map((item) => {
      return {
        name: item[0],
        value: item[0],
      };
    });
  },
};

// table
export const columns = {
  key: 'columns',
  name: '表格列',
  type: 'EditableTable',
  columns: [
    {
      title: '标题',
      dataIndex: 'title',
      editable: true,
      width: 100,
    },
    {
      title: '数据字段',
      dataIndex: 'dataIndex',
      editable: true,
      width: 100,
    },
    {
      title: '宽度',
      dataIndex: 'width',
      editable: true,
      width: 50,
      component: 'UniInputNumber',
    },
  ],
};

export const tableDataSourceUrl: IProps = {
  key: 'dataSourceUrl',
  propsKey: 'dataSource',
  name: '数据源URL',
  type: 'Text',
  valueProcessor: (event) => {
    return event.target.value;
  },
  propsValueProcessor: async (value) => {
    let response = await request(value);
    return response.data || [];
  },
};
