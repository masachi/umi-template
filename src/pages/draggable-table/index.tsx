import { Card, Input, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.less';
import _ from 'lodash';

import RGL, { WidthProvider } from 'react-grid-layout';

const GridLayout = WidthProvider(RGL);

const DraggableTableContainer = (props: any) => {
  const [layout, setLayout] = useState([]);

  const COL_NUM = 24;

  useEffect(() => {
    let layouts = generateLayout();
    setLayout(layouts);
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

  const generateLayout = () => {
    let disableYAxisNumber = [0, 10, 15];

    let nonStaticLayouts = _.map(
      new Array(defaultProps.items),
      function (item, i) {
        const y =
          _.result(defaultProps, 'y') || Math.ceil(Math.random() * 4) + 1;
        let yAxis = Math.floor(i / 6) * y;
        if (disableYAxisNumber.includes(yAxis)) {
          yAxis += 1;
        }
        return {
          x: (i * 2) % 12,
          y: yAxis,
          w: 4,
          h: 1,
          i: i.toString(),
          minW: 4,
          maxW: 10,
          maxH: 1,
          minH: 1,
        };
      },
    );

    let staticLayouts = [
      {
        x: 0,
        y: 0,
        w: 24,
        h: 1,
        i: '测试用header1',
        static: true,
      },
      {
        x: 0,
        y: 10,
        w: 24,
        h: 1,
        i: '测试用header2',
        static: true,
      },
      {
        x: 0,
        y: 15,
        w: 24,
        h: 1,
        i: '测试用header3',
        static: true,
      },
    ];

    return nonStaticLayouts.concat(staticLayouts);
  };

  const onLayoutChange = (layout, layouts) => {
    console.error('onLayoutChange', layout, layouts);
  };

  return (
    <div
      id={'draggable-table-container'}
      className={'draggable-table-container'}
    >
      <GridLayout
        className="layout"
        // layouts={layout}
        layout={layout}
        rowHeight={40}
        verticalCompact={false}
        isBounded={true}
        margin={[20, 10]}
        // breakpoints={{ lg: 1366, md: 1280, sm: 1024, xs: 480, xxs: 0 }}
        // cols={{ lg: 24, md: 20, sm: 12, xs: 8, xxs: 4 }}
        cols={COL_NUM}
        width={
          document.getElementById('draggable-table-container')?.offsetWidth
        }
        onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
      >
        {layout.map((item) => {
          return (
            <div key={item.i}>
              <Input placeholder={`${item.i}输入框`} />
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
};

export default DraggableTableContainer;
