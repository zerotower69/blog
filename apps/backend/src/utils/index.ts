import * as crypto from 'crypto';
export * from './file';
export * from './data';

//计算md5,用于密码加密等
export function md5(str: string) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}
