import React, { useState, useRef } from 'react';
import { useLocation, history } from 'umi';
import {
  Layout,
  Menu,
  notification,
  Dropdown,
  Badge,
  Space,
  Button,
  message,
  List,
} from 'antd';
import {
  UserOutlined,
  NotificationOutlined,
  UnlockOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './index.less';

const { Header } = Layout;

const colorSet = (type: string) => {
  switch (type) {
    case '0':
    default:
      return '#7495f7';
    case '2':
      return '#48d12b';
    case '3':
      return '#f7b072';
    case '4':
      return '#ff3232';
  }
};

interface SiteHeaderProps {}

const SiteHeader = (props: SiteHeaderProps) => {
  const avatarMenu = (
    <Menu>
      <Menu.Item onClick={() => {}} key="changePassword">
        <span>
          <UnlockOutlined />
          修改密码
        </span>
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => {}}>
        <span>
          <LogoutOutlined /> 退出登录
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-header">
      <div className="header-right">
        <Space size="middle">
          <Button
            icon={<ExclamationCircleOutlined />}
            onClick={() => {
              // TODO 浏览器地址 修改
              // window.open('http://192.192.12.85:5005/ChromeSetup64.exe');
            }}
          >
            下载新版浏览器
          </Button>
          <Dropdown overlay={avatarMenu} trigger={['click']}>
            <UserOutlined />
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
};

export default SiteHeader;
