import dayjs from 'dayjs';

export const processSearchData = (value: any, componentName: string) => {
  switch (componentName) {
    case 'Select':
      return value;
    case 'DatePicker':
      return value ? dayjs(value).format('YYYY-MM-DD') : undefined;
    case 'RangePicker':
      return value.map((date) => {
        return date ? dayjs(date).format('YYYY-MM-DD') : undefined;
      });
    default:
      return value;
  }
};
