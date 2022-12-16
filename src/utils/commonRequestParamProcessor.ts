import { BasePageProps } from '@/interfaces';

export const commonRequestParamProcessor = (
  props: BasePageProps,
  excludes?: string[],
) => {
  let commonRequestParams = {};

  // 时间
  if (props.dateRange && props.dateRange.filter((item) => item)?.length === 2) {
    commonRequestParams['startDate'] = props.dateRange?.at(0);
    commonRequestParams['endDate'] = props.dateRange?.at(1);
  }

  if (excludes) {
    Object.keys(commonRequestParams).forEach((key) => {
      if (excludes.includes(key)) {
        delete commonRequestParams[key];
      }
    });
  }

  return commonRequestParams;
};
