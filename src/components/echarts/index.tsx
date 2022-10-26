// by yangbo

import React, {
  Fragment,
  useEffect,
  useState,
  useMemo,
  useRef,
  ReactNode,
} from 'react';
import _ from 'lodash';
// 全部引入
// import * as echarts from 'echarts';
// 按需引入
import * as echarts from 'echarts';
// import * as echarts from 'echarts/core';
// import {
//   BarChart,
//   // 系列类型的定义后缀都为 SeriesOption
//   BarSeriesOption,
//   LineChart,
//   LineSeriesOption,
//   PieChart,
//   PieSeriesOption,
// } from 'echarts/charts';
// import {
//   TitleComponent,
//   // 组件类型的定义后缀都为 ComponentOption
//   TitleComponentOption,
//   GridComponent,
//   GridComponentOption,
//   DataZoomComponent,
//   DataZoomInsideComponent,
//   DataZoomSliderComponent,
//   DatasetComponent,
//   LegendComponent,
//   AxisPointerComponent,

// } from 'echarts/components';

// import 'echarts/lib/component/dataset';
// import 'echarts/lib/chart/line';
// import 'echarts/lib/chart/bar';
// import 'echarts/lib/chart/pie';

// import 'echarts/lib/chart/scatter';
// import 'echarts/lib/chart/radar';
// import 'echarts/lib/chart/map';
// import 'echarts/lib/chart/tree';
// import 'echarts/lib/chart/treemap';
// import 'echarts/lib/chart/graph';
// import 'echarts/lib/chart/gauge';
// import 'echarts/lib/chart/funnel';
// import 'echarts/lib/chart/parallel';
// import 'echarts/lib/chart/sankey';
// import 'echarts/lib/chart/boxplot';
// import 'echarts/lib/chart/candlestick';
// import 'echarts/lib/chart/effectScatter';
// import 'echarts/lib/chart/lines';
// import 'echarts/lib/chart/heatmap';
// import 'echarts/lib/chart/pictorialBar';
// import 'echarts/lib/chart/themeRiver';
// import 'echarts/lib/chart/sunburst';
// import 'echarts/lib/chart/custom';

// import 'echarts/lib/component/grid';
// import 'echarts/lib/component/polar';
// import 'echarts/lib/component/geo';
// import 'echarts/lib/component/singleAxis';
// import 'echarts/lib/component/parallel';
// import 'echarts/lib/component/calendar';
// import 'echarts/lib/component/graphic';
// import 'echarts/lib/component/toolbox';
// import 'echarts/lib/component/axisPointer';
// import 'echarts/lib/component/brush';
// import 'echarts/lib/component/timeline';
// import 'echarts/lib/component/markPoint';
// import 'echarts/lib/component/markLine';
// import 'echarts/lib/component/markArea';
// import 'echarts/lib/component/legendScroll';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
// // import 'echarts/lib/component/legend';
// import 'echarts/lib/component/toolbox';
// // import 'echarts/lib/component/dataZoom';
// // import 'echarts/lib/component/dataZoomInside';
// // import 'echarts/lib/component/dataZoomSlider';
// import 'echarts/lib/component/visualMap';
// import 'echarts/lib/component/visualMapContinuous';
// import 'echarts/lib/component/visualMapPiecewise';
// import "echarts-liquidfill/dist/echarts-liquidfill";
// import "echarts/render/lib/vml/vml";
// import "echarts/render/lib/svg/svg";

