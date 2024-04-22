import type { AppConfig, BucketType, COSConfig, MinioConfig, OSSConfig, QiniuConfig } from './types';
/**
 * 获取项目运行环境
 */
export declare const getEnv: () => string;
export declare const IS_DEV: boolean;
/**
 * 读取项目配置
 */
export declare function getConfig(): AppConfig;
export declare const CONFIG: AppConfig;
type BucketTypeMap = {
    qiniu: QiniuConfig;
    oss: OSSConfig;
    cos: COSConfig;
    minio: MinioConfig;
};
/**
 * 获取响应的对象存储配置
 * @param type 对象存储的种类
 */
export declare function getBucketConfig<T extends BucketType = 'qiniu'>(type: T): BucketTypeMap[T];
export {};
