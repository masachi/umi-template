import { ColumnDefinitions } from '@/columns-definition';

interface ColumnDefinitionProps {
  dataItemType?: string;
  columnDefinitions?: object;
  columnItem: any;
}

const ColumnDefinitionProcessor = (props: ColumnDefinitionProps) => {
  let columnDefinition = {};
  if (props.dataItemType) {
    let dataItemColumnDefinition = (props.columnDefinitions ||
      ColumnDefinitions)[`${props.dataItemType}`];
    if (dataItemColumnDefinition) {
      columnDefinition =
        dataItemColumnDefinition[props.columnItem['dataIndex']] || {};
    }
  }

  return {
    ...columnDefinition,
    ...props.columnItem,
  };
};

export default ColumnDefinitionProcessor;
