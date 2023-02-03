import UniSelect from '@/components/select/UniSelect';
import DatePicker from '@/components/picker/datepicker';
import { FieldItem } from '@/pages/low-code/interfaces';
import UniTable from '@/components/table';
import { TablePropsEditor } from '@/pages/low-code/components/editor/props/dataSource';

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
    cardTitle: '表格',
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
    editor: 'Table',
    position: {
      w: 10,
      h: 10,
      minW: 4,
      minH: 10,
    },
  },
];

export default customFields;