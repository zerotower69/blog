import { defHttp } from '@/utils/http/axios';
import { GetTagListParams, GetTagListResult, TagModel } from '@/api/blog/model/tagModel';

enum Api {
  GET_LIST = '/tag/getList',
  ADD = '/tag/add',
  DELETE = '/tag/delete',
  BATCH_DELETE = '/tag/batch/delete',
  UPDATE = '/tag/update',
}

//获取标签列表
export function getTagListApi(data: GetTagListParams) {
  return defHttp.post<GetTagListResult>(
    {
      url: Api.GET_LIST,
      data,
    },
    {
      errorMessageMode: 'message',
    },
  );
}

//新增标签
export function addTagApi(name: string) {
  return defHttp.post(
    {
      url: Api.ADD,
      data: {
        name,
      },
    },
    {
      errorMessageMode: 'message',
    },
  );
}

//删除标签
export function deleteTagApi(ids: string) {
  return defHttp.get<number>(
    {
      url: Api.DELETE,
      params: {
        ids,
      },
    },
    {
      errorMessageMode: 'message',
    },
  );
}

//修改标签名
export function updateTagApi(data: Partial<TagModel>) {
  return defHttp.post(
    {
      url: Api.UPDATE,
      data,
    },
    {
      errorMessageMode: 'message',
    },
  );
}
