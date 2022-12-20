export interface TableCoordinateItem {
  x?: number;
  y?: number;
  offset?: number;
  height: number; // 默认1 而且只能是1
  width: number;
  className?: string;
  component?: string;
}
