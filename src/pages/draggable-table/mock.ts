import { IGridItem } from '@/pages/draggable-table/interfaces';
import {
  DRG_TABLE_COLUMN,
  FIELD_ADD_TABLE_COLUMN,
  SURGERY_TABLE_COLUMN,
} from '@/pages/draggable-table/constants';
import { v4 as uuidv4 } from 'uuid';

export const mockData: IGridItem[][] = [
  [
    {
      data: {
        prefix: '清单流水号',
        key: 'qdlsh',
        desc: '清单流水号',
        suffix: '',
        component: 'Input',
      },
      x: 18,
      w: 6,
    },
  ],
  [
    {
      data: {
        prefix: '定点医疗机构名称',
        key: 'username',
        desc: '定点医疗机构名称',
        suffix: '',
      },
      x: 0,
      w: 6,
    },
    {
      data: {
        prefix: '定点医疗机构代码',
        key: 'usercode',
        desc: '定点医疗机构代码',
        suffix: '',
      },
      x: 6,
      w: 6,
    },
    {
      data: {
        prefix: '医保结算等级',
        key: 'ybjsdj',
        desc: '医保结算等级',
        suffix: '',
      },
      x: 18,
      w: 6,
    },
  ],
  [
    {
      data: {
        prefix: '医保编号',
        key: 'ybbh',
        desc: '医保编号',
        suffix: '',
      },
      x: 0,
      w: 6,
    },
    {
      data: {
        prefix: '病案号',
        key: 'bah',
        desc: '病案号',
        suffix: '',
      },
      x: 6,
      w: 6,
    },
    {
      data: {
        prefix: '申报时间',
        key: 'sbsj',
        desc: '申报时间',
        suffix: '',
      },
      x: 14,
      w: 6,
    },
  ],
  [
    {
      data: {
        prefix: '姓名',
        key: 'xm',
        desc: '姓名',
        suffix: '',
      },
      x: 0,
      w: 5,
    },
    {
      data: {
        prefix: '性别',
        key: 'xb',
        desc: '性别',
        suffix: '1.男 2.女',
        component: 'Input',
        props: {
          style: {
            maxWidth: 100,
          },
          className: '',
          postValueProcessor: (value) => {
            if (value.toString() === '1') {
              return '男';
            } else if (value.toString() === '2') {
              return '女';
            } else {
              return value;
            }
          },
        },
      },
      x: 5,
      w: 4,
    },
    {
      data: {
        prefix: '出生日期',
        key: 'csrq',
        desc: '出生日期',
        suffix: '',
        component: 'DatePicker',
        props: {
          style: {
            width: '100%',
          },
          className: 'border-none',
        },
      },
      x: 9,
      w: 4,
    },
    {
      data: {
        prefix: '年龄',
        key: 'nl',
        desc: '年龄（岁）',
        suffix: '岁',
        component: 'InputNumber',
        props: {
          style: {
            width: '100%',
          },
          min: 1,
          max: 200,
          className: 'border-none',
        },
      },
      x: 13,
      w: 4,
    },
    {
      data: {
        prefix: '国籍',
        key: 'gj',
        desc: '国籍',
        suffix: '',
      },
      x: 17,
      w: 7,
    },
  ],
  [
    {
      data: {
        prefix: '（年龄不足1周岁）年龄',
        key: 'bzyzs_nl',
        desc: '（年龄不足1周岁）年龄（天）',
        suffix: '天',
      },
      x: 0,
      w: 6,
    },
    {
      data: {
        prefix: '民族',
        key: 'mz',
        desc: '民族',
        suffix: '',
      },
      x: 6,
      w: 4,
    },
    {
      data: {
        prefix: '患者证件类别',
        key: 'hzzjlb',
        desc: '患者证件类别',
        suffix: '',
      },
      x: 10,
      w: 6,
    },
    {
      data: {
        prefix: '患者证件号码',
        key: 'hzzjhm',
        desc: '患者证件号码',
        suffix: '',
      },
      x: 16,
      w: 8,
    },
  ],
  [
    {
      data: {
        key: 'drg-table',
        component: 'Table',
        props: {
          id: 'drg-table',
          className: '',
          rowKey: 'id',
          bordered: true,
          columns: DRG_TABLE_COLUMN,
          pagination: false,
        },
      },
      x: 0,
      h: 4,
      w: 12,
    },
    {
      data: {
        key: 'surgery-table',
        component: 'Table',
        props: {
          id: 'surgery-table',
          className: '',
          rowKey: 'id',
          bordered: true,
          columns: SURGERY_TABLE_COLUMN,
          pagination: false,
        },
      },
      x: 12,
      h: 4,
      w: 12,
    },
  ],
  [
    {
      data: {
        prefix: '时间',
        key: 'time',
        desc: '',
        suffix: '',
      },
      x: 0,
      w: 6,
    },
  ],
  [
    {
      data: {
        prefix: '现住址',
        key: 'address',
        desc: '',
        suffix: '',
        component: 'ProvinceSeparateSelector',
      },
      x: 0,
      w: 24,
    },
  ],
  // {
  //   prefix: "职业",
  //   key: "zy",
  //   desc: "职业",
  //   suffix: ""
  // },
  // {
  //   prefix: "现住址",
  //   key: "xzz",
  //   desc: "现住址",
  //   suffix: ""
  // },
  // {
  //   prefix: "工作单位及地址",
  //   key: "gzdwdz",
  //   desc: "工作单位地址",
  //   suffix: ""
  // },
  // {
  //   prefix: "单位电话",
  //   key: "dwdh",
  //   desc: "单位电话",
  //   suffix: ""
  // },
  // {
  //   prefix: "邮编",
  //   key: "gzdwyb",
  //   desc: "工作单位邮编",
  //   suffix: ""
  // },
  // {
  //   prefix: "联系人姓名",
  //   key: "lxrxm",
  //   desc: "联系人姓名",
  //   suffix: ""
  // },
  // {
  //   prefix: "关系",
  //   key: "lxryhzgx",
  //   desc: "联系人与患者关系",
  //   suffix: ""
  // },
  // {
  //   prefix: "地址",
  //   key: "lxrdz",
  //   desc: "联系人地址",
  //   suffix: ""
  // },
  // {
  //   prefix: "电话",
  //   key: "lxrdh",
  //   desc: "联系人电话",
  //   suffix: ""
  // },
  // {
  //   prefix: "医保类型",
  //   key: "yblx",
  //   desc: "医保类型",
  //   suffix: ""
  // },
  // {
  //   prefix: "特殊人员类型",
  //   key: "tsrylx",
  //   desc: "特殊人员类型",
  //   suffix: ""
  // },
  // {
  //   prefix: "参保地",
  //   key: "cbd",
  //   desc: "参保地",
  //   suffix: ""
  // },
  // {
  //   prefix: "新生儿入院类型",
  //   key: "xserylx",
  //   desc: "新生儿入院类型",
  //   suffix: ""
  // },
  // {
  //   prefix: "新生儿出生体重",
  //   key: "xsrcstz",
  //   desc: "新生儿出生体重（g）",
  //   suffix: "克"
  // },
  // {
  //   prefix: "新生儿入院体重",
  //   key: "xsrrytz",
  //   desc: "新生儿入院体重（g）",
  //   suffix: "克"
  // },
  // {
  //   prefix: "诊断科别",
  //   key: "zdkb",
  //   desc: "诊断科别",
  //   suffix: ""
  // },
  // {
  //   prefix: "就诊日期",
  //   key: "jzrq",
  //   desc: "就诊日期",
  //   suffix: ""
  // },
  //
  // {
  //   prefix: "住院医疗类型",
  //   key: "zyyllx",
  //   desc: "住院医疗类型",
  //   suffix: "1.住院 2.日间手术"
  // },
  // {
  //   prefix: "入院途径",
  //   key: "rytj",
  //   desc: "入院途径",
  //   suffix: "1.急诊 2.门诊 3.其他医疗机构转入 9.其他"
  // },
  // {
  //   prefix: "治疗类别",
  //   key: "zllb",
  //   desc: "治疗类别",
  //   suffix: "1.西医 2.1 中医 2.2 民族医 3.中西医"
  // },
  // {
  //   prefix: "入院时间",
  //   key: "rysj",
  //   desc: "入院时间",
  //   suffix: ""
  // },
  // {
  //   prefix: "入院科别",
  //   key: "rykb",
  //   desc: "入院科别",
  //   suffix: ""
  // },
  // {
  //   prefix: "转科科别",
  //   key: "zkkb",
  //   desc: "转科科别",
  //   suffix: ""
  // },
  // {
  //   prefix: "出院时间",
  //   key: "cysj",
  //   desc: "出院时间",
  //   suffix: ""
  // },
  // {
  //   prefix: "出院科别",
  //   key: "cykb",
  //   desc: "出院科别",
  //   suffix: ""
  // },
  // {
  //   prefix: "实际住院",
  //   key: "sjzyts",
  //   desc: "实际住院(天)",
  //   suffix: "天"
  // },
  // {
  //   prefix: "出院科室(院内)",
  //   key: "cyks_yn",
  //   desc: "",
  //   suffix: ""
  // },
  // {
  //   prefix: "门(急)诊诊断(中医诊断)",
  //   key: "mzd_zyzd",
  //   desc: "门(急)诊诊断(中医诊断)",
  //   suffix: ""
  // },
  // {
  //   prefix: "疾病代码",
  //   key: "jbdm",
  //   desc: "疾病代码",
  //   suffix: ""
  // },
  // {
  //   prefix: "门(急)诊诊断(西医诊断)",
  //   key: "mzzd_xyzd",
  //   desc: "门(急)诊诊断(西医诊断)",
  //   suffix: ""
  // },
  // {
  //   prefix: "疾病编码",
  //   key: "jbbm",
  //   desc: "疾病编码",
  //   suffix: ""
  // },
  //
  // {
  //   prefix: "诊断代码计数",
  //   key: "zddmjs",
  //   desc: "诊断代码计数",
  //   suffix: ""
  // },
  //
  // {
  //   prefix: "手术及操作代码计数",
  //   key: "ssjczdmjs",
  //   desc: "手术及操作代码计数",
  //   suffix: ""
  // },
  // {
  //   prefix: "呼吸机使用时间",
  //   key: "hxjsysj_t",
  //   desc: "呼吸机使用时间（天）",
  //   suffix: "天"
  // },
  // {
  //   prefix: "",
  //   key: "hxjsysj_xs",
  //   desc: "呼吸机使用时间（小时）",
  //   suffix: "小时"
  // },
  // {
  //   prefix: "",
  //   key: "hxjsysj_f",
  //   desc: "呼吸机使用时间（分钟）",
  //   suffix: "分钟"
  // },
  // {
  //   prefix: "颅脑损伤患者入院前昏迷时间：入院前",
  //   key: "lnsshzhmsjryq_t",
  //   desc: "颅脑损伤患者昏迷时间（天）（入院前）",
  //   suffix: "天"
  // },
  // {
  //   prefix: "",
  //   key: "lnsshzhmsjryq_xs",
  //   desc: "颅脑损伤患者昏迷时间（小时）（入院前）",
  //   suffix: "小时"
  // },
  // {
  //   prefix: "",
  //   key: "lnsshzhmsjryq_f",
  //   desc: "颅脑损伤患者昏迷时间（分钟）（入院前）",
  //   suffix: "分钟"
  // },
  // {
  //   prefix: "入院后",
  //   key: "lnsshzhmsjryh_t",
  //   desc: "颅脑损伤患者昏迷时间（天）（入院后）",
  //   suffix: "天"
  // },
  // {
  //   prefix: "",
  //   key: "lnsshzhmsjryh_xs",
  //   desc: "颅脑损伤患者昏迷时间（小时）（入院后）",
  //   suffix: "小时"
  // },
  // {
  //   prefix: "",
  //   key: "lnsshzhmsjryh_f",
  //   desc: "颅脑损伤患者昏迷时间（分钟）（入院后）",
  //   suffix: "分钟"
  // },
  //
  //
  // {
  //   prefix: "特级护理天数",
  //   key: "tjhlts",
  //   desc: "特级护理天数",
  //   suffix: ""
  // },
  // {
  //   prefix: "一级护理天数",
  //   key: "yjhlts",
  //   desc: "一级护理天数",
  //   suffix: ""
  // },
  // {
  //   prefix: "二级护理天数",
  //   key: "ejhlts",
  //   desc: "二级护理天数",
  //   suffix: ""
  // },
  // {
  //   prefix: "三级护理天数",
  //   key: "sjhlts",
  //   desc: "三级护理天数",
  //   suffix: ""
  // },
  // {
  //   prefix: "离院方式",
  //   key: "lyfs",
  //   desc: "离院方式",
  //   suffix: ""
  // },
  // {
  //   prefix: "1.医嘱离院  2.医嘱转院，拟接收机构名称",
  //   key: "njsjgmc",
  //   desc: "医嘱转院接收机构",
  //   suffix: ""
  // },
  // {
  //   prefix: "拟接收机构代码",
  //   key: "njsjgdm",
  //   desc: "",
  //   suffix: ""
  // },
  // {
  //   prefix: "3.医嘱转社区卫生服务机构/乡镇卫生院,拟接收机构名称",
  //   key: "njsjgmc_wsy",
  //   desc: "医嘱转社区接收机构",
  //   suffix: ""
  // },
  // {
  //   prefix: "拟接收机构代码",
  //   key: "njsjgdm_wsy",
  //   desc: "拟接收机构代码卫生院",
  //   suffix: "4.非医嘱离院 5.死亡 9.其他"
  // },
  // {
  //   prefix: "是否有31天内再住院计划",
  //   key: "zzyjh",
  //   desc: "是否有31天内再住院计划",
  //   suffix: "1.无 2.有"
  // },
  // {
  //   prefix: "目的",
  //   key: "md",
  //   desc: "目的",
  //   suffix: ""
  // },
  // {
  //   prefix: "责任护士",
  //   key: "zrhs",
  //   desc: "",
  //   suffix: ""
  // },
  // {
  //   prefix: "责任护士代码",
  //   key: "zrhsdm",
  //   desc: "",
  //   suffix: ""
  // },
  // {
  //   prefix: "主诊医师名称",
  //   key: "zzysmc",
  //   desc: "主诊医师名称",
  //   suffix: ""
  // },
  // {
  //   prefix: "主诊医师代码",
  //   key: "zzysdm",
  //   desc: "主诊医师代码",
  //   suffix: ""
  // },
  // {
  //   prefix: "业务流水号",
  //   key: "ywlsh",
  //   desc: "业务流水号",
  //   suffix: ""
  // },
  // {
  //   prefix: "票据代码",
  //   key: "pjdm",
  //   desc: "票据代码",
  //   suffix: ""
  // },
  // {
  //   prefix: "票据号码",
  //   key: "pjhm",
  //   desc: "票据号码",
  //   suffix: ""
  // },
  // {
  //   prefix: "结算时间",
  //   key: "jssj_stdate",
  //   desc: "结算时间",
  //   suffix: " --"
  // }
];
