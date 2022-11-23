class Constants {
  static FAST_DATE_SELECT_CONSTANTS = {
    YEAR: 'YEAR',
    QUARTER: 'QUARTER',
    MONTH: 'MONTH',
    DAY: 'DAY',
  };

  static DateFormatType = {
    // 小写的表示后端定义的基本类型
    double: 'double',
    int32: 'int32',
    string: 'string',

    DateTime: 'DateTime',
    Date: 'Date',
    Month: 'Month',
    Decimal: 'Decimal',
    Currency: 'Currency',
    Percent: 'Percent',
    Permillage: 'Permillage',
    String: 'String',
    CurrencyWithoutSuffix: 'CurrencyWithoutSuffix',
  };

  static SegmentInputLabel = {
    INFINITY_LABEL: '最大',
  };
}

export default Constants;
