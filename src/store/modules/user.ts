// 
import { getCookie, removeCookie, setCookie } from "@/utils/auth";
import { useCookies } from '@vueuse/integrations';
import { batchUpdateState } from "@/utils";

import { Module } from 'vuex';

import router from '../../router/index'

const TOKEN_KEY = (window as any).TOKEN_KEY;

const token = useCookies().get(TOKEN_KEY as string);
import { AnyObject } from "@/utils/types";
interface StoreUser {
  token: string;
  accounts: string;
  user: AnyObject;
}
const updateUserInfo = (commit: any, data: any) => {
  const { token, user } = data;

  if (token) {
    setCookie("token", token);
  }
  setCookie("user", JSON.stringify(user));
  commit("batchUpdateState", data);
};
const store: Module<StoreUser, unknown> = {
  namespaced: true,
  state() {
    return {
      token: token,
      accounts: '',
      user: {}
    };
  },
  mutations: {
    batchUpdateState: (state, payload) => {
      batchUpdateState(state, payload);
    }
  },
  actions: {

    // // //  修改密码
    // changepassword(_, payload) {
    //   return new Promise((resolve, reject) => {
    //     changepassword(payload)
    //       .then(result => {
    //         resolve(result);
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // }
  }
};

export default store;
