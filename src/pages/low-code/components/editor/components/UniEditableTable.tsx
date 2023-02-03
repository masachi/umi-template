import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import './index.less';
import {
  SortableContainer,
  SortableContainerProps,
  SortableElement,
  SortableHandle,
  SortEnd,
} from 'react-sortable-hoc';
import {
  MenuOutlined,
  PlusCircleTwoTone,
  PlusOutlined,
} from '@ant-design/icons';
import { arrayMoveImmutable } from '@ant-design/pro-utils';
import { v4 as uuidv4 } from 'uuid';
import { dynamicComponentsMap } from '@/components';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface DataType {
  key: React.Key;

  [key: string]: any;
}

type EditableTableProps = {
  columns: any[];
  value: DataType[];
  onChange: (v: DataType[]) => void;
};

interface EditableTableState {
  dataSource: DataType[];
  count: number;
}

type ColumnTypes = EditableTableProps['columns'];

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof DataType;
  record: DataType;
  handleSave: (record: DataType) => void;

  component?: any;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  component,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef?.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  const CellComponent = component
    ? (dynamicComponentsMap[component] as React.FC)
    : undefined;

  let cellComponentProps = {
    style: { width: '100%' },
    ref: inputRef,
  } as any;

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex}>
        {CellComponent ? (
          <CellComponent
            {...cellComponentProps}
            onChange={(value) => {
              save();
            }}
          />
        ) : (
          <Input {...cellComponentProps} onPressEnter={save} onBlur={save} />
        )}
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
));

const SortableItem = SortableElement((props: any) => (
  <EditableRow index={props['data-row-key']} {...props} />
));
const SortableBody = SortableContainer(
  (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props} />
  ),
);

const draggableHandler = {
  title: '排序',
  dataIndex: 'sort',
  width: 70,
  fixed: 'left',
  className: 'drag-visible',
  render: () => <DragHandle />,
};

class UniEditableTable extends React.Component<
  EditableTableProps,
  EditableTableState
> {
  constructor(props: EditableTableProps) {
    super(props);

    this.state = {
      dataSource: props.value,
      count: props?.value?.length || 0,
    };
  }

  handleDelete = (key: React.Key) => {
    const dataSource = [...this.state.dataSource].filter(
      (item) => item.key !== key,
    );
    this.setState({ dataSource });
    this.props.onChange(dataSource);
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData: DataType = {
      key: count,
    };
    const value = [...dataSource, newData];
    this.setState({
      dataSource: value,
      count: count + 1,
    });

    this.props.onChange(value);
  };

  handleSave = (row: DataType) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
    this.props.onChange(newData);
  };

  onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        this.state.dataSource.slice(),
        oldIndex,
        newIndex,
      ).filter((el: DataType) => !!el);

      this.setState({
        dataSource: newData,
      });

      this.props.onChange(newData);
    }
  };

  DraggableContainer = (props: SortableContainerProps) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      helperContainer={document.getElementById('right-editor-container')}
      onSortEnd={this.onSortEnd}
      {...props}
    />
  );

  DraggableBodyRow: React.FC<any> = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = this.state.dataSource.findIndex(
      (x) => x.key === restProps['data-row-key'],
    );
    return <SortableItem index={index} {...restProps} />;
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: this.DraggableBodyRow,
        wrapper: this.DraggableContainer,
        cell: EditableCell,
      },
    };
    const columns = this.props.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: DataType) => ({
          record,
          component: col.component,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    columns.push({
      title: '操作',
      dataIndex: 'operation',
      fixed: 'right',
      width: 80,
      render: (_: any, record: { key: React.Key }) =>
        this.state.dataSource.length >= 1 ? (
          <div className={'operators-container'}>
            <PlusCircleTwoTone className={'icon'} />

            <Popconfirm
              title="确定删除？"
              onConfirm={() => this.handleDelete(record.key)}
              getPopupContainer={(triggerNode) =>
                document.getElementById('right-editor-container')
              }
            >
              <a>
                <svg
                  className="icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </a>
            </Popconfirm>
          </div>
        ) : null,
    });
    return (
      <div>
        <Table
          pagination={false}
          size="small"
          bordered={true}
          components={components}
          rowClassName={() => 'editable-row'}
          dataSource={dataSource}
          scroll={{ x: 'max-content' }}
          columns={[draggableHandler, ...columns]}
        />
        <Button
          type="primary"
          style={{ marginTop: 10 }}
          block
          onClick={this.handleAdd}
        >
          新增
        </Button>
      </div>
    );
  }
}

export default UniEditableTable;
