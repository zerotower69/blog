import { defHttp } from '@/utils/http/axios';
import { LoginParams, GetUserInfoModel, LoginResultModel } from './model/userModel';

import { ErrorMessageMode } from '#/axios';
import { getRefreshToken } from '@/utils/auth';

enum Api {
  Login = '/user/login',
  Logout = '/user/logout',
  GetUserInfo = '/user/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
  RefreshToken = '/user/refresh',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>(
    {
      url: Api.GetUserInfo,
    },
    {
      errorMessageMode: 'none',
    },
  );
}

/**
 * 根据refresh_token刷新access_token
 */
export function refreshToken() {
  return defHttp.get(
    {
      url: Api.RefreshToken,
      params: {
        token: getRefreshToken(),
      },
    },
    {
      errorMessageMode: 'none',
    },
  );
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

/**
 * 退出登录
 */
export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
