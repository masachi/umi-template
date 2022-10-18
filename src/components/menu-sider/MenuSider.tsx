import Sider from 'antd/es/layout/Sider';
import React, { Component, useLayoutEffect, useState } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './index.less';
import { Menu } from 'antd';
import { MenuData, menuData } from '@/layouts/menuData';
import { useAccess, Link } from 'umi';

const { SubMenu } = Menu;

interface MenuSiderProps {}

const MenuSider = (props: MenuSiderProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const access = useAccess();

  const getCurrentOpenKeysByLocation = () => {
    let openedKeys: string[] = [];

    return openedKeys;
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
            <Link to={menuItem.route}>{menuItem.name}</Link>
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
        <a href="/dashboard/index" className="font-white">
          {collapsed ? '' : '测试用'}
        </a>
      </div>
      <Menu
        className="side-menu"
        mode="inline"
        inlineIndent={18}
        defaultOpenKeys={getCurrentOpenKeysByLocation()}
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