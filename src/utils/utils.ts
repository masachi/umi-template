import dayjs from 'dayjs';
import Constants from '@/constants';

export function valueFormatter(value, dataType = undefined, scale = 2) {
  switch (dataType) {
    case Constants.DateFormatType.double: {
      if (value === null || value === undefined) return value;
      return parseFloat((+value).toFixed(scale));
    }
    case Constants.DateFormatType.int32:
      return value;
    case Constants.DateFormatType.string:
      return value;

    case Constants.DateFormatType.DateTime: {
      if (value === null || value === undefined) return value;
      return dayjs(value).format('YYYY年MM月DD日 HH:mm:ss');
    }

    case Constants.DateFormatType.Date: {
      if (value === null || value === undefined) return value;
      return dayjs(value).format('YYYY年MM月DD日');
    }

    case Constants.DateFormatType.Month: {
      if (value === null || value === undefined) return value;
      return dayjs(value).format('YYYY年MM月');
    }

    case Constants.DateFormatType.Decimal: {
      if (value === null || value === undefined) return value;
      return parseFloat((+value).toFixed(scale));
    }

    case Constants.DateFormatType.Currency: {
      if (value === null || value === undefined) return value;
      if (Math.abs(value) >= 10000) {
        return (+value / 10000).toFixed(3) + '万';
      }
      return (+value).toFixed(scale);
    }

    case Constants.DateFormatType.Percent: {
      if (value === null || value === undefined) return value;
      return (+value * 100).toFixed(scale) + '%';
    }

    case Constants.DateFormatType.Permillage: {
      if (value === null || value === undefined) return value;
      return (+value * 1000).toFixed(scale) + '‰';
    }
    case Constants.DateFormatType.String:
      return value;
    case Constants.DateFormatType.CurrencyWithoutSuffix: {
      if (value === null || value === undefined) return value;
      if (Math.abs(value) >= 10000) {
        return (+value / 10000).toFixed(3);
      }
      return (+value).toFixed(scale);
    }
    default:
      return value;
  }
}

export function valueNullOrUndefinedReturnDash(
  value?: any,
  dataType?: string,
  dataScale?: number,
) {
  if (value === null || value === undefined) {
    return '-';
  }

  if (dataType) {
    return valueFormatter(value, dataType, dataScale);
  }

  return value;
}
