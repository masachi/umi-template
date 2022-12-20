import { Card, Col, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './index.less';
import { TableCoordinateItem } from '@/pages/coordinate-table/interfaces';

const CoordinateTableContainer = (props: any) => {
  const [layout, setLayout] = useState([]);

  const COL_NUM = 24;

  const layouts: TableCoordinateItem[][] = [
    [
      {
        height: 1,
        width: 4,
      },
      {
        offset: 1,
        height: 1,
        width: 4,
      },
      {
        offset: 2,
        height: 1,
        width: 4,
      },
    ],
  ];

  return (
    <div
      id={'coordinate-table-container'}
      className={'coordinate-table-container'}
    >
      {layouts.map((row) => {
        return (
          <Row gutter={[16, 16]}>
            {row.map((item) => {
              return (
                <Col
                  span={item.width || 1}
                  className={item.className || ''}
                  offset={item.offset || 0}
                >
                  {uuidv4()}
                </Col>
              );
            })}
          </Row>
        );
      })}
    </div>
  );
};

export default CoordinateTableContainer;
