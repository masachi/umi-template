import React, { Component } from 'react';
import { Breadcrumb, ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import AutoLogoutLayout from '@/layouts/AutoLogoutLayout';
import './index.less';
import MenuSider from '@/components/menu-sider/MenuSider';
import { Content, Footer } from 'antd/es/layout/layout';
import SiteHeader from '@/components/header/header';
import { ErrorBoundary } from 'react-error-boundary';
import { Link, useLocation } from 'umi';
import { getBreadcrumbFromMenuData } from '@/layouts/menuData';

class RootLayout extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  renderBreadcrumb = () => {
    return getBreadcrumbFromMenuData(this.props.location.pathname).map(
      (crumbItem, index) => {
        return (
          <Breadcrumb.Item key={crumbItem?.url}>
            {crumbItem?.url ? (
              <Link to={crumbItem?.url}>{crumbItem?.name}</Link>
            ) : (
              <span>{crumbItem?.name}</span>
            )}
          </Breadcrumb.Item>
        );
      },
    );
  };

  renderErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
      <div role="alert">
        <p>出错了:</p>
        <pre>{error.message}</pre>
        <pre>{error.stack}</pre>
      </div>
    );
  };

  render() {
    return (
      <ErrorBoundary FallbackComponent={this.renderErrorFallback}>
        <ConfigProvider locale={zhCN}>
          <AutoLogoutLayout>
            <Layout className={'root-container'}>
              <MenuSider />
              <Layout className={'content-container'}>
                <SiteHeader />
                <Content className="site-layout-content">
                  {this.props.location.pathname !== '/index' && (
                    <Breadcrumb>{this.renderBreadcrumb()}</Breadcrumb>
                  )}

                  {this.props.children}
                </Content>
                <Footer className="site-layout-footer">
                  {this.props.systemInfo?.CopyRight}
                </Footer>
              </Layout>
            </Layout>
          </AutoLogoutLayout>
        </ConfigProvider>
      </ErrorBoundary>
    );
  }
}

export default RootLayout;
