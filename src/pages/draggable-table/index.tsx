import { Card, Input, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.less';
import _ from 'lodash';

import GridLayout from 'react-grid-layout';
import { mockData } from '@/pages/draggable-table/mock';

const ROW_HEIGHT = 40;

const separators = [
  {
    x: 0,
    y: 1,
    h: 0.1,
    w: 24,
    i: 'separator',
    static: true,
  },
];

const DraggableTableContainer = (props: any) => {
  const [layout, setLayout] = useState([]);

  const [tableWidth, setTableWidth] = useState(0);

  const COL_NUM = 24;

  useEffect(() => {
    let savedLayouts = localStorage.getItem('layout')
      ? JSON.parse(localStorage.getItem('layout'))
      : [];
    let layouts = generateLayout(savedLayouts);
    setLayout(layouts);
    localStorage.setItem('layout', JSON.stringify(layouts));

    console.error(
      'width',
      document.getElementById('draggable-table-container')?.offsetWidth - 20,
    );

    window.addEventListener('load', () => {
      console.error(
        'width',
        document.getElementById('draggable-table-container')?.offsetWidth - 20,
      );
      setTimeout(() => {
        setTableWidth(
          document.getElementById('draggable-table-container')?.offsetWidth -
            20,
        );
      }, 0);
    });

    window.addEventListener('resize', () => {
      setTableWidth(
        document.getElementById('draggable-table-container')?.offsetWidth - 20,
      );
    });

    return () => {
      window.removeEventListener('load', () => {});
      window.removeEventListener('resize', () => {});
    };
  }, []);

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
          isResizable: false,
          ...item,
          ...previousLayout,
        });
      });
    });

    return layouts;
  };

  const onLayoutChange = (layout, layouts) => {
    localStorage.setItem('layout', JSON.stringify(layout));
  };

  return (
    <div
      id={'draggable-table-container'}
      className={'draggable-table-container'}
    >
      {separators.map((item) => {
        return (
          <div
            className={'separator-container'}
            style={{
              transform: `translate(10px, ${item.y * ROW_HEIGHT + 30}px)`,
            }}
          >
            <div className={'separator'} />
          </div>
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
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
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
        <Input bordered={false} placeholder={`请输入${props.data?.desc}`} />
      </div>
      {props.data?.suffix && (
        <span className={'suffix'}>{props.data?.suffix}</span>
      )}
    </div>
  );
});

export default DraggableTableContainer;
