export interface BasePageProps {}

export interface RespVO<T> {
  code?: number;
  statusCode?: number;
  message?: string;
  data?: T;
}
