import { message } from 'antd';
import { history } from 'umi';
import jwt_decode from 'jwt-decode';
import { RespVO } from '@/interfaces';
import { ParameterValidateError } from '@/exception/error';
import { parameterValidator } from '@/validation';

message.config({
  maxCount: 1,
});

const UrlValidationPatternItems = {};

export async function getInitialState() {
  let accessToken = localStorage.getItem('token');
  let userBaseInfo = {};
  let userInfo = {};
  if (accessToken) {
    userBaseInfo = jwt_decode(accessToken);

    userInfo = await getUserProfile();
  }

  return {
    token: accessToken,
    userBaseInfo: userBaseInfo,
    userInfo: userInfo,
  };
}

const getUserProfile = async () => {
  let response: RespVO<any> = await getUserInfo();

  if (response?.code === 0) {
    if (response?.statusCode === 200) {
      return response?.data;
    }
  }

  return {};
};

export function onRouteChange({ location, routes, action }) {
  // TODO  埋点
}

export function patchRoutes({ routes }) {
  console.error('routes', routes);

  // TODO 根据后端的userInfo数据来做路由 权限
  // let bizRoutes = routes[2];
  //
  // let deleteRouteIndex = bizRoutes?.routes?.findIndex((item) => item.path === '/medical/quality')
  //
  // bizRoutes?.routes?.splice(deleteRouteIndex, 1);
  //
  // console.error("modified routes", routes);
}

export const dva = {
  config: {
    initialState: {},
    onError(e: any) {
      console.log(e);
      e.preventDefault();
    },
  },
};

export const request: any = {
  errorHandler: (error: any) => {
    // 异常信息统一处理
    if (error?.type === 'AbortError') return 'Abort';

    if (error?.type === 'SyntaxError') {
      localStorage.removeItem('token');
      localStorage.removeItem('expireItem');
      message.warning('登录已过期，请先登录');
      return {
        code: 1,
        statusCode: 500,
      };
    }

    // param validation error
    if (error?.name === 'ParameterValidateError') {
      message.error(error?.message);
      return {
        code: 1,
        statusCode: 417, // 表示可预计到的错误
      };
    }

    if (error.data?.error_description === 'invalid_username_or_password') {
      message.error('账号或密码错误');
      return {
        code: 1,
      };
    }
    if (error?.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('expireItem');
      message.warning('您尚未登录或登录已过期，请先登录');
      history.push('/login');
      return {
        code: 1,
        statusCode: error?.response?.status,
      };
    }

    if (error?.response?.status === 400) {
      localStorage.removeItem('token');
      localStorage.removeItem('expireItem');
      message.warning('用户名或者密码错误，请重新输入');
      return {
        code: 1,
        statusCode: error?.response?.status,
      };
    }

    if (error?.response?.code !== 0 && error?.response?.message) {
      message.error(error?.response?.message);
      return {
        code: 1,
        statusCode: error?.response?.status,
      };
    }

    message.error('未知错误，请稍后重试');
    return {
      code: 1,
      statusCode: error?.response?.status,
      message: error?.response?.message,
      requestUrl: error?.request?.url,
    };
  },

  requestInterceptors: [
    async (url, options: any) => {
      const { headers, responseType, method } = options;

      url = url.replaceAll('//', '/');

      let addHeaders: any = {};
      let cacheOption = {
        useCache: true, // 启用缓存
        // ttl: 0, // 让缓存永久存在，可以自行修改时间
      };

      let token = localStorage.getItem('token')
        ? localStorage.getItem('token')
        : null;
      if (token) {
        addHeaders['Authorization'] = `Bearer ${token}`;
      }

      let needValidationUrl = Object.entries(UrlValidationPatternItems).find(
        ([key, value]) => {
          return new RegExp(key).test(url);
        },
      );

      if (needValidationUrl) {
        parameterValidator(
          method.toUpperCase() === 'GET' ? options.params : options.data,
          needValidationUrl[1],
        );
      }

      return {
        url: url,
        options: {
          ...options,
          ...cacheOption,
          headers: {
            ...headers,
            ...addHeaders,
          },
          getResponse: !!(url.includes('Export') || responseType === 'blob'),
        },
      };
    },
  ],
  responseInterceptors: [
    async (response) => {
      if (response?.status === 200) {
        let responseBody = await response?.json();
        return {
          code: 0,
          statusCode: response?.status,
          data: responseBody,
        };
      }

      return response;
    },
  ],
};
