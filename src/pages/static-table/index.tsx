import { Card, Input, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.less';
import _ from 'lodash';

import GridLayout from 'react-grid-layout';
import { mockData } from '@/pages/draggable-table/mock';
import { dynamicComponentsMap } from '@/components';
import { IGridItemData } from '@/pages/draggable-table/interfaces';
import { Emitter, EventConstant } from '@/utils/emitter';
import UniTimeInput from '@/pages/draggable-table/components/time-input';

const ROW_HEIGHT = 40;

const componentMap = {
  ...dynamicComponentsMap,
  UniTimeInput: UniTimeInput,
};

const separators = [
  {
    x: 0,
    y: 1,
    h: 0.1,
    w: 24,
    i: 'separator',
    static: true,
  },
  {
    x: 0,
    y: 5,
    h: 0.1,
    w: 24,
    i: 'separator',
    static: true,
  },
];

const StaticTableContainer = (props: any) => {
  const [layout, setLayout] = useState([]);

  const [loading, setLoading] = useState(true);

  const [tableWidth, setTableWidth] = useState(0);

  const [tableValue, setTableValue] = useState({
    qdlsh: '12345678',
  });

  const COL_NUM = 24;

  useEffect(() => {
    let savedLayouts = localStorage.getItem('layout')
      ? JSON.parse(localStorage.getItem('layout'))
      : [];
    let layouts = generateLayout(savedLayouts);
    setLayout(layouts);
    localStorage.setItem('layout', JSON.stringify(layouts));
    setLoading(false);
  }, []);

  useEffect(() => {
    setTableWidth(
      document.getElementById('draggable-table-container')?.offsetWidth - 20,
    );
  }, [loading]);

  useEffect(() => {
    // event
    Emitter.on(EventConstant.STATIC_TABLE_VALUE_CHANGE, (data) => {
      console.error('onchange data', data);

      setTableValue({
        ...tableValue,
        ...data,
      });
    });
    return () => {
      Emitter.off(EventConstant.STATIC_TABLE_VALUE_CHANGE);
    };
  }, [tableValue]);

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

    let yAxis = 0;
    mockData.forEach((items, moduleIndex) => {
      let currentLineHeight = 0;
      items.forEach((item, index) => {
        currentLineHeight = item.h || 1;

        let previousLayout =
          savedLayouts.find(
            (savedLayout) => savedLayout.i === item?.data?.key,
          ) || {};

        layouts.push({
          y: yAxis,
          h: currentLineHeight,
          i: item.data.key,
          minW: 2,
          maxW: 10,
          maxH: currentLineHeight,
          minH: currentLineHeight,
          ...item,
          ...previousLayout,
          resizeHandles: [],
          static: true,
          isDraggable: false,
        });
      });

      yAxis += currentLineHeight;
    });

    return layouts;
  };

  const onLayoutChange = (layout, layouts) => {
    localStorage.setItem('layout', JSON.stringify(layout));
  };

  return (
    <div id={'draggable-table-container'} className={'static-table-container'}>
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
                    // <GridItem key={uuidv4()} data={item.data} value={tableValue[item?.data?.dataKey]}/>
                    <GridItem
                      key={uuidv4()}
                      data={item.data}
                      value={tableValue[item?.data?.key]}
                    />
                  )}
                </div>
              );
            })}
          </GridLayout>
        </>
      )}
    </div>
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
  data: IGridItemData;
  value?: any;
}

const GridItem = React.forwardRef((props: GridItemProps) => {
  const DynamicComponent = props.data?.component
    ? (componentMap[`Uni${props.data?.component}`] as React.FC)
    : undefined;

  return (
    <div className={'grid-item-container'}>
      {props.data?.prefix && (
        <span className={'prefix'}>{props.data?.prefix}</span>
      )}
      <div className={`input`} style={props.data?.props?.style || {}}>
        {
          // TODO 先行写死 默认input  后期 如果不给component name 认为无效框
          props.data?.component ? (
            <DynamicComponent
              className={`grid-item-base ${props?.data?.props?.className}`}
              {...props.data?.props}
              // dataSource={mockDatasource[headerItem?.props?.dataKey] || []}
              value={props?.value}
              onChange={(value) => {
                let payload = {};
                // payload[`${props?.data?.dataKey}`] = value;
                payload[`${props?.data?.key}`] = value;
                Emitter.emit(EventConstant.STATIC_TABLE_VALUE_CHANGE, payload);
              }}
            />
          ) : (
            <Input bordered={false} placeholder={`请输入${props.data?.desc}`} />
          )
        }
      </div>
      {props.data?.suffix && (
        <span className={'suffix'}>{props.data?.suffix}</span>
      )}
    </div>
  );
});

export default StaticTableContainer;
