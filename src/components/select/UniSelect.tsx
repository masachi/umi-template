import React, { FC, useState } from 'react';
import { Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import './index.less';
import { SelectProps } from 'antd/lib/select';
import { pinyinInitialSearch } from '@/utils/pinyin';

const { Option } = Select;

interface UniSelectProps extends SelectProps {
  dataSource: any[];
  optionNameKey?: string;
  optionValueKey?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: any) => void;
  onFilterOptions?: (inputValue) => boolean;
  value?: string;
  allowClear?: boolean;
  enablePinyinSearch?: boolean;
  placeholder?: string;
  showSearch?: boolean;
  label?: string;
}

const UniSelect: FC<UniSelectProps> = ({
  className,
  style,
  optionNameKey = 'name',
  optionValueKey = 'value',
  dataSource,
  onChange,
  onFilterOptions,
  enablePinyinSearch = true,
  label,
  ...restProps
}: UniSelectProps) => {
  const [selectedValue, setSelectedValue] = useState(undefined);

  return (
    <div className={'select-container'}>
      {label && <label>{label}</label>}
      <Select
        id={uuidv4()}
        className={`select ${className}`}
        style={{ ...{}, ...style }}
        showSearch
        allowClear={restProps?.allowClear || true}
        value={restProps.value || selectedValue}
        getPopupContainer={(trigger) => trigger?.parentElement || document.body}
        placeholder={dataSource?.length ? `${restProps?.placeholder}` : ''}
        filterOption={(inputValue, option) => {
          let filterOptionsResult = true;
          if (onFilterOptions) {
            filterOptionsResult = onFilterOptions(inputValue);
          }
          return (
            (filterOptionsResult &&
              option &&
              option.children
                ?.toString()
                ?.toLowerCase()
                ?.indexOf(inputValue) !== -1) ||
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
            <Option key={uuidv4()} value={item[optionValueKey]}>
              {item[optionNameKey]}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default React.memo(UniSelect);
