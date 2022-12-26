import { Button, Card, Input, Modal, Space, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.less';
import _ from 'lodash';

import GridLayout from 'react-grid-layout';
import { mockData } from '@/pages/draggable-table/mock';
import UniTable from '@/components/table';
import { HOSPITAL_LEVEL_DATA_ANALYSIS_COLUMNS } from '@/pages/table/constants';
import { FIELD_ADD_TABLE_COLUMN } from '@/pages/draggable-table/constants';
import { PlusCircleOutlined } from '@ant-design/icons';

const ROW_HEIGHT = 40;

const DraggableTableContainer = (props: any) => {
  const [layout, setLayout] = useState([]);
  const [separators, setSeparators] = useState([
    {
      x: 0,
      y: 1,
      h: 0.1,
      w: 24,
      i: 'separator',
      static: true,
    },
  ]);

  const [originLayout, setOriginLayout] = useState([]);
  const [originSeparators, setOriginSeparators] = useState([]);

  const [loading, setLoading] = useState(true);

  const [tableWidth, setTableWidth] = useState(0);

  const [addFieldsTableData, setAddFieldsTableData] = useState([]);

  const COL_NUM = 24;

  useEffect(() => {
    let savedLayouts = localStorage.getItem('layout')
      ? JSON.parse(localStorage.getItem('layout'))
      : [];
    let layouts = generateLayout(savedLayouts);
    setLayout(layouts);
    setOriginLayout(Object.assign([], layouts));

    // separators
    setOriginSeparators(Object.assign([], separators));
    localStorage.setItem('layout', JSON.stringify(layouts));
    setLoading(false);

    window.addEventListener('resize', () => {
      setTableWidth(
        document.getElementById('draggable-table-container')?.offsetWidth - 20,
      );
    });

    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  useEffect(() => {
    setTableWidth(
      document.getElementById('draggable-table-container')?.offsetWidth - 20,
    );
  }, [loading]);

  const defaultProps = {
    className: 'layout',
    items: 30,
    onLayoutChange: function () {},
    cols: 12,
  };

  const generateDOM = () => {
    return (
      <>
        {layout.map((item) => {
          return (
            <div key={item.i}>
              <span className="text">{item.i}</span>
            </div>
          );
        })}
      </>
    );
  };

  const generateLayout = (savedLayouts: any[]) => {
    let layouts = [];

    mockData.forEach((items, moduleIndex) => {
      items.forEach((item, index) => {
        let previousLayout =
          savedLayouts.find(
            (savedLayout) => savedLayout.i === item?.data?.key,
          ) || {};

        layouts.push({
          y: moduleIndex,
          h: 1,
          i: item.data.key,
          minW: 2,
          maxW: 10,
          maxH: 1,
          minH: 1,
          ...item,
          ...previousLayout,
          resizeHandles: ['ne'],
          static: false,
          isResizable: true,
        });
      });
    });

    return layouts;
  };

  const onLayoutChange = (layout, layouts) => {
    console.error(layouts);
    // localStorage.setItem('layout', JSON.stringify(layout));
  };

  const onGroupAdd = () => {
    let currentSeparators = separators.slice();
    let yAxisBottomNode = layout.sort((a, b) => b.y - a.y)?.at(0);

    if (yAxisBottomNode) {
      currentSeparators.push({
        x: 0,
        y: yAxisBottomNode?.y,
        h: 0.1,
        w: 24,
        i: 'separator',
        static: true,
      });

      setSeparators(currentSeparators);
    }
  };

  const onFieldAddClick = () => {
    addFieldsTableData.push({
      Operate: 'DELETE',
      Prefix: 'Test',
      Component: 'Test',
      Suffix: 'Test',
    });

    setAddFieldsTableData(addFieldsTableData);
  };

  const renderFieldAddModalContent = () => {
    return (
      <div className={'add-field-header-container'}>
        <span>新增字段</span>
        <Button onClick={onFieldAddClick}>
          <PlusCircleOutlined />
          添加
        </Button>
      </div>
    );
  };

  const renderAddTable = () => {
    return (
      <UniTable
        id={'field-add-table'}
        className={'add-field-modal-container'}
        rowKey={uuidv4()}
        showHeader={false}
        bordered={true}
        columns={FIELD_ADD_TABLE_COLUMN}
        pagination={false}
        dataSource={addFieldsTableData}
      />
    );
  };

  const onFieldAdd = () => {
    Modal.confirm({
      title: renderFieldAddModalContent(),
      getContainer: document.getElementById('draggable-table-container'),
      width: 600,
      content:
        // TODO 无限追加表格形式
        renderAddTable(),
    });
  };

  const onLayoutSave = () => {
    // TODO 接口
    localStorage.setItem('layout', JSON.stringify(layout));
    setOriginLayout(layout.slice());
    setOriginSeparators(separators.slice());
  };

  const onLayoutRestore = () => {
    setLayout(originLayout.slice());
    setSeparators(originSeparators.slice());
  };

  return (
    <>
      <Space>
        <Button onClick={onGroupAdd}>新增组</Button>
        <Button onClick={onFieldAdd}>新增字段</Button>
        <Button onClick={onLayoutSave}>保存</Button>
        <Button onClick={onLayoutRestore}>还原</Button>
      </Space>
      <div
        id={'draggable-table-container'}
        className={'draggable-table-container'}
      >
        {loading ? (
          <div className={'loading-container'} style={{ height: 400 }}>
            <Spin />
          </div>
        ) : (
          <>
            {separators.map((item) => {
              let currentRowLayouts = layout.find(
                (layoutItem) => item.y === layoutItem.y,
              );
              let currentRowItemTransform = document.getElementById(
                currentRowLayouts?.i,
              )?.style?.transform;

              let positions = currentRowItemTransform?.match(/\d+/g);

              return (
                <>
                  {currentRowLayouts &&
                  currentRowItemTransform &&
                  positions.length > 1 ? (
                    <div
                      className={'separator-container'}
                      style={{
                        transform: `translate(10px, ${parseInt(
                          positions?.at(1),
                        )}px)`,
                      }}
                    >
                      <div className={'separator'} />
                    </div>
                  ) : null}
                </>
              );
            })}
            <GridLayout
              className="layout"
              // layouts={layout}
              layout={layout}
              rowHeight={ROW_HEIGHT}
              verticalCompact={false}
              isBounded={true}
              margin={[20, 16]}
              // breakpoints={{ lg: 1366, md: 1280, sm: 1024, xs: 480, xxs: 0 }}
              // cols={{ lg: 24, md: 20, sm: 12, xs: 8, xxs: 4 }}
              cols={COL_NUM}
              width={tableWidth}
              onLayoutChange={(layout, layouts) =>
                onLayoutChange(layout, layouts)
              }
            >
              {/*TODO separator id 覆盖 样式*/}
              {layout.map((item) => {
                return (
                  <div id={item.i} key={item.i}>
                    {item.i === 'separator' ? (
                      <SeparatorItem key={uuidv4()} />
                    ) : (
                      <GridItem key={uuidv4()} data={item.data} />
                    )}
                  </div>
                );
              })}
            </GridLayout>
          </>
        )}
      </div>
    </>
  );
};

const SeparatorItem = React.forwardRef(
  (
    { style, className, onMouseDown, onMouseUp, onTouchEnd, ...props }: any,
    ref: any,
  ) => {
    return <div className={'separator'} />;
  },
);

interface GridItemProps {
  data: any;
}

const GridItem = React.forwardRef((props: GridItemProps) => {
  return (
    <div className={'grid-item-container'}>
      {props.data?.prefix && (
        <span className={'prefix'}>{props.data?.prefix}</span>
      )}
      <div
        className={`${props.data?.props?.className || ''} input`}
        style={props.data?.props?.style || {}}
      >
        <Input
          bordered={false}
          disabled={true}
          placeholder={`请输入${props.data?.desc}`}
        />
      </div>
      {props.data?.suffix && (
        <span className={'suffix'}>{props.data?.suffix}</span>
      )}
    </div>
  );
});

export default DraggableTableContainer;
