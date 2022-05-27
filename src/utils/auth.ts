import Cookies from 'js-cookie';

// const TokenKey = import.meta.env.TOKEN_KEY;
const TokenKey = "token"

export function getCookie(key: string) {
  if (key === undefined) {
    return Cookies.get(TokenKey);
  } else {
    return Cookies.get(key);
  }
}
//dsfsd
export function setCookie(key: string, token: string) {
  if (token === undefined) {
    return Cookies.set(TokenKey, key);
  } else {
    return Cookies.set(key, token);
  }
}

export function removeCookie(key: string) {
  if (key === undefined) {
    return Cookies.remove(TokenKey);
  } else {
    return Cookies.remove(key);
  }
}
