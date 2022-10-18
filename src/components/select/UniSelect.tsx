import React, { FC, useState } from 'react';
import { Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import './index.less';

const { Option } = Select;

interface UniSelectProps {
  dataSource: any[];
  nameKey?: string;
  valueKey?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: any) => void;
  value?: string;
  allowClear?: boolean;
}

const UniSelect: FC<UniSelectProps> = ({
  className,
  style,
  nameKey = 'name',
  valueKey = 'value',
  dataSource,
  onChange,
  ...restProps
}: UniSelectProps) => {
  const [selectedValue, setSelectedValue] = useState(undefined);

  return (
    <Select
      id={uuidv4()}
      className={`select ${className}`}
      style={{ ...{}, ...style }}
      showSearch
      allowClear={restProps?.allowClear || true}
      value={restProps.value || selectedValue}
      getPopupContainer={(trigger) => trigger?.parentElement || document.body}
      placeholder={dataSource?.length ? '请选择' : ''}
      filterOption={(inputValue, option) =>
        option &&
        option.children?.toString()?.toLowerCase()?.indexOf(inputValue) !== -1
      }
      {...restProps}
      onChange={(value: any) => {
        setSelectedValue(value);
        onChange && onChange(value);
      }}
    >
      {dataSource
        ?.map((item) => {
          return {
            name: item[nameKey],
            value: item[nameKey],
          };
        })
        .map((item) => {
          return (
            <Option key={uuidv4()} value={item.value}>
              {item.name}
            </Option>
          );
        })}
    </Select>
  );
};

export default React.memo(UniSelect);
