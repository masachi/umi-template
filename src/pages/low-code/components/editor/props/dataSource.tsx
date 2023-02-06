import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Collapse,
  Drawer,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Switch,
} from 'antd';
import {
  DeleteOutlined,
  DragOutlined,
  EditOutlined,
  EditTwoTone,
  PlusOutlined,
} from '@ant-design/icons';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
} from 'react-beautiful-dnd';

import './styles/index.less';
import { Emitter, EventConstant } from '@/utils/emitter';
import jsonp from 'fetch-jsonp';
import {
  CardHeader,
  componentPropsChange,
  UniPanel,
  UniPanelRow,
} from '@/pages/low-code/components/editor/props/common';

interface ColumnItemProps {
  componentKey: string;
  index: number;
  propsKey: string;
  propsItem?: any;

  valueProcessor?: (value: any) => any;
}

export const TablePropsEditor = ({ componentId, selectComponentData }) => {
  return (
    <Collapse collapsible={'disabled'}>
      <CardHeader componentId={componentId} card={selectComponentData?.card} />
      <DataSource
        componentId={componentId}
        props={selectComponentData?.props}
      />
      <Columns
        componentId={componentId}
        props={selectComponentData?.props}
        propsKey={'columns'}
      />
      <Appearance
        componentId={componentId}
        props={selectComponentData?.props}
      />
      <Pagination
        componentId={componentId}
        props={selectComponentData?.props}
      />
    </Collapse>
  );
};

export const DataSource = ({ componentId, props }) => {
  const onDataSourceUrlChange = async (value) => {
    componentPropsChange(componentId, 'dataSourceUrl', value);
    // change datasource
    let response = await jsonp(
      `https://suggest.taobao.com/sug?q=${value}&code=utf-8`,
    );
    let data = await response.json();

    let dataSource =
      data?.result?.map((item) => {
        return {
          name: item[0],
          value: item[0],
        };
      }) || [];
    componentPropsChange(componentId, 'dataSource', dataSource);
  };

  return (
    <UniPanel header="数据源">
      {/*<UniPanelRow label={'表格数据'}>*/}
      {/*  <Button><EditTwoTone/>编辑数据</Button>*/}
      {/*</UniPanelRow>*/}

      <UniPanelRow label={'表格数据URL'}>
        <Input
          className={'input'}
          value={props?.dataSourceUrl}
          onChange={(event) => {
            onDataSourceUrlChange(event.target.value);
          }}
          onPressEnter={(event) => {
            onDataSourceUrlChange(event);
          }}
          onBlur={(event) => {
            onDataSourceUrlChange(event.target.value);
          }}
        />
      </UniPanelRow>

      <UniPanelRow label={'行key'}>
        <Input />
      </UniPanelRow>
    </UniPanel>
  );
};

