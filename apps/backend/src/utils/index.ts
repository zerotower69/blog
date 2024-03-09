import * as crypto from 'crypto';

//计算md5,用于密码加密等
export function md5(str: string) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

//分页offset
export function getPageOffset(page = 1, limit = 10) {
  return (page - 1) * limit;
}

//移除null或空的属性
export function getUpdateData<T extends Record<string, any>>(
  originData: T,
  removeId = true,
) {
  const data = {
    ...originData,
  };
  Object.keys(data).forEach((key) => {
    if ([undefined, null].includes(typeof data[key])) {
      Reflect.deleteProperty(data, key);
    }
  });
  if (removeId && Reflect.has(data, 'id')) {
    Reflect.deleteProperty(data, 'id');
  }
  return data;
}

export function deleteKey(obj: Record<string, any>, ...keys: string[]) {
  if (typeof obj === 'object') {
    keys.forEach((key) => {
      if (Reflect.has(obj, key)) {
        Reflect.deleteProperty(obj, key);
      }
    });
  }
}
