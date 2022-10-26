import dayjs from 'dayjs';
import { BaseLayoutHeaderItem } from '@/layouts/base-layout';

export const headers: {
  [key: string]: BaseLayoutHeaderItem[];
} = {
  default: [
    {
      label: '1',
      componentName: 'Select',
      props: {
        dataKey: 'simulate-select',
      },
    },
    {
      label: '2',
      componentName: 'Select',
      props: {
        dataKey: 'simulate-select',
        valueKey: 'simulate-multiple-select',
        mode: 'multiple',
      },
    },
    {
      label: '3',
      componentName: 'RangePicker',
      props: {
        className: '',
        dataKey: 'simulate-rangepicker',
        dataType: 'quarter',
        preProcess: (value) => {
          return value.map((item) => {
            return dayjs(item);
          });
        },
      },
    },
    {
      label: '4',
      componentName: 'DatePicker',
      props: {
        dataKey: 'simulate-datepicker',
        dataType: 'month',
        preProcess: (value) => {
          return dayjs(value);
        },
      },
    },
  ],
};
