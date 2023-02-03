import React, { ReactElement } from 'react';
import { Radio } from 'antd';
import {
  RadioGroupButtonStyle,
  RadioGroupOptionType,
} from 'antd/lib/radio/interface';

interface Props {
  onChange: (value: string) => void;
  value: any;
  optionType: RadioGroupOptionType;
  buttonStyle: RadioGroupButtonStyle;
}

export default function UniRadio({
  onChange,
  value,
  optionType,
  buttonStyle,
  ...other
}: Props): ReactElement {
  return (
    <Radio.Group
      optionType={optionType || 'button'}
      buttonStyle={buttonStyle || 'solid'}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      {...other}
    ></Radio.Group>
  );
}
