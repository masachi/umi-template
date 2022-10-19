import { defineConfig } from 'umi';
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';
import dayjs from 'dayjs';
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({
  size: require('os').cpus().length,
});

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  ignoreMomentLocale: true,
  chainWebpack(config: any) {
    // 添加额外插件
    config.plugin('moment2dayjs').use(AntdDayjsWebpackPlugin);
    config.plugin('HappyPack').use(HappyPack, [
      {
        id: 'js',
        loaders: ['babel-loader'],
        threadPool: happyThreadPool,
      },
    ]);
  },
  title: '测试用平台',
  // better xlsx 不兼容 mfsu
  // mfsu: {},
  fastRefresh: {},
  dva: { immer: true, hmr: true, skipModelValidate: true },
  // TODO locale
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  outputPath: 'dist', // build打包生成product时候输出的目录
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/', // public文件打包的时候的前缀
  define: {
    'process.env.REQUEST_PREFIX': '',
  },
  lessLoader: {
    // golbalVars: {
    //   'root-entry-name': 'default'
    // }
    modifyVars: {
      'root-entry-name': 'default',
    },
  },
  terserOptions: {
    compress: {
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ['console.log', 'console.table'],
    },
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'import-lodash',
    ],
    [
      'import',
      { libraryName: '@umijs/hooks', camel2DashComponentName: false },
      'import-@umijs/hooks',
    ],
    [
      'import',
      {
        libraryName: '@ant-design/icons',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'import-@ant-design/icons',
    ],
  ],
  devServer: {
    port: 8001,
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          exact: true,
          path: '/table',
          component: '@/pages/table/index',
          wrappers: ['@/layouts/base-layout'],
          headers: [
            {
              componentName: 'Select',
              props: {
                dataKey: 'simulate-select',
              },
            },
            {
              componentName: 'DatePicker',
              props: {
                dataKey: 'simulate-datepicker',
                dataType: 'month',
              },
            },
            {
              componentName: 'RangePicker',
              props: {
                dataKey: 'simulate-rangepicker',
                dataType: 'quarter',
              },
            },
          ],
        },
      ],
    },
  ],
});
