import isString from 'lodash/isString';

interface FilterItemProcessorProps {
  columnItem: any;
  sortedInfo: any;
  backendPagination: boolean | object;
}

const FilterItemProcessor = (props: FilterItemProcessorProps) => {
  let sorter = {};
  if (
    props.columnItem.sorterType ||
    (!props.columnItem?.sorterType && props.columnItem?.orderable)
  ) {
    sorter = props.backendPagination
      ? {
          sorter: true,
        }
      : {
          sorter: (a, b) => {
            return isString(a[props.columnItem.dataIndex])
              ? a[props.columnItem.dataIndex].localeCompare(
                  b[props.columnItem.dataIndex],
                )
              : a[props.columnItem.dataIndex] - b[props.columnItem.dataIndex];
          },
          // 新增 sortedOrder
          sortOrder:
            props.sortedInfo?.columnKey === props.columnItem?.dataIndex
              ? props.sortedInfo.order
              : null,
        };
  }

  return {
    ...props.columnItem,
    ...sorter,
  };
};

export default FilterItemProcessor;
