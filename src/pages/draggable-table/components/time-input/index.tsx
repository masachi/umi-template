import React from 'react';
import './index.less';
import { InputNumber } from 'antd';

const defaultTimeInputProperties = [
  {
    label: '天',
    dataKey: 'day',
    min: 0,
  },
  {
    label: '小时',
    dataKey: 'hour',
    min: 0,
    max: 23,
  },
  {
    label: '分钟',
    dataKey: 'minute',
    min: 0,
    max: 59,
  },
];

const UniTimeInput = () => {
  return (
    <div className={'time-input-container'}>
      {defaultTimeInputProperties.map((item) => {
        return (
          <>
            <InputNumber
              className={'input-number'}
              min={item.min || 0}
              max={item.max}
              step={1}
              precision={1}
              controls={false}
            />
            <span className={'label'}>{item.label}</span>
          </>
        );
      })}
    </div>
  );
};

export default UniTimeInput;
