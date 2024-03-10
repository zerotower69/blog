//分页offset
export function getPageOffset(page = 1, limit = 10) {
  return (page - 1) * limit;
}

//移除更新数据对象中的null或空的属性
export function getUpdateData<T extends Record<string, any>>(originData: T, removeId = true) {
  const data = {
    ...originData,
  };
  const keys: string[] = [];
  Object.keys(data).forEach((key) => {
    if ([undefined, null].includes(typeof data[key])) {
      keys.push(key);
    }
  });
  if (removeId && Reflect.has(data, 'id')) {
    keys.push('id');
  }
  deleteKey(data, ...keys);
  return data;
}

//删除对象中的某些字段
export function deleteKey(obj: Record<string, any>, ...keys: string[]) {
  if (typeof obj === 'object') {
    keys.forEach((key) => {
      if (Reflect.has(obj, key)) {
        Reflect.deleteProperty(obj, key);
      }
    });
  }
}
