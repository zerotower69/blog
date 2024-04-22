//对象存储
import * as qiniu from 'qiniu';

export type QiniuZone = keyof typeof qiniu.zone;
export type BucketType = 'qiniu' | 'oss' | 'cos' | 'minio';

export type BucketConfig<T extends BucketType = 'qiniu'> = {
  //是否启用
  enable: boolean;
  //分别支持 七牛云/阿里云/腾讯云/自定义的
  type: T;
  qiniu?: QiniuConfig;
  cos?: COSConfig;
  oss?: OSSConfig;
  minio?: MinioConfig;
};

//七牛云对象存储的配置
export type QiniuConfig = {
  access_key: string;
  secret_key: string;
  scope: string;
  //是否启用
  enableHttps: boolean;
  zone: QiniuZone;
};

//腾讯云COS的配置
export type COSConfig = {
  //是否全局模块
  global?: boolean;
};

//阿里云OSS的配置
export type OSSConfig = {
  //是否全局模块
  global?: boolean;
};

export type MinioConfig = {
  //是否全局模块
  global?: boolean;
};
