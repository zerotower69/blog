import { defHttp } from '@/utils/http/axios';
import { GetClassListParams, ClassModel, GetClassListResult } from '@/api/blog/model/classModel';

enum Api {
  GET_LIST = '/class/getList',
  ADD = '/class/add',
  DELETE = '/class/delete',
  BATCH_DELETE = '/class/batch/delete',
  UPDATE = '/class/update',
}

//获取分裂列表
export function getClassListApi(data: GetClassListParams) {
  return defHttp.post<GetClassListResult>(
    {
      url: Api.GET_LIST,
      data,
    },
    {
      errorMessageMode: 'message',
    },
  );
}

//新增分类
export function addClassApi(data: Partial<ClassModel>) {
  return defHttp.post(
    {
      url: Api.ADD,
      data,
    },
    {
      errorMessageMode: 'message',
    },
  );
}

//更新分类
export function updateClassApi(data: Partial<ClassModel>) {
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

//删除分类
export function deleteClassApi(id: number) {
  return defHttp.get(
    {
      url: Api.DELETE,
      params: {
        id: id,
      },
    },
    {
      errorMessageMode: 'message',
    },
  );
}
