import { FC } from 'react';
import { Input, InputNumber } from 'antd';
import { InputProps } from 'antd/lib/input/Input';
import './index.less';
import { InputNumberProps } from 'antd/lib/input-number';

interface UniInputProps extends InputProps {
  postValueProcessor: (value: any) => string;
  onChange?: (value: any) => void;
}

interface UniInputNumberProps extends InputNumberProps {
  onChange?: (value: any) => void;
}

const UniInput: FC<UniInputProps> = ({
  value,
  postValueProcessor,
  onChange,
  className,
  ...restProps
}: UniInputProps) => {
  return (
    <Input
      className={`input-container ${className}`}
      defaultValue={value}
      onBlur={(event) => {
        let value = event.target.value;

        if (postValueProcessor) {
          value = postValueProcessor(value);
        }

        onChange && onChange(value);
      }}
      onPressEnter={(event) => {
        let value = (event.target as any).value;

        if (postValueProcessor) {
          value = postValueProcessor(value);
        }

        onChange && onChange(value);
      }}
      {...restProps}
    />
  );
};

const UniInputNumber: FC<UniInputNumberProps> = ({
  value,
  onChange,
  className,
  ...restProps
}: UniInputNumberProps) => {
  return (
    <InputNumber
      className={`input-number-container ${className}`}
      defaultValue={value}
      onBlur={(event) => {
        onChange && onChange(event.target.value);
      }}
      onPressEnter={(event) => {
        onChange && onChange((event.target as any).value);
      }}
      {...restProps}
    />
  );
};

export { UniInput, UniInputNumber };
