import { Button, Card, Col, Layout, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
import { Emitter, EventConstant } from '@/utils/emitter';
import { v4 as uuidv4 } from 'uuid';
import { dynamicComponentsMap } from '@/components';
import { processSearchData } from '@/utils/headerSearchProcessor';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';

interface BaseLayoutProps {}

export interface BaseLayoutHeaderItem {
  componentName: string;
  props: any;
}

interface BaseLayoutHeaderProps {
  items: BaseLayoutHeaderItem[];
}

const mockDatasource = {
  'simulate-select': [
    {
      value: 'jack',
      name: 'Jack',
    },
    {
      value: 'tom',
      name: 'Tom',
    },
    {
      value: 'lucy',
      name: 'Lucy',
    },
  ],
};

const BaseLayoutHeader = (props: BaseLayoutHeaderProps) => {
  const [headerSearchValue, setHeaderSearchValue] = useState({});

  const onHeaderItemChange = (value: any, dataKey: string) => {
    let currentHeaderSearchValue = Object.assign({}, headerSearchValue);
    currentHeaderSearchValue[dataKey] = value;

    setHeaderSearchValue(currentHeaderSearchValue);
  };

  return (
    <Card className="base-layout-header-container">
      <Spin spinning={false}>
        <Row gutter={[16, 16]}>
          {props.items?.map((headerItem: BaseLayoutHeaderItem) => {
            const DynamicComponent = dynamicComponentsMap[
              `Uni${headerItem?.componentName}`
            ] as React.FC;
            return (
              <Col key={uuidv4()} span={6}>
                <DynamicComponent
                  {...headerItem?.props}
                  dataSource={mockDatasource[headerItem?.props?.dataKey] || []}
                  value={headerSearchValue[headerItem?.props?.dataKey]}
                  onChange={(value) => {
                    onHeaderItemChange(value, headerItem?.props?.dataKey);
                  }}
                />
              </Col>
            );
          })}
          <Col
            span={6}
            style={{
              display: 'flex',
              alignItems: 'end',
              justifyContent: 'end',
            }}
          >
            <Button
              className="base-layout-search-btn"
              onClick={(e) => {
                // TODO payload
                Emitter.emit(
                  EventConstant.HEADER_SEARCH_CLICK,
                  headerSearchValue,
                );
              }}
            >
              查询
            </Button>
          </Col>
        </Row>
      </Spin>
    </Card>
  );
};

const BaseLayout = (props: any) => {
  const route = props.route;

  const [childrenSearchValues, setChildrenSearchValues] = useState({});

  const searchDataProcess = (data) => {
    // 处理一下date format
    // 这里其实可以拿到headers的
    route.headers?.forEach((item) => {
      data[item.props?.dataKey] = processSearchData(
        data[item.props?.dataKey],
        item.componentName,
      );
    });

    setChildrenSearchValues(omitBy(data, isNil));
  };

  useEffect(() => {
    Emitter.on(EventConstant.HEADER_SEARCH_CLICK, (data) => {
      searchDataProcess(Object.assign({}, data));
    });

    return () => {
      Emitter.off(EventConstant.HEADER_SEARCH_CLICK);
    };
  }, []);

  return (
    <Layout>
      {route?.headers && route?.headers.length > 0 && (
        <BaseLayoutHeader items={route?.headers} />
      )}
      {React.Children.map(props.children, (child, i) => {
        if (child) {
          return React.cloneElement(child, { ...childrenSearchValues });
        }
      })}
    </Layout>
  );
};

export default BaseLayout;
