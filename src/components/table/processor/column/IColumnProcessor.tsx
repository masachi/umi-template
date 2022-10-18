/**
 *  Column Processor
 *  用于接受一个Column Item，返回处理之后的column item
 */

export interface IColumnProcessorProps {
  columnItem: any;
  backendPagination: boolean | object;
}

export interface IColumnProcessor<T extends IColumnProcessorProps> {
  process: (processorProps: T) => any;
}
