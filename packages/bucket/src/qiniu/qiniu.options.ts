import * as qiniu from 'qiniu';

export interface QiniuOptions {
  global?: boolean;
  access_key?: string;
  secret_key?: string;
  bucket?: string;
  zone?: QiniuZone;
  mac?: qiniu.auth.digest.MacOptions;
}

export type QiniuZone = keyof typeof qiniu.zone;

export interface PutRespBody {}
