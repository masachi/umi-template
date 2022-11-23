import React from 'react';
import { ReactComponent as IconMenuCmi } from '@/assets/menu/icon-menu-cmi.svg';
import { ReactComponent as IconMenuRw } from '@/assets/menu/icon-menu-rw.svg';
import { ReactComponent as IconMenuSegment } from '@/assets/menu/icon-menu-segment.svg';
import { ReactComponent as IconMenuDRG } from '@/assets/menu/icon-menu-drg.svg';
import { ReactComponent as IconMenuSurgery } from '@/assets/menu/icon-menu-surgery.svg';
import { ReactComponent as IconMenuMedicalQuality } from '@/assets/menu/icon-menu-quality.svg';
import { ReactComponent as IconMenuDataQuality } from '@/assets/menu/icon-menu-data-quality.svg';

export interface MenuData {
  route: string;
  name: string;
  icon?: any;
  children?: MenuData[];
}

/**
 * 此处请严格遵守内层的route路由path 从外层路由pathname扩展
 * breadcrumb根据路由name 以及层级关系渲染
 * TODO 后期可以选择改掉
 */
export const menuData: MenuData[] = [];

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
