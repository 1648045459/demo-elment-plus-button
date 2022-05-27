import store from '@/store';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
// import { useRouter } from 'vue-router';
import { getCookie } from "@/utils/auth";

import router from '../router'

const timeout1 = (window as any).TIMEOUT;
const TIMEOUT = timeout1 ? Number(timeout1) : 5000;
const BASEURL = (window as any).BASEURL;
// create an axios instance
const service = axios.create({
  baseURL: `${BASEURL}`,
  timeout: TIMEOUT
});

// request interceptor
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // do something before request is sent
    const token = getCookie("token")
    if (token) {
      // let each request carry token
      config.headers = {
        ...config.headers,
        authorization: token
      };
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;

    // if the custom code is not 200, it is judged as an error.
    if (response.status !== 200 &&
      response.status !== 429 &&
      response.status !== 400) {
      ElMessage.error(res.msg || "Error");
      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      return res;
    }
  },
  async (error) => {
    console.log('request.ts err = ' + error, error.response);

    if (error.response && error.response.status === 401) {
      // token失效
      ElMessage({
        message: error.response ? error.response.data.msg : "error",
        type: "error",
        duration: 3 * 1000,
        showClose: true
      });

      store.dispatch("user/resetUserInfo").then(() => {
        router.push("/login");
      });
      return Promise.reject(error);
    } else if (error.response && error.response.status === 429) {
      ElMessage({
        message: error.response ? error.response.data.msg : "error",
        type: "error",
        duration: 3 * 1000,
        showClose: true
      });
      return error.response.data;
    }
    else {
      if (
        error.response &&
        error.response.data &&
        error.response.data.err_detail ===
        "insufficient funds for gas * price + value"
      ) {
        ElMessage({
          message: "余额不足，请充值",
          type: "error",
          duration: 3 * 1000,
          showClose: true
        });
      } else {
        ElMessage({
          message: error.response ? error.response.data.msg : "error",
          type: "error",
          duration: 3 * 1000,
          showClose: true
        });
      }

      return error.response.data ? error.response.data : error.response;
    }
  }
);
export default service;