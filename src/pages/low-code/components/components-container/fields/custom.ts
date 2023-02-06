import UniSelect from '@/components/select/UniSelect';
import DatePicker from '@/components/picker/datepicker';
import { FieldItem } from '@/pages/low-code/interfaces';
import UniTable from '@/components/table';
import { TablePropsEditor } from '@/pages/low-code/components/editor/props/dataSource';
import UniEcharts from '@/components/echarts';
import { v4 as uuidv4 } from 'uuid';
import { pieOption } from '@/pages/low-code/components/components-container/options/pie-option';
import { defaultColors } from '@/pages/low-code/constants';

const customFields: FieldItem[] = [
  {
    type: UniSelect,
    name: '筛选',
    props: {
      allowClear: true,
      getPopupContainer: (trigger) => {
        return document.body;
      },
    },
    // editor: [
    //   width,
    //   prefix,
    //   placeHolder,
    //   selectLabelKey,
    //   selectValueKey,
    //   dataSourceUrl,
    //   clear
    // ],
    position: {
      w: 6,
      h: 1,
    },
  },
  {
    type: DatePicker,
    name: '日期选择',
    props: {},
    position: {
      w: 3,
      h: 1,
      minW: 3,
      minH: 1,
    },
  },
  {
    type: DatePicker.RangePicker,
    name: '时间段选择',
    props: {},
    position: {
      w: 6,
      h: 1,
      minW: 6,
      minH: 1,
    },
  },

  {
    /**
     * needExport: false,
     * needSummary: false,
     * loading: cmiHospitalAnalysisLoading,
     * dataSource: dataSourceProcessor(cmiHospitalTableData),
     * dataItemType: 'CmiHospitalItem',
     * columns: CMI_HOSPITAL_TABLE_COLUMNS,
     */

    type: UniTable,
    name: '表格',
    card: {
      title: '表格',
      enable: true,
    },
    props: {
      bordered: true,
      rowKey: 'id',
      scroll: { x: 'max-content' },
      columns: [],
      showHeader: true,
      dataSource: [],
      pagination: {
        size: 'default',
        pageSize: 10,
        pageSizeOptions: ['10', '20'],
        hideOnSinglePage: false,
      },
    },
    editor: [
      {
        tabTitle: '属性',
        component: 'Table',
      },
    ],
    position: {
      w: 10,
      h: 10,
      minW: 4,
      minH: 10,
    },
  },

  /**
   * <UniEcharts
   *  elementId={'cmi-rw-scatter-echarts'}
   *  loading={cmiRegionAnalysisLoading}
   *  options={cmiRegionEchartsOptions}
   *  mouseEvents={{
   *    eventName: 'click',
   *    query: 'series',
   *    handler: (event) => {
   *      let regionCode = event.value[2];
   *      Emitter.emit(
   *        [
   *          EventConstant.CMI_SCATTER_CLICK,
   *          EventConstant.CMI_HOSPITAL_SELECT_CLICK,
   *        ],
   *        regionCode === cmiSelectedRegionCode ? '' : regionCode,
   *      );
   *    },
   *  }}
   * />
   */

  {
    type: UniEcharts,
    name: '饼图',
    props: {
      elementId: uuidv4(),
      loading: false,
      options: pieOption,
    },
    card: {
      title: '饼图',
      enable: false,
    },
    editor: [
      {
        tabTitle: '属性',
        component: 'EchartsPie',
      },
    ],
    position: {
      w: 10,
      h: 10,
      minW: 6,
      minH: 6,
    },
  },
];

export default customFields;
