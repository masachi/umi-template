import Sider from 'antd/es/layout/Sider';
import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './index.less';
import { Menu } from 'antd';
import { useAccess, Link, Location, useLocation } from 'umi';

import logo from '@/assets/logo.png';
import { menuData, MenuData } from '@/layouts/menuData';

const { SubMenu } = Menu;
const qs = require('qs');

interface MenuSiderProps {
  bizRoutes?: any[];
}

const MenuSider = (props: MenuSiderProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const access = useAccess();

  const location: Location = useLocation();

  const getCurrentOpenKeysByLocation = () => {
    let openedKeys: string[] = [];

    // FIXME: pathname 对应 打开的 menu
    if (location?.pathname) {
      if (location?.pathname?.startsWith('')) {
        openedKeys.push('');
      } else {
        openedKeys.push('');
      }
    }

    return openedKeys;
  };

  const getCurrentSelectedKeysByLocation = () => {
    let openedKeys: string[] = [];

    if (location?.pathname) {
      openedKeys.push(location?.pathname);
    }

    return openedKeys;
  };

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, []);

  const onWindowResize = () => {
    setCollapsed(window?.innerWidth < 1280);
  };

  const buildRouteWithQuery = (route: string, query?: object) => {
    if (query) {
      return `${route}?${qs.stringify(query)}`;
    }

    return route;
  };

  const renderMenu = (menuData: MenuData[]) => {
    return menuData.map((menuItem) => {
      if (access[menuItem.route] && menuItem.children) {
        return (
          <SubMenu
            key={menuItem.route}
            title={menuItem.name}
            icon={menuItem.icon}
          >
            {renderMenu(menuItem.children)}
          </SubMenu>
        );
      } else {
        return access[menuItem.route] ? (
          <Menu.Item key={menuItem.route} icon={menuItem.icon && menuItem.icon}>
            <Link to={buildRouteWithQuery(menuItem.route, menuItem.query)}>
              {menuItem.name}
            </Link>
          </Menu.Item>
        ) : (
          <></>
        );
      }
    });
  };

  return (
    <Sider
      className={'menu-container'}
      theme={'light'}
      collapsible
      collapsedWidth={80}
      breakpoint="lg"
      collapsed={collapsed}
      onBreakpoint={(broken) => {
        setCollapsed(broken && !collapsed);
      }}
      onCollapse={(collapsed, type) => {
        if (type === 'clickTrigger') {
          setCollapsed(collapsed);
        }
      }}
      trigger={
        collapsed ? (
          <MenuUnfoldOutlined />
        ) : (
          <MenuFoldOutlined style={{ float: 'right', padding: '17px 15px' }} />
        )
      }
    >
      <div className="sider-logo">
        {/*FIXME: logo*/}
        <a href="/dashboard/index" className="font-white">
          {collapsed ? '' : '测试用'}
        </a>
      </div>
      <Menu
        className="side-menu"
        mode="inline"
        inlineIndent={18}
        defaultOpenKeys={getCurrentOpenKeysByLocation()}
        defaultSelectedKeys={getCurrentSelectedKeysByLocation()}
        onClick={({ domEvent }) => {
          // domEvent.stopPropagation();
        }}
        onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => {}}
        // selectedKeys={[]}
      >
        {renderMenu(menuData)}
      </Menu>
    </Sider>
  );
};

export default MenuSider;
