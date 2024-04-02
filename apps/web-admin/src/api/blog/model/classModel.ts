//查询列表参数
import { BasicPageParams, BasicPageResult, BasicTimeModel } from '@/api/model/baseModel';

export interface ClassModel extends BasicTimeModel {
  id: number;
  name: string;
  desc: string;
}

//分类请求列表参数
export interface GetClassListParams extends BasicPageParams {
  //分类名成，支持模糊匹配
  name?: string;
  //创建时间范围
  startTime?: string;
  endTime?: string;
}

export type GetClassListResult = BasicPageResult<ClassModel>;
