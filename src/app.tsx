import { message } from 'antd';
import { history } from 'umi';

export async function getInitialState() {
  return {};
}

export function onRouteChange({ location, routes, action }) {
  // TODO  埋点
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
    if (error.data?.error_description === 'invalid_username_or_password') {
      message.error('账号或密码错误');
    }
    if (error?.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('expireItem');
      message.warning('您尚未登录或登录已过期，请先登录');
      history.push('/login');
    }

    if (error?.response.code !== 0 && error?.response?.message) {
      message.error(error?.response?.message);
    }

    return {
      code: error?.response?.code,
      message: error?.response?.message,
      requestUrl: error?.request?.url,
    };
  },

  requestInterceptors: [
    async (url, options: any) => {
      const { headers, responseType, method } = options;
      let addHeaders: any = {
        res_encrypt: false,
        req_encrypt: false,
      };
      let cacheOption = {
        useCache: true, // 启用缓存
        // ttl: 0, // 让缓存永久存在，可以自行修改时间
      };

      let token = localStorage.getItem('uni-connect-token')
        ? JSON.parse(localStorage.getItem('uni-connect-token') as any)[
            'access_token'
          ]
        : null;
      if (token) {
        // addHeaders['Authorization'] = `Bearer ${token}`;
        addHeaders['token'] = `${token}`;
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
      let responseBody = await response.json();
      if (responseBody?.code !== 0) {
        message.error(responseBody?.message);
        return responseBody;
      }

      return responseBody;
    },
  ],
};
