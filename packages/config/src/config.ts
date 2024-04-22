import { env, cwd } from 'process';
import * as fs from 'fs';
import { parse } from 'yaml';
import * as path from 'path';
import type {
  AppConfig,
  BucketConfig,
  BucketType,
  COSConfig,
  MinioConfig,
  OSSConfig,
  QiniuConfig,
} from './types';

/**
 * 获取项目运行环境
 */
export const getEnv = (): string => {
  return (env as Record<string, any>).RUNNING_ENV;
};
export const IS_DEV = getEnv() === 'dev';

/**
 * 读取项目配置
 */
export function getConfig(): AppConfig {
  const environment = getEnv();
  let localConfig: AppConfig = {};
  try {
    const localYamlPath = path.join(cwd(), './application.local.yaml');
    const localFile = fs.readFileSync(localYamlPath, 'utf8');
    localConfig = (parse(localFile) as AppConfig) ?? {};
  } catch (e) {}
  const yamlPath = path.join(cwd(), `./application.${environment}.yaml`);
  const file = fs.readFileSync(yamlPath, 'utf8');
  const config: AppConfig = parse(file) ?? {};
  const mergeConfig: AppConfig = {
    ...localConfig,
    ...config,
  };
  return {
    ...mergeConfig,
  };
}
export const CONFIG: AppConfig = getConfig();

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
export function getBucketConfig<T extends BucketType = 'qiniu'>(
  type: T,
): BucketTypeMap[T] {
  const bConfig = (getConfig()?.['bucket'] ?? {}) as BucketConfig;
  return (bConfig[type] ?? {}) as BucketTypeMap[T];
}
