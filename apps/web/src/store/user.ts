import { defineStore } from "pinia";

//用户简单登录
interface UserState {
  //是否登录中
  isLogin: boolean;
  //用户名
  username: string;
  //昵称
  nickname: string;
  //token
  token: string;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    isLogin: false,
    username: "",
    nickname: "",
    token: "",
  }),
  actions: {},
});
