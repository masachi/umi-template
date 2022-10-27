import { Button, Card, Col, Layout, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';
import { Emitter, EventConstant } from '@/utils/emitter';
import { v4 as uuidv4 } from 'uuid';
import { dynamicComponentsMap } from '@/components';
import { processSearchData } from '@/utils/headerSearchProcessor';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import { headers } from '@/headers';
import { useSessionStorageState } from 'ahooks';

interface BaseLayoutProps {}

export interface BaseLayoutHeaderItem {
  label?: string;
  componentName: string;
  props?: any;
}

interface BaseLayoutHeaderProps {
  items: BaseLayoutHeaderItem[];
  value: any;
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
  const [headerSearchValue, setHeaderSearchValue] = useState(props.value);

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
            let value =
              headerSearchValue[
                headerItem?.props?.valueKey || headerItem?.props?.dataKey
              ];
            if (value && headerItem?.props?.preProcess) {
              value = headerItem?.props?.preProcess(value);
            }
            return (
              <Col className={'header-item-container'} key={uuidv4()} span={6}>
                {headerItem?.label && <label>{headerItem?.label}：</label>}
                <DynamicComponent
                  className={`header-item-base ${headerItem?.props?.className}`}
                  {...headerItem?.props}
                  dataSource={mockDatasource[headerItem?.props?.dataKey] || []}
                  value={value}
                  onChange={(value) => {
                    onHeaderItemChange(
                      value,
                      headerItem?.props?.valueKey || headerItem?.props?.dataKey,
                    );
                  }}
                />
              </Col>
            );
          })}
          <Col
            span={6}
            style={{
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'start',
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

  const [childrenSearchValues, setChildrenSearchValues] =
    useSessionStorageState<any>('tableLayoutOpts', {});

  const searchDataProcess = (data) => {
    // 处理一下date format
    // 这里其实可以拿到headers的
    headers[route?.headerKey]?.forEach((item) => {
      data[item.props?.dataKey] = processSearchData(
        item.componentName,
        data[item.props?.dataKey],
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
      {route?.headerKey && headers[route?.headerKey]?.length > 0 && (
        <BaseLayoutHeader
          items={headers[route?.headerKey]}
          value={childrenSearchValues || {}}
        />
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
