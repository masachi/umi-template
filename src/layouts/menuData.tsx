import React from 'react';
import { MenuData } from '../../packages/menu-sider/src/MenuSider';

/**
 * 此处请严格遵守内层的route路由path 从外层路由pathname扩展
 * breadcrumb根据路由name 以及层级关系渲染
 */
export const menuData: MenuData[] = [
  {
    route: '/table',
    name: '测试用table',
    children: [
      {
        route: '/table/2',
        name: '测试用table2',
        children: [
          {
            route: '/table/2/3',
            name: '测试用table3',
          },
        ],
      },
    ],
  },
];

export const getBreadcrumbFromMenuData = (path: string) => {
  let crumbLabels = [];
  let filterMenuData = menuData.slice();
  const pathItems = path.split('/').filter((i) => i);
  pathItems.forEach((_, index) => {
    let crumbItem = getUrlNameFromMenuDataItemsByPathItem(
      `/${pathItems.slice(0, index + 1)?.join('/')}`,
      filterMenuData,
    );
    if (crumbItem) {
      // push label
      crumbLabels.push({
        url: crumbItem.children ? '' : crumbItem.route, // 此处有children认为是menu的中间层 即为展开层 不能点击
        name: crumbItem.name,
      });

      if (crumbItem.children) {
        filterMenuData = crumbItem.children.slice();
      }
    }
  });

  return crumbLabels;
};

const getUrlNameFromMenuDataItemsByPathItem = (
  pathItem: string,
  menuData: MenuData[],
) => {
  return menuData.find((item) => item.route === pathItem);
};
