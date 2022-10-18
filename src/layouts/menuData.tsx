import React from 'react';

export interface MenuData {
  route: string;
  name: string;
  icon?: any;
  children?: MenuData[];
}

export const menuData: MenuData[] = [
  {
    route: '/table',
    name: '测试用table',
  },
];
