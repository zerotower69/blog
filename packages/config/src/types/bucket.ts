//对象存储
import * as qiniu from 'qiniu';

export type QiniuZone = keyof typeof qiniu.zone;
export type BucketType = 'qiniu' | 'oss' | 'cos' | 'minio';

export type BucketConfig<T extends BucketType = 'qiniu'> = {
  /**
   * 是否启用
   */
  enable: boolean;
  /**
   * 分别支持 七牛云/阿里云/腾讯云/自定义的
   */
  type: T;
  /**
   * 七牛云的配置
   */
  qiniu?: QiniuConfig;
  /**
   * 腾讯cos的配置
   */
  cos?: COSConfig;
  /**
   * 阿里对象存储的配置
   */
  oss?: OSSConfig;
  /**
   * minio自定义搭建对象存储的配置
   */
  minio?: MinioConfig;
};

//七牛云对象存储的配置
export type QiniuConfig = {
  /**
   * access_key
   */
  access_key?: string;
  /**
   * secret_key
   */
  secret_key?: string;
  /**
   * 存储的空间名
   */
  scope?: string;
  /**
   * 所属区域
   */
  zone?: QiniuZone;
  /**
   * Mac 实例化的options
   */
  mac?: qiniu.auth.digest.MacOptions;
};

//腾讯云COS的配置
export type COSConfig = {
  /**
   * 是否全局模块,默认false
   */
  global?: boolean;
  /**
   * secretId
   */
  secret_id?: string;
  /**
   * secretKey
   */
  secret_key?: string;
  /**
   * 存储桶名
   */
  bucket?: string;
  /**
   * 所属区域
   */
  region?: string;
  /**
   * 绑定的域名
   */
  url?: string;
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
