export interface BasicPageParams {
  //页码
  page: number;
  //每页条数
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}

export interface BasicPageResult<T> {
  //页码
  page: number;
  //每页条数
  limit: number;
  //总数
  total: number;
  //列表数据
  list: T[];
}

export interface BasicResponse<T> {
  code: number;
  message: string;
  error?: string;
  data: T;
}

export interface BasicTimeModel {
  createdAt: string;
  updatedAt: string;
}
