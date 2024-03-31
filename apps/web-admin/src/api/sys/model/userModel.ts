/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  id: number;
  code: string;
  name: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  access_token: string;
  refresh_token: string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  id: string | number;
  // 用户名
  username: string;
  // 真实名字
  nickname: string;
  //TODO:头像和介绍暂无
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}
