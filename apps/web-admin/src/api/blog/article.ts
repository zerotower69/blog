import { defHttp } from '@/utils/http/axios';
import {
  AddOrUpdateArticleParams,
  ArticleModel,
  GetArticleListParams,
  GetArticleListResult,
} from './model/articleModel';

enum Api {
  GET_LEST = '/article/getList',
  ADD_ARTICLE = '/article/add',
  DELETE_ARTICLE = '/article/delete',
  UPDATE_ARTICLE = '/article/update',
  GET_DETAILS = '/article/admin/details',
  GET_WEBINFO = '/getWebInfo',
}

//获取文章列表数据
export function getArticleListApi(data: GetArticleListParams) {
  return defHttp.post<GetArticleListResult>(
    {
      url: Api.GET_LEST,
      data,
    },
    { errorMessageMode: 'message' },
  );
}

//新增文章
export function addArticleApi(data: AddOrUpdateArticleParams) {
  return defHttp.post<ArticleModel>(
    {
      url: Api.ADD_ARTICLE,
      data,
    },
    { errorMessageMode: 'message' },
  );
}

//修改文章
export function updateArticleApi(data: AddOrUpdateArticleParams) {
  return defHttp.post<number>(
    {
      url: Api.UPDATE_ARTICLE,
      data,
    },
    {
      errorMessageMode: 'message',
    },
  );
}

//删除文章
export function deleteArticleApi(id: string, soft_delete = true) {
  return defHttp.get(
    {
      url: Api.DELETE_ARTICLE,
      params: {
        id,
        soft_delete,
      },
    },
    {
      errorMessageMode: 'message',
    },
  );
}

//根据id获取文章详情
export function getArticleDetailsApi(id: string) {
  return defHttp.get<ArticleModel>(
    {
      url: Api.GET_DETAILS,
      params: {
        id,
      },
    },
    {
      errorMessageMode: 'message',
    },
  );
}

/**
 * 获取网站信息
 * @param url
 */
export function getWebInfoApi(url: string) {
  return defHttp.get<Recordable>({
    url: Api.GET_WEBINFO,
    params: {
      link: url,
    },
    timeout: 30 * 1000,
  });
}
