import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import React from 'react';
import { arrayMoveImmutable, useRefFunction } from '@ant-design/pro-utils';

const SortableItem = SortableElement((props: any) => {
  return <tr {...props} />;
});
const SortContainer = SortableContainer((props: any) => {
  return <tbody {...props} />;
});

interface onSortEndProps<DataType> {
  tableDataSource: DataType[];
  onTableDataSourceOrderChange: Function;
  setTableDataSource: (tableDataSource: DataType[]) => void;
}

const onSortEnd = ({
  tableDataSource,
  onTableDataSourceOrderChange,
  setTableDataSource,
}: onSortEndProps<any>) =>
  useRefFunction(
    ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      if (newIndex !== tableDataSource.length - 1) {
        if (oldIndex !== newIndex) {
          const newData = arrayMoveImmutable(
            [...tableDataSource],
            oldIndex,
            newIndex,
          ).filter((el) => !!el);
          onTableDataSourceOrderChange &&
            onTableDataSourceOrderChange([...newData]);
          setTableDataSource([...newData]);
        }
      }
    },
  );

interface DraggableContainerProps<DataType> extends onSortEndProps<DataType> {
  tableId: string;
}

const DraggableContainer = (props: DraggableContainerProps<any>) =>
  useRefFunction((p: any) => (
    <SortContainer
      useDragHandle
      disableAutoscroll
      lockAxis={'y'}
      helperClass="row-dragging"
      helperContainer={document.getElementById(props.tableId)}
      onSortEnd={() => onSortEnd(props)}
      {...p}
    />
  ));

interface DraggableBodyRowProps<DataType> {
  tableDataSource: DataType[];
  rowKey: string;
}

const DraggableBodyRow = ({
  tableDataSource,
  rowKey,
  ...restProps
}: DraggableBodyRowProps<any>) => {
  // function findIndex base on Table rowKey props and should always be a right array index
  const index = tableDataSource?.findIndex(
    (x) => x[rowKey] === restProps['data-row-key'],
  );
  return <SortableItem index={index} {...restProps} />;
};

export { DraggableContainer, DraggableBodyRow };
