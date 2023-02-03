export interface FieldItem {
  type: any;
  name: string;
  card?: {
    title: string;
    enable: true;
  };

  props?: any;
  // editor?: any[];
  editor?: FieldEditorItem[];

  module?: string;

  // TODO 先行 非必填 后期 + 上必填
  position?: {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    minH?: number;
    minW?: number;
    maxH?: number;
    maxW?: number;
  };
}

export interface FieldEditorItem {
  tabTitle: string;
  component: string;
}
