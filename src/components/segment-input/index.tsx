import React, { useEffect, useState } from 'react';
import { Input, InputNumber, Slider } from 'antd';
import './index.less';
import Constants from '@/constants';

export interface SegmentInputProps {
  containerClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: any) => void;
  placeholders?: string[];
  value?: any[];
}

const SegmentInput = (props: SegmentInputProps) => {
  const [segmentInputValues, setSegmentInputValues] = useState(
    props.value || [undefined, undefined],
  );

  const onInputChange = (event, index, submit = false) => {
    let values = segmentInputValues.slice();

    values[index] = event?.toString();
    setSegmentInputValues(values);

    if (submit) {
      props.onChange && props.onChange(segmentInputValues);
    }
  };

  const transformMaxValueToInfinityLabel = (
    maxValue: number,
    inputValue: number | string,
  ) => {
    if (
      typeof inputValue === 'string'
        ? parseFloat(inputValue) > maxValue
        : inputValue > maxValue
    ) {
      return '最大';
    }
    return inputValue;
  };

  return (
    <div className={`segment-input-container ${props.containerClassName}`}>
      <Input.Group compact={true}>
        <InputNumber
          className={`input ${props.className}`}
          placeholder={props.placeholders?.at(0) || '下界'}
          value={segmentInputValues?.at(0)}
          min={0}
          max={10}
          onChange={(event) => {
            onInputChange(event, 0);
          }}
          onPressEnter={(event: any) => {
            onInputChange(event.target.value, 0, true);
          }}
          step={0.1}
          precision={1}
          controls={false}
          onBlur={(event) => {
            onInputChange(event.target.value, 0, true);
          }}
        />

        <Input
          className="separator"
          style={{
            width: 30,
            borderLeft: 0,
            borderRight: 0,
            pointerEvents: 'none',
          }}
          placeholder="~"
          disabled
        />

        <InputNumber
          className={`input ${props.className}`}
          style={{ borderLeftWidth: 0 }}
          placeholder={props.placeholders?.at(1) || '上界'}
          value={
            segmentInputValues?.at(1) === ''
              ? Constants.SegmentInputLabel.INFINITY_LABEL
              : segmentInputValues?.at(1)
          }
          min={segmentInputValues?.at(0) || 0}
          onChange={(event) => {
            onInputChange(transformMaxValueToInfinityLabel(10, event), 1);
          }}
          onPressEnter={(event: any) => {
            onInputChange(
              transformMaxValueToInfinityLabel(10, event.target.value),
              1,
              true,
            );
          }}
          step={0.1}
          precision={1}
          controls={false}
          onBlur={(event) => {
            onInputChange(
              transformMaxValueToInfinityLabel(10, event.target.value),
              1,
              true,
            );
          }}
        />
      </Input.Group>
    </div>
  );
};

export default SegmentInput;
