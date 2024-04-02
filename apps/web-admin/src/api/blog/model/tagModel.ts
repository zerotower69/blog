//查询列表参数
import { BasicPageParams, BasicPageResult, BasicTimeModel } from '@/api/model/baseModel';

//标签模型
export interface TagModel extends BasicTimeModel {
  //id
  id: number;
  //标签名
  name: string;
}

//请求列表参数
export interface GetTagListParams extends BasicPageParams {
  //标签名，支持模糊匹配
  name?: string;
}

//请求列表返回数据
export type GetTagListResult = BasicPageResult<TagModel>;
