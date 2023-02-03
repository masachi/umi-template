import React, { useEffect, useState, useRef, ReactNode } from 'react';
import _ from 'lodash';
import * as echarts from 'echarts';

import { Empty, Spin } from 'antd';
import styles from './index.less';
import { isEmpty, isString } from 'lodash';
import themeBlueYellow from './themes/themeBlueYellow';
import { Emitter, EventConstant } from '@/utils/emitter';

echarts.registerTheme('themeBlueYellow', themeBlueYellow);

export interface EchartsCardProps {
  elementId: string; //元素Id
  options: any; //echartsOptions
  height?: number;
  backgroundColor?: string; //背景色
  title?: string; //标题
  loading?: boolean; //loading
  mouseEvents?: any;
  seriesClick?: (params) => void;
}

const UniEcharts: React.FC<EchartsCardProps> = ({
  backgroundColor = '#fff',
  height = 400,
  elementId,
  title,
  options = {},
  loading,
  mouseEvents,
  seriesClick,
}) => {
  const [preData, setPreData] = useState(null);
  //data为空时
  const isEmptyOpt = isEmpty(options);

  const chartRef = useRef();

  const [echartsHeight, setEchartsHeight] = useState(height);

  useEffect(() => {
    Emitter.on(EventConstant.GRID_LAYOUT_RESIZE_STOP, () => {
      if (document.getElementById('card-body-container')) {
        setEchartsHeight(
          document.getElementById('card-body-container')?.offsetHeight - 24 ||
            height,
        );
      }

      // resize
      if (echarts.getInstanceByDom(chartRef.current)) {
        setTimeout(() => {
          echarts.getInstanceByDom(chartRef.current).resize();
        }, 100);
      }
    });
    return () => {
      Emitter.off(EventConstant.GRID_LAYOUT_RESIZE_STOP);
    };
  }, []);

  useEffect(() => {
    let myChart =
      echarts.getInstanceByDom(chartRef.current) ||
      echarts.init(chartRef.current, 'themeBlueYellow');
    if (!_.isEqual(options, preData) && chartRef.current) {
      setPreData(_.cloneDeep(options)); //缓存之前的options

      myChart.hideLoading();
      window.addEventListener('resize', function () {
        myChart.resize(); //自适应宽度
      });
      if (mouseEvents) {
        const { eventName, query, handler } = mouseEvents;
        myChart.off(eventName);
        myChart.on(eventName, query, handler);
      }

      if (seriesClick) {
        myChart.getZr().off('click');
        myChart.getZr().on('mousemove', function (params) {
          const pointInPixel = [params.offsetX, params.offsetY];
          if (myChart.containPixel('grid', pointInPixel)) {
            myChart.getZr().setCursorStyle('pointer');
          }
        });
        myChart.on('mouseout', function (params) {
          const pointInPixel = [params.offsetX, params.offsetY];
          if (!myChart.containPixel('grid', pointInPixel)) {
            myChart.getZr().setCursorStyle('default');
          }
        });
        myChart.getZr().on('click', function (params) {
          const pointInPixel = [params.offsetX, params.offsetY];
          if (myChart.containPixel('grid', pointInPixel)) {
            let index = myChart.convertFromPixel(
              { seriesIndex: 0 },
              pointInPixel,
            )[0];
            seriesClick(index);
          }
        });
      }
      //重绘
      myChart.resize();
      myChart.setOption(options || {}, true);
      if (!options.backgroundColor) {
        myChart.setOption({
          backgroundColor: backgroundColor,
        });
      }
    } else {
      myChart.resize(); //多次调用resize();
    }

    return () => {
      window.removeEventListener('resize', () => {
        if (myChart) {
          myChart.resize();
        }
      });
    };
  }, [options, mouseEvents]);

  return (
    <div
      id={'echarts-card-body'}
      className={styles.flex_center}
      style={{ height: echartsHeight }}
    >
      <div ref={chartRef} id={elementId} className={styles.canvas}></div>
      {isEmptyOpt && (
        <div
          className={styles.emptymask}
          style={{ backgroundColor: backgroundColor }}
        >
          <Empty
            description={`暂无${isString(title) ? title : ''}数据`}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      )}
      {loading && (
        <section
          className={styles.loadmask}
          style={{ backgroundColor: backgroundColor }}
        >
          <Spin tip="加载中..."></Spin>
        </section>
      )}
    </div>
  );
};

export default UniEcharts;
