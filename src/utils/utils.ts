import dayjs from 'dayjs';

export function valueFormatter(value, dataType = undefined, scale = 2) {
  switch (dataType) {
    case 'DateTime': {
      if (value === null || value === undefined) return value;
      return dayjs(value).format('YYYY年MM月DD日 HH:mm:ss');
    }

    case 'Date': {
      if (value === null || value === undefined) return value;
      return dayjs(value).format('YYYY年MM月DD日');
    }

    case 'MonthDate': {
      if (value === null || value === undefined) return value;
      return dayjs(value).format('YYYY年MM月');
    }

    case 'Decimal': {
      if (value === null || value === undefined) return value;
      return parseFloat((+value).toFixed(scale));
    }

    case 'Currency': {
      if (value === null || value === undefined) return value;
      if (Math.abs(value) >= 10000) {
        return (+value / 10000).toFixed(3) + '万';
      }
      return (+value).toFixed(scale);
    }

    case 'Percent': {
      if (value === null || value === undefined) return value;
      return (+value * 100).toFixed(scale) + '%';
    }

    case 'Permillage': {
      if (value === null || value === undefined) return value;
      return (+value * 1000).toFixed(scale) + '‰';
    }
    case 'String':
      return value;
    case 'CurrencyWithoutSuffix': {
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

export function valueNullOrUndefinedReturnDash(value?: any, dataType?: string) {
  if (value === null || value === undefined) {
    return '-';
  }

  if (dataType) {
    return valueFormatter(value, dataType);
  }

  return value;
}
