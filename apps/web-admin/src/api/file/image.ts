import { defHttp } from '@/utils/http/axios';
import { ContentTypeEnum } from '@/enums/httpEnum';

enum Api {
  UPLOAD_IMAGE = '/file/image/upload',
}

export function uploadImageApi(file: File) {
  const form = new FormData();
  form.append('image', file);
  return defHttp.post({
    url: Api.UPLOAD_IMAGE,
    data: form,
    headers: {
      'Content-type': ContentTypeEnum.FORM_DATA,
    },
  });
}
