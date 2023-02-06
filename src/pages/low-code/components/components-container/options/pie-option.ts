import { defaultColors } from '@/pages/low-code/constants';

export const pieOption = {
  title: {
    show: false,
    text: '',
  },
  color: defaultColors,
  tooltip: {
    trigger: 'item',
  },
  grid: {
    // x: "7%",//x 偏移量
    // y: "5%", // y 偏移量
    left: '5%',
    top: '5%',
    right: '5%',
    bottom: '5%',
    containLabel: true,
  },
  series: {
    type: 'pie',
    radius: ['40%', '60%'],
    avoidLabelOverlap: true,
    itemStyle: {
      borderRadius: 10,
      borderColor: '#fff',
      borderWidth: 2,
    },
    labelLine: {
      show: true,
      length: 30,
    },
    label: {
      show: true,
      padding: [10, 0, 10, 0],
      position: 'outer',
      alignTo: 'labelLine',
      bleedMargin: 0,
      width: 200,
      overflow: 'break',
      formatter: (param) => {
        return `\n{type|${param.name}}\n\n{value|占比: ${
          param.percent || 0
        }%}\n\n`;
      },
      rich: {
        type: {
          fontSize: 14,
          fontWeight: 'bold',
          lineHeight: 30,
          marginBottom: 10,
        },

        value: {
          fontSize: 12,
          marginBottom: 5,
        },
      },
    },
    emphasis: {
      scale: true,
      scaleSize: 15,
    },
  },
  dataset: {
    source: [
      { value: 1048, name: 'Search Engine' },
      { value: 735, name: 'Direct' },
      { value: 580, name: 'Email' },
      { value: 484, name: 'Union Ads' },
      { value: 300, name: 'Video Ads' },
    ],
  },
};