export const Columns = ({ componentId, props, propsKey }) => {
  const columnDataSource = props[propsKey] || [];

  const onColumnAddClick = () => {
    let columns = columnDataSource.slice();

    columns.push({
      title: '标题',
      dataIndex: '',
      align: 'left',
      sorter: false,
      hideInTable: false,
    });

    componentPropsChange(componentId, propsKey, columns);
  };

  const onColumnItemDelete = (index) => {
    let columns = columnDataSource.slice();

    columns.splice(index, 1);

    componentPropsChange(componentId, propsKey, columns);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      columnDataSource.slice(),
      result.source.index,
      result.destination.index,
    );

    componentPropsChange(componentId, propsKey, items);
  };

  const onColumnItemEditClick = (index) => {
    Modal.info({
      title: `项目${index}`,
      mask: false,
      maskClosable: true,
      closable: true,
      className: 'column-drawer-container',
      style: {
        height: document.getElementById('low-code-container').offsetHeight,
      },
      getContainer: document.getElementById('low-code-container'),
      content: <ColumnPropsEditDrawerContent index={index} />,
    });
  };

  const onColumnItemKeyEdit = (value, index, key) => {
    let columns = columnDataSource.slice();
    columns[index][key] = value;

    componentPropsChange(componentId, propsKey, columns);
  };

  const ColumnItemInput = ({
    componentKey,
    index,
    propsKey,
  }: ColumnItemProps) => {
    return (
      <Input
        id={componentKey}
        key={componentKey}
        className={'input'}
        defaultValue={columnDataSource[index][propsKey]}
        onChange={(event) => {
          onColumnItemKeyEdit(event.target.value, index, propsKey);
        }}
        onPressEnter={(event: any) => {
          onColumnItemKeyEdit(event.target.value, index, propsKey);
        }}
        onBlur={(event) => {
          onColumnItemKeyEdit(event.target.value, index, propsKey);
        }}
      />
    );
  };

  const ColumnItemInputNumber = ({
    componentKey,
    index,
    propsKey,
  }: ColumnItemProps) => {
    return (
      <InputNumber
        id={componentKey}
        key={componentKey}
        className={'input'}
        defaultValue={columnDataSource[index][propsKey]}
        min={0}
        onChange={(event) => {
          if (event > 0) {
            onColumnItemKeyEdit(event, index, propsKey);
          }
        }}
        onPressEnter={(event: any) => {
          if (event.target.value > 0) {
            onColumnItemKeyEdit(event.target.value, index, propsKey);
          }
        }}
        onBlur={(event) => {
          if (parseInt(event.target.value) > 0) {
            onColumnItemKeyEdit(event.target.value, index, propsKey);
          }
        }}
      />
    );
  };

  const ColumnItemRadio = ({ index, propsKey, propsItem }: ColumnItemProps) => {
    return (
      <Radio.Group
        className={'input'}
        options={propsItem.options || []}
        onChange={(event) => {
          onColumnItemKeyEdit(event.target.value, index, propsKey);
        }}
        defaultValue={columnDataSource[index][propsKey]}
        optionType="button"
      />
    );
  };

  const ColumnItemSwitch = ({
    index,
    propsKey,
    valueProcessor,
  }: ColumnItemProps) => {
    return (
      <Switch
        defaultChecked={columnDataSource[index][propsKey]}
        onChange={(checked) => {
          let value = checked;
          if (valueProcessor) {
            value = valueProcessor(value);
          }
          onColumnItemKeyEdit(value, index, propsKey);
        }}
      />
    );
  };

  const ColumnPropsEditDrawerContent = ({ index }) => {
    const columnProps = [
      {
        label: '列标题',
        component: ColumnItemInput,
        key: 'title',
      },
      {
        label: '数据字段',
        component: ColumnItemInput,
        key: 'dataIndex',
      },
      {
        label: '对齐方式',
        component: ColumnItemRadio,
        key: 'align',
        options: [
          { label: '左对齐', value: 'left' },
          { label: '右对齐', value: 'right' },
          { label: '居中', value: 'center' },
        ],
      },
      {
        label: '宽度',
        component: ColumnItemInputNumber,
        key: 'width',
      },
      {
        label: '排序',
        component: ColumnItemSwitch,
        key: 'sorter',
        valueProcessor: (value) => {
          if (value) {
            return true;
          } else {
            return undefined;
          }
        },
      },
      {
        label: '是否隐藏',
        component: ColumnItemSwitch,
        key: 'hideInTable',
      },
    ];

    return (
      <>
        {columnProps.map((item) => {
          return (
            <UniPanelRow label={item.label}>
              <item.component
                componentKey={`column-edit-${item.key}-${index}`}
                index={index}
                propsKey={item.key}
                propsItem={item}
              />
            </UniPanelRow>
          );
        })}
      </>
    );
  };

  return (
    <UniPanel header="表格列">
      {columnDataSource.length > 0 ? (
        <>
          <label className={'column-body-label'}>数据字段</label>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {columnDataSource.map((item, index) => (
                    <Draggable
                      key={`dataSource-item-${index}`}
                      draggableId={`dataSource-item-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: 'none',
                            // styles we need to apply on draggables
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div className={'column-item-container'}>
                            <Button
                              type={'text'}
                              onClick={(event) => {
                                onColumnItemEditClick(index);
                              }}
                            >
                              <EditOutlined className={'icon'} />
                            </Button>
                            <Input
                              className={'input'}
                              value={columnDataSource[index]['dataIndex']}
                              onChange={(event) => {
                                onColumnItemKeyEdit(
                                  event.target.value,
                                  index,
                                  'dataIndex',
                                );
                              }}
                              onPressEnter={(event) => {
                                onColumnItemKeyEdit(event, index, 'dataIndex');
                              }}
                              onBlur={(event) => {
                                onColumnItemKeyEdit(
                                  event.target.value,
                                  index,
                                  'dataIndex',
                                );
                              }}
                            />
                            <div className={'operation-container'}>
                              <Button
                                type={'text'}
                                onClick={() => {
                                  onColumnItemDelete(index);
                                }}
                              >
                                <DeleteOutlined className={'icon'} />
                              </Button>
                              <DragOutlined />
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </>
      ) : (
        <Alert
          message="暂时还没有添加内容"
          style={{ marginTop: 10 }}
          type="info"
          showIcon
        />
      )}
      <Button type={'link'} className={'column-add'} onClick={onColumnAddClick}>
        添加一项 +
      </Button>
    </UniPanel>
  );
};

export const Appearance = ({ componentId, props }) => {
  return (
    <UniPanel header="表格列">
      <UniPanelRow label={'显示表头'}>
        <Switch
          checked={props['showHeader']}
          onChange={(checked) => {
            componentPropsChange(componentId, 'showHeader', checked);
          }}
        />
      </UniPanelRow>

      <UniPanelRow label={'显示边框'}>
        <Switch
          checked={props['bordered']}
          onChange={(checked) => {
            componentPropsChange(componentId, 'bordered', checked);
          }}
        />
      </UniPanelRow>
    </UniPanel>
  );
};

export const Pagination = ({ componentId, props }) => {
  return (
    <UniPanel header="表格列">
      <UniPanelRow label={'显示分页'}>
        <Switch
          checked={!!props['pagination']}
          onChange={(checked) => {
            if (checked) {
              componentPropsChange(componentId, 'pagination', {
                size: 'default',
                pageSize: 10,
              });
            } else {
              componentPropsChange(componentId, 'pagination', false);
            }
          }}
        />
      </UniPanelRow>

      {!!props['pagination'] && (
        <UniPanelRow label={'页数切换'}>
          <Switch
            checked={props['pagination']?.showSizeChanger}
            onChange={(checked) => {
              let pagination = props?.pagination;
              pagination['showSizeChanger'] = checked;
              componentPropsChange(componentId, 'pagination', pagination);
            }}
          />
        </UniPanelRow>
      )}
    </UniPanel>
  );
};
