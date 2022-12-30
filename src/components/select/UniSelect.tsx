import React, { FC, useState } from 'react';
import { Select, SelectProps } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import './index.less';
import { pinyinInitialSearch } from '@/utils/pinyin';

const { Option } = Select;

interface UniSelectProps extends SelectProps {
  dataSource: any[];
  nameKey?: string;
  valueKey?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: any) => void;
  onFilterOptions?: (inputValue) => boolean;
  value?: string;
  allowClear?: boolean;
  enablePinyinSearch?: boolean;
}

const UniSelect: FC<UniSelectProps> = ({
  className,
  style,
  nameKey = 'name',
  valueKey = 'value',
  dataSource,
  onChange,
  onFilterOptions,
  enablePinyinSearch = true,
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
      filterOption={(inputValue, option) => {
        let filterOptionsResult = true;
        if (onFilterOptions) {
          filterOptionsResult = onFilterOptions(inputValue);
        }

        return (
          (filterOptionsResult &&
            option &&
            option.children?.toString()?.toLowerCase()?.indexOf(inputValue) !==
              -1) ||
          (enablePinyinSearch &&
            pinyinInitialSearch(
              option.children?.toString()?.toLowerCase(),
              inputValue.toLowerCase(),
            ))
        );
      }}
      {...restProps}
      onChange={(value: any) => {
        setSelectedValue(value);
        onChange && onChange(value);
      }}
    >
      {dataSource?.map((item) => {
        return (
          <Option key={uuidv4()} value={item[valueKey]}>
            {item[nameKey]}
          </Option>
        );
      })}
    </Select>
  );
};

export default React.memo(UniSelect);
