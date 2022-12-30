export interface IGridItemData {
  prefix?: string;
  key?: string;
  desc?: string;
  suffix?: string;
  component?: string;
  props?: any;
  dataKey?: string;
}

export interface IGridItem {
  x: number;
  h?: number;
  w: number;
  data: IGridItemData;
}
