import { request } from 'umi';

const loginDomain = 'http://127.0.0.1:23333';

export const basePayload = {
  method: 'POST',
};

export const login = (userPayload: any) => {
  let payload = {
    ...basePayload,
    data: {
      body: {
        ...userPayload,
      },
    },
  };
  return request(`${loginDomain}/spring-template/user/v1.0/login`, payload);
};
