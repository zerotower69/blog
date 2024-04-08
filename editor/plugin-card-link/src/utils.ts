export type ExcludeItem = string | RegExp;

export function isExclude(exclude: ExcludeItem | ExcludeItem[], link: string): boolean {
  if (Array.isArray(exclude)) {
    return exclude.some((item) => isExclude(item, link));
  } else {
    return isRegExp(exclude) ? regexpCheck(exclude as RegExp, link) : stringCheck(exclude as string, link);
  }

  function regexpCheck(reg: RegExp, link: string) {
    return reg.test(link);
  }
  function stringCheck(excludeStr: string, link: string) {
    return excludeStr === link;
  }
}

export function isRegExp(val: any) {
  const res = Object.prototype.toString.call(val);
  return res.substring(8, res.length - 1) === "RegExp";
}

export function isHttpOrHttps(link: string) {
  return /^http(s)*/.test(link);
}
