import { ProvinceOptionItem } from '@/components/province-selector/index';
import data from './data.json';

export function provinceSelectorDataProcessor(): ProvinceOptionItem[] {
  let provinceSelectorData: ProvinceOptionItem[] = [];

  // 第一个是 86 后续有概率 追加国外
  for (const [key, value] of Object.entries(data['86'])) {
    console.log(`${key}: ${value}`);
  }
  Object.entries(data['86']).forEach(([key, value]) => {
    provinceSelectorData.push({
      value: key,
      label: value,
      code: key,
    });
  });

  provinceSelectorData.forEach((item) => {
    if (data[item.code]) {
      item.children = getItemsByKey(item.code);
    }

    if (item.children && item.children?.length > 0) {
      item.children?.forEach((childItem) => {
        childItem.children = getItemsByKey(childItem.code);
      });
    }
  });

  return provinceSelectorData;
}

function getItemsByKey(dataKey: string) {
  return data[dataKey]
    ? Object.entries(data[dataKey]).map(([key, value]) => {
        return {
          value: key,
          label: value.toString(),
          code: key,
        };
      })
    : [];
}

export function getProvinceCityDistrictDataByTypeAndCode(
  type: string,
  code?: string,
) {
  switch (type) {
    case 'PROVINCE':
      return Object.entries(data['86']).map(([key, value]) => {
        return {
          value: key,
          label: value.replace('省', '').replace('市', ''),
          code: key,
        };
      });
    case 'CITY':
      return (code ? getItemsByKey(code) : []).map((item) => {
        return {
          ...item,
          label: item.label.replace('市', '').replace('县', ''),
        };
      });
    case 'DISTRICT':
      return (code ? getItemsByKey(code) : []).map((item) => {
        return {
          ...item,
          label: item.label
            .replace('区', '')
            .replace('市', '')
            .replace('县', ''),
        };
      });
  }
}
