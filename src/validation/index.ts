import { ParameterValidateError } from '@/exception/error';

const validationKeyItems = {
  Sdate: {
    message: '请输入开始日期',
    validate: (param) => {
      return !!param;
    },
  },
  Edate: {
    message: '请输入结束日期',
    validate: (param) => {
      return !!param;
    },
  },
};

export const parameterValidator = (
  params?: object,
  validationKeys?: string[] | undefined,
) => {
  if (params) {
    if (validationKeys && validationKeys.length > 0) {
      for (let validationKey of validationKeys) {
        if (validationKeyItems[validationKey]) {
          if (
            !validationKeyItems[validationKey].validate(params[validationKey])
          ) {
            throw new ParameterValidateError(
              validationKeyItems[validationKey].message,
              validationKey,
            );
          }
        }
      }
    }
  }

  return true;
};
