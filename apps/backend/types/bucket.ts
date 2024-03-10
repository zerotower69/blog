//对象存储
export type BucketConfig = {
  //是否启用
  enable: boolean;
  //分别支持 七牛云/阿里云/腾讯云/自定义的
  type: 'qiniu' | 'OOS' | 'COS' | 'mittro';
};

//七牛云对象存储的配置
export type QiniuConfig = {
  bucket: string;
};
