import React, { Component } from 'react';
import { Breadcrumb, ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import AutoLogoutLayout from '@/layouts/AutoLogoutLayout';
import './index.less';
import MenuSider from '@/components/menu-sider/MenuSider';
import { Content, Footer } from 'antd/es/layout/layout';
import SiteHeader from '@/components/header/header';

class RootLayout extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <AutoLogoutLayout>
          <Layout className={'root-container'}>
            <MenuSider />
            <Layout className={'content-container'}>
              <SiteHeader />
              <Content className="site-layout-content">
                {/*{this.props.location.pathname !== '/index' && (*/}
                {/*    <Breadcrumb>{this.renderBreadcrumb()}</Breadcrumb>*/}
                {/*)}*/}

                {this.props.children}
              </Content>
              <Footer className="site-layout-footer">
                {this.props.systemInfo?.CopyRight}
              </Footer>
            </Layout>
          </Layout>
        </AutoLogoutLayout>
      </ConfigProvider>
    );
  }
}

export default RootLayout;
