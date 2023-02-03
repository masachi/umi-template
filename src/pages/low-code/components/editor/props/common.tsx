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
      <UniPanelRow label={'是否显示卡片'}>
        <Switch
          checked={card?.enable}
          onChange={(checked) => {
            onCardPropsChange(componentId, 'enable', checked);
          }}
        />
      </UniPanelRow>
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
    </UniPanel>
  );
};
