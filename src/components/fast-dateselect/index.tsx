import { Radio, RadioChangeEvent } from 'antd';
import React, { useState } from 'react';
import './index.less';

export interface FastDateSelectProps {
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: any) => void;
  dataSource?: DateSelectItem[];
  defaultValue?: string;
  value?: string;
}

export interface DateSelectItem {
  name: string;
  value: string;
}

const FastDateSelect = ({
  className,
  style,
  dataSource,
  onChange,
  defaultValue,
  value,
  ...restProps
}: FastDateSelectProps) => {
  return (
    <Radio.Group
      className={`fast-date-select-container ${className}`}
      value={value}
      buttonStyle="solid"
      defaultValue={defaultValue}
    >
      {dataSource?.map((item) => {
        return (
          <Radio.Button
            onClick={(event) => {
              let currentSelectedValue = (
                event?.currentTarget as any | undefined
              )?.value;
              if (currentSelectedValue === value) {
                currentSelectedValue = undefined;
              }
              onChange && onChange(currentSelectedValue);
            }}
            style={{ width: `calc(100% / ${dataSource.length})` }}
            value={item.value}
          >
            {item.name}
          </Radio.Button>
        );
      })}
    </Radio.Group>
  );
};

export default FastDateSelect;
