import { Cascader } from 'antd';
import React, { useState } from 'react';
import './index.less';
import {
  getProvinceCityDistrictDataByTypeAndCode,
  provinceSelectorDataProcessor,
} from '@/components/province-selector/data-processor';
import UniSelect from '@/components/select/UniSelect';

export interface ProvinceOptionItem {
  value: string;
  label: string;
  code?: string;
  children?: ProvinceOptionItem[];
}

const options: ProvinceOptionItem[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const ProvinceSelector = () => {
  // TODO on Change event emitter
  const onChange = (value: string[]) => {
    console.log(value);
  };

  const renderSelectorSelected = (labels: string[]) => {
    // TODO  或者空格
    return labels.join('-');
  };

  return (
    <div className={'province-selector-container'}>
      <Cascader
        options={provinceSelectorDataProcessor()}
        expandTrigger="hover"
        displayRender={renderSelectorSelected}
        onChange={onChange}
      />
    </div>
  );
};

const SeparateProvinceSelector = () => {
  const [provinceSelectedData, setProvinceSelectedData] = useState({});

  return (
    <div className={'separate-province-selector-container'}>
      <UniSelect
        className={'selector-container'}
        dataSource={getProvinceCityDistrictDataByTypeAndCode('PROVINCE')}
        value={provinceSelectedData['province']}
        placeholder="请选择省（直辖市）"
        showSearch
        nameKey={'label'}
        valueKey={'value'}
        allowClear={false}
        onChange={(values: any) => {
          setProvinceSelectedData({
            ...provinceSelectedData,
            province: values,
          });
        }}
      />
      <span className={'label'}>省（直辖市）</span>
      <UniSelect
        className={'selector-container'}
        dataSource={getProvinceCityDistrictDataByTypeAndCode(
          'CITY',
          provinceSelectedData['province'],
        )}
        value={provinceSelectedData['city']}
        placeholder="请选择市（市辖区）"
        showSearch
        nameKey={'label'}
        valueKey={'value'}
        allowClear={false}
        onChange={(values: any) => {
          setProvinceSelectedData({
            ...provinceSelectedData,
            city: values,
          });
        }}
      />
      <span className={'label'}>市（市辖区）</span>
      <UniSelect
        className={'selector-container'}
        dataSource={getProvinceCityDistrictDataByTypeAndCode(
          'DISTRICT',
          provinceSelectedData['city'],
        )}
        value={provinceSelectedData['district']}
        placeholder="请选择区（县旗）"
        showSearch
        nameKey={'label'}
        valueKey={'value'}
        allowClear={false}
        onChange={(values: any) => {
          setProvinceSelectedData({
            ...provinceSelectedData,
            district: values,
          });
        }}
      />
      <span className={'label'}>区（县旗）</span>
    </div>
  );
};

export { ProvinceSelector, SeparateProvinceSelector };
