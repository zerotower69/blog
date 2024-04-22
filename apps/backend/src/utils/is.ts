export function isNumber(val: any) {
  return typeof val === 'number' && !isNaN(val);
}

export function isObject(val: any) {
  return typeof val === 'object' && val !== null;
}

export function isString(val: any) {
  return typeof val === 'string' && val !== '';
}
