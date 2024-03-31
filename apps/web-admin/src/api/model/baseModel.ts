export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  items: T[];
  total: number;
}

export interface BasicResponse<T> {
  code: number;
  message: string;
  error?: string;
  data: T;
}
