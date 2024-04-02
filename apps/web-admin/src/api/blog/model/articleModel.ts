//查询列表参数
import { BasicPageParams, BasicPageResult } from '@/api/model/baseModel';

export interface GetArticleListParams extends BasicPageParams {
  //过滤条件等
  filter: {
    //创建时间排序，默认ASC,false
    desc: boolean;
    //创建时间范围
    startTime: string;
    endTime: string;
    //文章标题，模糊匹配
    title: string;
  };
}

//article model
export interface ArticleModel {
  id?: string;
  title: string;
  abstract: string;
  content: string;
  tags: Array<{
    id: number;
    name: string;
  }>;
  createdAt: string;
  updatedAt: string;
  type: 'origin' | 'others';
  origin_link?: string;
  banner?: string;
}

//请求列表返回
export type GetArticleListResult = BasicPageResult<ArticleModel>;

//新增文章或者修改文章请求参数
export interface AddOrUpdateArticleParams {
  title: string;
  abstract: string;
  content: string;
  tagsId: number[];
  classId: number[];
  type: 'origin' | 'others';
  origin_link?: string;
  banner?: string;
}

//修改文章
