import {
  CardHeader,
  componentPropsChange,
  UniPanel,
  UniPanelColumn,
  UniPanelRow,
} from '@/pages/low-code/components/editor/props/common';
import { Collapse, Input, Select, Tag } from 'antd';
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import './styles/index.less';
import './styles/layout.less';
import jsonp from 'fetch-jsonp';

export const EchartsPiePropsEditor = ({ componentId, selectComponentData }) => {
  return (
    <div id={'pie-props-editor'}>
      <Collapse className={'color-container'} collapsible={'disabled'}>
        <CardHeader
          componentId={componentId}
          card={selectComponentData?.card}
        />
        <EchartsColor
          componentId={componentId}
          props={selectComponentData?.props}
        />
        <EchartsDataSource
          componentId={componentId}
          props={selectComponentData?.props}
        />
        <EchartsGrid
          componentId={componentId}
          props={selectComponentData?.props}
        />
        <EchartsPieRadius
          componentId={componentId}
          props={selectComponentData?.props}
        />
      </Collapse>
    </div>
  );
};

const updateEchartsOptions = (componentId, options) => {
  componentPropsChange(componentId, 'options', options);
};

export const EchartsColor = ({ componentId, props }) => {
  const [selectedColor, setSelectedColor] = useState(undefined);

  const onColorSelected = (value: string) => {
    let currentOptions = Object.assign({}, props?.options);
    currentOptions.color = value;

    updateEchartsOptions(componentId, currentOptions);
  };

  const onColorPickerChange = (color, event) => {
    setSelectedColor(color);
  };

  const onColorPickerChangeComplete = (open: boolean) => {
    // 表示关闭的时候 确定选择
    if (!open) {
      let currentOptions = Object.assign({}, props?.options);
      currentOptions.color = [...currentOptions.color, selectedColor?.hex];

      updateEchartsOptions(componentId, currentOptions);
    }
  };

  const ColorSelector = () => {
    return (
      <SketchPicker color={selectedColor} onChange={onColorPickerChange} />
    );
  };

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          margin: '2px 3px 2px 0px',
          height: '24px',
        }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <UniPanel header="颜色">
      <UniPanelColumn label={'颜色选择'}>
        <Select
          mode="tags"
          style={{ width: '100%' }}
          onChange={onColorSelected}
          options={[]}
          value={props?.options?.color}
          dropdownRender={ColorSelector}
          getPopupContainer={(trigger) =>
            document.getElementById('low-code-container')
          }
          dropdownStyle={{
            background: 'transparent',
            boxShadow: 'none',
            padding: 0,
            border: '1px #cccccc solid',
          }}
          onDropdownVisibleChange={onColorPickerChangeComplete}
          tagRender={tagRender}
        />
      </UniPanelColumn>
    </UniPanel>
  );
};

export const EchartsGrid = ({ componentId, props }) => {
  const onGridChange = (value, key) => {
    let currentOptions = Object.assign({}, props?.options);

    currentOptions.grid[key] = `${value}`;
    updateEchartsOptions(componentId, currentOptions);
  };

  const layouts = [
    {
      class: 'margin-top-div',
      key: 'top',
    },
    {
      class: 'margin-right-div',
      key: 'right',
    },
    {
      class: 'margin-bottom-div',
      key: 'bottom',
      hint: '外边距',
    },
    {
      class: 'margin-left-div',
      key: 'left',
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
                      defaultValue={props?.options?.grid?.[item.key]}
                      placeholder={props?.options?.grid?.[item.key] || '0'}
                      onChange={(event) => {
                        onGridChange(event.target.value, item.key);
                      }}
                      onPressEnter={(event) => {
                        onGridChange(event, item.key);
                      }}
                      onBlur={(event) => {
                        onGridChange(event.target.value, item.key);
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

export const EchartsPieRadius = ({ componentId, props }) => {
  const onPieRadiusChange = (value, index) => {
    let currentOptions = Object.assign({}, props?.options);

    currentOptions.series.radius[index] = value;

    updateEchartsOptions(componentId, currentOptions);
  };

  return (
    <UniPanel header="大小">
      <UniPanelRow label={'内圈大小'}>
        <Input
          className={'input'}
          defaultValue={props?.options?.series?.radius[0]}
          onChange={(event) => {
            onPieRadiusChange(event.target.value, 0);
          }}
          onPressEnter={(event) => {
            onPieRadiusChange(event, 0);
          }}
          onBlur={(event) => {
            onPieRadiusChange(event.target.value, 0);
          }}
        />
      </UniPanelRow>

      <UniPanelRow label={'外圈大小'}>
        <Input
          className={'input'}
          defaultValue={props?.options?.series?.radius[1]}
          onChange={(event) => {
            onPieRadiusChange(event.target.value, 1);
          }}
          onPressEnter={(event) => {
            onPieRadiusChange(event, 1);
          }}
          onBlur={(event) => {
            onPieRadiusChange(event.target.value, 1);
          }}
        />
      </UniPanelRow>
    </UniPanel>
  );
};

export const EchartsDataSource = ({ componentId, props }) => {
  const onDataSourceUrlChange = async (value) => {
    componentPropsChange(componentId, 'dataSourceUrl', value);
    // change datasource
    let response = await jsonp(
      `https://suggest.taobao.com/sug?q=${value}&code=utf-8`,
    );
    let data = await response.json();

    let dataSource =
      data?.result?.map((item) => {
        return {
          name: item[0],
          value: Math.random() * 100,
        };
      }) || [];

    let currentOptions = Object.assign({}, props?.options);
    currentOptions.dataset.source = dataSource;

    updateEchartsOptions(componentId, currentOptions);
  };

  return (
    <UniPanel header="数据源URL">
      <UniPanelRow label={'表格数据URL'}>
        <Input
          className={'input'}
          value={props?.dataSourceUrl}
          onChange={(event) => {
            onDataSourceUrlChange(event.target.value);
          }}
          onPressEnter={(event) => {
            onDataSourceUrlChange(event);
          }}
          onBlur={(event) => {
            onDataSourceUrlChange(event.target.value);
          }}
        />
      </UniPanelRow>
    </UniPanel>
  );
};