import { Space, Modal, Empty, Spin, Tooltip, Typography } from 'antd';
import {
  FullscreenOutlined,
  TableOutlined,
  FullscreenExitOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import UniProTable, {
  IUniProTableProps,
} from '@/components/UniComponents/UniProTable';
import { isEmpty, isString } from 'lodash';
import chameleonBluePurple from './themes/chameleonBluePurple';
import themeBlueYellow from './themes/themeBlueYellow';

echarts.registerTheme('themeBlueYellow', themeBlueYellow);

// export interface TableProps {
//   uniColumns: Array<any>;
//   dataSource: Array<any>;
// }
export interface EchartsCardProps {
  elemId: string; //元素Id
  options: any; //echartsOptions
  tabledata?: any; //表格数据
  extra?: any; //扩展
  backgroundColor?: string; //背景色
  height?: number; //高度340默认
  needBoxShadow?: boolean; // 默认开
  title?: string | ReactNode; //标题
  tip?: React.ReactNode; //提示
  loading?: boolean; //loading
  mouseEvents?: any;
  backGraphClk?: (event) => void; // 回退按钮事件
  rowKey?: string;
  noStyle?: boolean; //noshadow
  bordered?: boolean; //边框
  seriseClick?: (params) => void;
  restore?: {
    // 如果有这个就用这个来加在restore上
    opts?: any;
    clkFunc?: () => void;
  };

  columnsFilterDropdown?: any[]; //自动添加filter根据类型判断
  isSort?: boolean;
  columnsSort?: any;
}
const EchartsCard: React.FC<EchartsCardProps> = ({
  extra,
  backgroundColor = '#fff',
  elemId,
  height = 340,
  needBoxShadow = true,
  title,
  tip,
  rowKey = 'key',
  options = {},
  tabledata,
  loading,
  mouseEvents,
  backGraphClk,
  seriseClick,
  restore,
  noStyle,
  isSort,
  columnsSort,
  columnsFilterDropdown,
}) => {
  const [isFull, setisFull] = useState(false);
  const [preData, setPreData] = useState(null);
  const [charItem, setChartItem] = useState(null);
  const [visiable, setVisiable] = useState<boolean>(false);
  //data为空时
  const isEmptyOpt = isEmpty(options);

  const chartRef = useRef();

  useEffect(() => {
    let myChart =
      echarts.getInstanceByDom(chartRef.current) ||
      echarts.init(chartRef.current, 'themeBlueYellow');
    if (
      JSON.stringify(options) !== JSON.stringify(preData) &&
      chartRef.current
    ) {
      setPreData(_.cloneDeep(options)); //缓存之前的options

      // let myChart: any = echarts.init(
      //   document.getElementById(elemId) as any,
      //   'themeBlueYellow',
      // );
      myChart.hideLoading();
      window.addEventListener('resize', function () {
        myChart.resize(); //自适应宽度
      });
      if (mouseEvents) {
        const { eventName, query, handler } = mouseEvents;
        myChart.off(eventName);
        myChart.on(eventName, query, handler);
      }
      if (seriseClick) {
        myChart.getZr().off('click');
        myChart.getZr().on('mousemove', function (params) {
          var pointInPixel = [params.offsetX, params.offsetY];
          if (myChart.containPixel('grid', pointInPixel)) {
            myChart.getZr().setCursorStyle('pointer');
          }
        });
        myChart.on('mouseout', function (params) {
          var pointInPixel = [params.offsetX, params.offsetY];
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
            // console.log(params);
            seriseClick(index);
          }
        });
      }
      //重绘
      myChart.resize();
      myChart.setOption(options || {}, true);

      if (backGraphClk) {
        myChart.setOption({
          graphic: [
            {
              type: 'text',
              left: 0,
              top: 10,
              style: {
                text: '回退',
                fontSize: 14,
              },
              onclick: backGraphClk,
            },
          ],
        });
      }
      if (!options.backgroundColor) {
        myChart.setOption({
          backgroundColor: backgroundColor,
        });
      }
    } else {
      myChart.resize(); //多次调用resize();
    }
    // setChartItem(myChart);
    return () => {
      window.removeEventListener('resize', () => {
        if (myChart) {
          myChart.resize();
        }
      });
    };
  }, [options, mouseEvents, backGraphClk, isFull]);

  const cardStyle: object = useMemo(() => {
    if (isFull) {
      return {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 998,
        width: '100%',
        height: '100%',
        backgroundColor: backgroundColor,
      };
    } else {
      return {
        width: '100%',
        height: height,
        backgroundColor: backgroundColor,
        boxShadow: needBoxShadow ? 'auto' : 'none',
      };
    }
  }, [isFull, height, needBoxShadow]);

  const handleRestore = () => {
    let myChart =
      echarts.getInstanceByDom(chartRef.current) ||
      echarts.init(chartRef.current, 'themeBlueYellow');
    if (restore) {
      console.log(restore);
      if (restore?.opts) {
        window.addEventListener('resize', function () {
          myChart.resize(); //自适应宽度
        });
        // if (mouseEvents) {
        //   const { eventName, query, handler } = mouseEvents;
        //   myChart.off(eventName);
        //   myChart.on(eventName, query, handler);
        // }
        // if (seriseClick) {
        //   myChart.getZr().off('click');
        //   myChart.getZr().on('mousemove', function(params) {
        //     var pointInPixel = [params.offsetX, params.offsetY];
        //     if (myChart.containPixel('grid', pointInPixel)) {
        //       myChart.getZr().setCursorStyle('pointer');
        //     }
        //   });
        //   myChart.on('mouseout', function(params) {
        //     var pointInPixel = [params.offsetX, params.offsetY];
        //     if (!myChart.containPixel('grid', pointInPixel)) {
        //       myChart.getZr().setCursorStyle('default');
        //     }
        //   });
        //   myChart.getZr().on('click', function(params) {
        //     const pointInPixel = [params.offsetX, params.offsetY];
        //     if (myChart.containPixel('grid', pointInPixel)) {
        //       let index = myChart.convertFromPixel(
        //         { seriesIndex: 0 },
        //         pointInPixel,
        //       )[0];
        //       seriseClick(index);
        //     }
        //   });
        // }
        //重绘
        myChart.resize();
        myChart.setOption(restore?.opts || {}, true);
        if (backGraphClk) {
          myChart.setOption({
            graphic: [
              {
                type: 'text',
                left: 0,
                top: 10,
                style: {
                  text: '回退',
                  fontSize: 14,
                },
                onclick: backGraphClk,
              },
            ],
          });
        }
      }
      if (restore?.clkFunc) {
        restore?.clkFunc();
      }
    } else {
      myChart.dispatchAction({
        type: 'restore',
      });
    }
  };

  return (
    <Fragment>
      <div
        id={'base_card'}
        className={noStyle ? styles.base_card : styles.design_card}
        style={cardStyle}
      >
        <div className={styles.flex_between} id={'echarts-card-title'}>
          <Space>
            <span className={styles.title}>{title}</span>
            {tip}
          </Space>
          <Space className={styles.space_8}>
            <section>{extra}</section>
            {backGraphClk && (
              <Tooltip title="还原">
                <ReloadOutlined
                  onClick={() => {
                    handleRestore();
                  }}
                  className={styles.cursor}
                />
              </Tooltip>
            )}
            {tabledata && (
              <Tooltip title="表格详情">
                <TableOutlined
                  onClick={() => {
                    setVisiable(!visiable);
                  }}
                  className={styles.cursor}
                />
              </Tooltip>
            )}
            <Tooltip title="全屏">
              {isFull ? (
                <FullscreenExitOutlined
                  onClick={() => {
                    setisFull(!isFull);
                  }}
                  className={styles.cursor}
                />
              ) : (
                <FullscreenOutlined
                  onClick={() => {
                    setisFull(!isFull);
                  }}
                  className={styles.cursor}
                />
              )}
            </Tooltip>
          </Space>
        </div>
        <div id={'echarts-card-body'} className={styles.flex_center}>
          <div ref={chartRef} id={elemId} className={styles.canvas}></div>
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
      </div>
      {tabledata && (
        <Modal
          getContainer={false}
          key={elemId}
          title={<span className={styles.title}>{title || '详情表格'}</span>}
          visible={visiable}
          onCancel={() => {
            setVisiable(!visiable);
          }}
          zIndex={999}
          width={'70%'}
          footer={false}
        >
          <UniProTable
            headerTitle={false}
            //   needSort={true}
            //   columnsSort={columnsSort}
            // columns={tabledata?.columns || null}
            needFilter={tabledata?.needFilter}
            columnsFilter={tabledata?.columnsFilter}
            uniColumns={tabledata?.uniColumns || []}
            dataSource={tabledata?.dataSource || []}
            scroll={{ x: 'max-content' }}
            // exportName={title}
            rowKey={rowKey}
            // needExport={true}
          ></UniProTable>
        </Modal>
      )}
    </Fragment>
  );
};

export default EchartsCard;
