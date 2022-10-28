// 非oidc时的login
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, useModel, history, Dispatch } from 'umi';
import { Button, Form, Tabs, Input, message } from 'antd';
import { UserOutlined, UserAddOutlined, LockOutlined } from '@ant-design/icons';
import './login.less';
import { login } from '@/services/userService';

const Login = (props: any) => {
  const { initialState, setInitialState, refresh }: any =
    useModel('@@initialState');

  const [loading, setLoading] = useState(false);

  const handleOnFinish = async (values: any) => {
    let response = await login({
      mobile: (values && values.username) || 'demo',
      password: (values && values.password) || 'Qq121212',
    });

    if (response?.data) {
      localStorage.setItem('uni-connect-token', response?.data);
      history.push('/');
    }
  };

  return (
    <div className="login_bg">
      <div className="login_modal bg-pan-left">
        <div className="login_form">
          <h2 className="tracking-in-expand">
            {initialState?.SystemInfo?.Name || '测试用平台'}
          </h2>
          <Form
            name="normal_login"
            // form={form}
            onFinish={handleOnFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your Username!' },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="login-form-button"
                htmlType="submit"
                type="primary"
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
