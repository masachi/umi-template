import { Emitter, EventConstant } from '@/utils/emitter';
import { Input, Switch } from 'antd';
import React from 'react';
import './common.less';

export const UniPanel = ({ header, children, ...restProps }: any) => {
  return (
    <div className={'panel-container'}>
      {header && <div className={'header'}>{header}</div>}
      <div className={'children-container'}>{children}</div>
    </div>
  );
};

export const UniPanelRow = ({ label, children }: any) => {
  return (
    <div className={'item-container'}>
      <label className={'label'}>{label}</label>
      {children}
    </div>
  );
};

export const UniPanelColumn = ({ label, children }: any) => {
  return (
    <div className={'item-container-column'}>
      <label className={'label'}>{label}</label>
      {children}
    </div>
  );
};

export const CardHeader = ({ componentId, card }) => {
  const onCardPropsChange = (id: string, key: string, value: any) => {
    let payload = {
      id: id,
      card: {},
    };

    payload['card'][key] = value;
    Emitter.emit(EventConstant.RIGHT_CONTAINER_CARD_CHANGE, payload);
  };

  return (
    <UniPanel header="卡片">
      <UniPanelRow label={'显示卡片'}>
        <Switch
          checked={card?.enable}
          onChange={(checked) => {
            onCardPropsChange(componentId, 'enable', checked);
          }}
        />
      </UniPanelRow>
      {card?.enable && (
        <UniPanelRow label={'卡片标题'}>
          <Input
            className={'input'}
            value={card?.title}
            onChange={(event) => {
              onCardPropsChange(componentId, 'title', event.target.value);
            }}
            onPressEnter={(event) => {
              onCardPropsChange(componentId, 'title', event);
            }}
            onBlur={(event) => {
              onCardPropsChange(
                componentId,
                'cardHeaderTitle',
                event.target.value,
              );
            }}
          />
        </UniPanelRow>
      )}
    </UniPanel>
  );
};

export const componentPropsChange = (id: string, key: string, value: any) => {
  let payload = {
    id: id,
    props: {},
  };

  payload.props[key] = value;
  Emitter.emit(EventConstant.RIGHT_CONTAINER_PROPS_CHANGE, payload);
};

export const Layout = ({ componentId, props }) => {
  const layouts = [
    {
      class: 'margin-top-div',
      key: 'marginTop',
    },
    {
      class: 'margin-right-div',
      key: 'marginRight',
    },
    {
      class: 'margin-bottom-div',
      key: 'marginBottom',
      hint: 'MARGIN',
    },
    {
      class: 'margin-left-div',
      key: 'marginLeft',
    },
    {
      class: 'padding-top-div',
      key: 'paddingTop',
    },
    {
      class: 'padding-right-div',
      key: 'paddingRight',
    },
    {
      class: 'padding-bottom-div',
      key: 'paddingBottom',
      hint: 'PADDING',
    },
    {
      class: 'padding-left-div',
      key: 'paddingLeft',
    },
  ];

  return (
    <UniPanel header="位置">
      <UniPanelColumn label={'位置设定'}>
        <div className={'layout-style-container'}>
          <div className="layout-box-container">
            {layouts.map((item) => {
              return (
                <div className={item.class}>
                  {item.hint && <span className="help-txt">{item.hint}</span>}
                  <span className="next-input next-medium next-noborder">
                    <Input
                      className={'layout-input'}
                      defaultValue={props?.style?.[item.key]}
                      placeholder={'0'}
                      onChange={(event) => {
                        // onPieRadiusChange(event.target.value, 0)
                      }}
                      onPressEnter={(event) => {
                        // onPieRadiusChange(event, 0)
                      }}
                      onBlur={(event) => {
                        // onPieRadiusChange(event.target.value, 0)
                      }}
                    />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </UniPanelColumn>
    </UniPanel>
  );
};
