
import { getCookie } from "@/utils/auth"; // get token from cookie
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import router from "./router";
import store from "./store";


NProgress.configure({ showSpinner: false }); // NProgress Configuration
const whiteList = [

  "Login",

]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {


  // start progress bar
  // determine whether the user has logged in
  const token = getCookie("token");
  if (token) {
    if (to.path === "/") {
      // if is logged in, redirect to the home page
      //判断设备
      next({ path: "/main", query: to.query });
      NProgress.done();
    } else {
      const hasGetUserInfo = store.state.user.user;
      if (JSON.stringify(hasGetUserInfo) !== "{}") {
        next();
      } else {
        try {
          // get user info
          let userData = getCookie("user")
          const user = userData ? JSON.parse(userData) : {};
          const token = getCookie("token");
          await store.commit("user/batchUpdateState", {
            token: token,
            user: user
          });
          next();
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch("user/resetUserInfo");
          // Message.error(error || "Has Error");
          next(`/`); // 退出登录
          NProgress.done();
        }
      }
    }
  } else {


    // 跳出未登录
    const name = to.name?.toString()
    if (name && whiteList.indexOf(name) !== -1) {
      // /!* has no token*!/;
      // in the free login whitelist, go directly
      next();
    } else {
      // if (
      //   to.name === "SignTransaction" &&
      //   !sessionStorage.getItem("appidSaltRandom") &&
      //   to.query &&
      //   to.query.appidSaltRandom
      // ) {
      //   const appidSaltRandom = to.query.appidSaltRandom?.toString()
      //   sessionStorage.setItem("appidSaltRandom", appidSaltRandom);
      // }



      // other pages that do not have permission to access are redirected to the login page.
      next(`/`);
      await store.dispatch("user/resetUserInfo");
      NProgress.done();
    }


  }
});

router.afterEach((to, from, next) => {
  // finish progress bar
  NProgress.done();
});
