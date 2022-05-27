import { AnyObject } from "./types";
import rand from "csprng";
import bs58 from "base58check";
import * as asmCrypto from "asmcrypto.js";
// import { useI18n } from 'vue-i18n';
// const { t } = useI18n();

import i18n from '../locales'
const { t } = i18n.global



/**
 * @name: 16进制转化为10进制整数
 * @test: test font
 * @msg:
 * @param {*} hex  16进制字符串
 * @return {*}
 */
export function hex2int(hex: any) {
  const len = hex.length,
    a = new Array(len);
  let code = 0;
  for (let i = 0; i < len; i++) {
    code = hex.charCodeAt(i);
    if (48 <= code && code < 58) {
      code -= 48;
    } else {
      code = (code & 0xdf) - 65 + 10;
    }
    a[i] = code;
  }

  return a.reduce(function (acc, c) {
    acc = 16 * acc + c;
    return acc;
  }, 0);
}


/**
 * @name: 数组元素相加
 * @test: test font
 * @msg:
 * @param {*} arr 数组
 * @return {*}
 */
function sum(arr: number[]) {
  if (arr && arr.length) {
    return arr.reduce(function (a, b) {
      return a + b;
    }, 0);
  } else {
    return 0;
  }
}

/**
 * @name: 对数组对象内的某个属性相加
 * @test: test font
 * @msg:
 * @param {*} column 数组对象
 * @return {*}
 */
export function calculateWidth(column: any) {
  const arr = column.map((it: any) =>
    it.width || it.minWidth ? parseInt(it.width || it.minWidth) : 80
  );
  return sum(arr);
}

/**
 * @name: 多少时间前（多少秒前，多少分钟前，多少小时前，多少天前，大于7天全部显示7天前）
 * @test: test font
 * @msg:
 * @param {*} hisTime 历史时间戳
 * @param {*} nowTime 当前时间戳，可选填，默认当前事件
 * @return {*}
 */

export function timeAgo(hisTime: number, nowTime: number) {
  const now = nowTime ? nowTime : new Date().getTime();
  const diffValue = now - hisTime;
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const _day = diffValue / day;
  const _hour = diffValue / hour;
  const _min = diffValue / minute;
  const _seconds = diffValue / 1000;

  if (_day > 7) {
    return '7' + '天前';
  } else if (_day >= 1 && _day <= 7) {
    return _day.toFixed(0) + '天前';
  } else if (_hour >= 1) {
    return _hour.toFixed(0) + '小时前';
  } else if (_min >= 1) {
    return _min.toFixed(0) + '分钟前';
  } else if (_seconds < 60) {
    return _seconds.toFixed(0) + '秒前';
  } else {
    return '';
  }
}

/**
 * @name:字节转化
 * @test: test font
 * @msg:
 * @param {*} val  需要转化的数字 int
 * @param {*} fixNum 保留的小数位数  int
 * @return {*}
 */
export function filterBite(val: any, fixNum: any) {
  if (fixNum < 0) {
    fixNum = 0;
  }
  // val: 字节 B
  if (val === '' || val === undefined) {
    return '';
  } else if (val === 0) {
    return '0 B';
  } else {
    const kb = 1024;
    const mb = 1024 * 1024;
    const gb = 1024 * 1024 * 1024;
    const tb = 1024 * 1024 * 1024 * 1024;
    const pb = 1024 * 1024 * 1024 * 1024 * 1024;
    const eb = 1024 * 1024 * 1024 * 1024 * 1024 * 1024;
    const zb = 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024;
    if (val < kb) {
      return val.toFixed(fixNum) + ' B';
    } else if (val >= kb && val < mb) {
      return (val / kb).toFixed(fixNum) + ' KB';
    } else if (val >= mb && val < gb) {
      return (val / mb).toFixed(fixNum) + ' MB';
    } else if (val >= gb && val < tb) {
      return (val / gb).toFixed(fixNum) + ' GB';
    } else if (val >= tb && val < pb) {
      return (val / tb).toFixed(fixNum) + ' TB';
    } else if (val >= pb && val < eb) {
      return (val / pb).toFixed(fixNum) + ' PB';
    } else if (val >= eb && val < zb) {
      return (val / eb).toFixed(fixNum) + ' EB';
    } else if (val >= zb) {
      return (val / zb).toFixed(fixNum) + ' ZB';
    }
  }
}
/**
 * @name:日期格式化
 * @test: test font
 * @msg:
 * @param {*} date  日期参数，Date类型
 * @param {*} format 精确到天：1；精确到分：2
 * @param {*} delimiter 日期分隔符 2012-12-12 分隔符 -
 * @return {*}
 */
export function getCurrentDate(date: any, format: any, delimiter: any) {
  if (!delimiter) delimiter = '.';
  const now = date;
  const year = now.getFullYear(); // 得到年份
  let month = now.getMonth(); // 得到月份
  let day = now.getDate(); // 得到日期
  let hour = now.getHours(); // 得到小时
  let minu = now.getMinutes(); // 得到分钟
  let sec = now.getSeconds(); // 得到秒
  month = month + 1;
  if (month < 10) month = '0' + month;
  if (day < 10) day = '0' + day;
  if (hour < 10) hour = '0' + hour;
  if (minu < 10) minu = '0' + minu;
  if (sec < 10) sec = '0' + sec;
  let time = '';
  // 精确到天
  if (format === 1) {
    time = year + delimiter + month + delimiter + day;
  } else if (format === 2) {
    // 精确到分
    time =
      year +
      delimiter +
      month +
      delimiter +
      day +
      ' ' +
      hour +
      ':' +
      minu +
      ':' +
      sec;
  }
  return time;
}

/**
 * @name: 钱包metamask 地址 省略格式
 * @test: test font
 * @msg:
 * @param {*} accounts
 * @return {*}
 */
export function showAccounts(accounts: string) {
  if (!accounts) return '';
  if (accounts.length >= 42) {
    const data =
      accounts.substr(0, 6) + '…' + accounts.substr(accounts.length - 4);
    return data;
  }
  return '';
}




/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url: string) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, " ") +
    '"}'
  );
}

/**
 * @description: 类型检查
 * @param {type}
 * @return: {String}
 */

export function typeCheck(param: any) {
  return Object.prototype.toString.call(param);
}

/**
 * @description: 批量修改stage
 * @param {Object}
 * @return:
 */
export function batchUpdateState(state: any, payload: any) {
  if (
    typeCheck(state) === "[object Object]" &&
    typeCheck(payload) === "[object Object]"
  ) {
    for (let key in payload) {
      state[key] = "";
      state[key] = payload[key];
    }
  } else {
    console.error("expected plain Object");
  }
}

/**
 * @description: 获取lang
 * @param {Object}
 * @return:
 */
export function getNavigatorLang() {
  const lang = window.navigator.language;
  return lang.toLowerCase();
}

/**
 * @description: 判断设备
 * @param {Object}
 * @return:
 */
export function browserRedirect() {
  return /Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(navigator.userAgent)
  // var sUserAgent = navigator.userAgent.toLowerCase();
  // var bIsIpad = sUserAgent.match(/ipad/i) === "ipad";
  // var bIsIphoneOs = sUserAgent.match(/iphone/i) == "iphone";
  // var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  // var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  // var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  // var bIsAndroid = sUserAgent.match(/android/i) == "android";
  // var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  // var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  // if (
  //   bIsIpad ||
  //   bIsIphoneOs ||
  //   bIsMidp ||
  //   bIsUc7 ||
  //   bIsUc ||
  //   bIsAndroid ||
  //   bIsCE ||
  //   bIsWM
  // ) {
  //   // "Mobile"
  //   return true;
  // } else {
  //   // "PC"
  //   return false;
  // }
}
/**
 * @description: 获取lang-大写
 * @param {Object}
 * @return:
 */
export function getNavigatorLangNew() {
  const lang = window.navigator.language;
  return lang;
}



/**
 * @Descripttion: 对随机数进行两次sha256加密
 * @param {*} salt 随机数
 * @return {*}
 */
export function Sha256SaltRandom(salt: string) {
  // 第一次SHA256
  let fillerWord = "c"; //填充字
  let msg = `chaindisk${fillerWord}${salt}`;
  let msgBytes = asmCrypto.string_to_bytes(msg);
  let sha256 = new asmCrypto.Sha256();
  let result = sha256.process(msgBytes).finish().result;
  if (result) {
    // 第二次SHA256
    let sha256_2 = new asmCrypto.Sha256();
    let result_2 = sha256_2.process(result).finish().result;
    return result_2;
  } else {
    return null
  }

}

/**
 * @Descripttion: 用PBKDF2_HMAC_SHA512 对加密随机数，密码加密
 * @param {*} salt  加密随机数
 * @param {*} pass  密码
 * @return {*}startKey unit8array, endKey 16进制
 */
export function onPBKDF2_HMAC_SHA512(salt: Uint8Array, pass: string) {
  let obj = {
    password: asmCrypto.string_to_bytes(pass),
    salt: salt,
    count: 100000,
    dklen: 64 // 64byte
  };

  // 512bits = 64byte   1byte = 8bits    16byte = 128bite
  let unit8Array = asmCrypto.Pbkdf2HmacSha512(
    obj.password,
    obj.salt,
    obj.count,
    obj.dklen
  );
  let startKey = unit8Array.slice(0, 16); // 前128bits派生加密密钥
  let endKey = unit8Array.slice(unit8Array.length - 16); // 后128bits派生认证密钥
  let endKeyStr = asmCrypto.bytes_to_hex(endKey);
  return { startKey, endKeyStr };
}

/**
 * @Descripttion: unit8array => base58
 * @param {*} bytes
 * @return {*}
 */
export function bytesToBase58(bytes: any) {
  if (!bytes) return "";
  const address = bs58.encode(bytes);
  return address;
}

/**
 * @Descripttion: 打开 oneapm 监控
 * @param {*}
 * @return {*}
 */
export function openONEAPM() {
  let oneapm3 = document.getElementById("oneapm3");
  if (oneapm3) {
    oneapm3.setAttribute('src', '/oneapm/oneapm3.js');
  }
  let oneapm4 = document.getElementById("oneapm4");
  if (oneapm4) {
    oneapm4.setAttribute('src', '//browsercollector.oneapm.com/static/js/bw-loader-416.7.33.js');
  }
}


// 获取当前日期
export function getNowFormatDate() {
  var dateObj = new Date();
  var seperator1 = "/";
  var year = dateObj.getFullYear();
  var month = dateObj.getMonth() + 1;
  var monthStr = ''
  var date = dateObj.getDate();
  var dateStr = ''
  var hours = dateObj.getHours();
  var minutes = dateObj.getMinutes();
  var minutesStr = ''

  if (month >= 1 && month <= 9) {
    monthStr = "0" + month;
  }
  if (date >= 0 && date <= 9) {
    dateStr = "0" + date;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutesStr = "0" + minutes;
  }

  var currentdate =
    year +
    seperator1 +
    monthStr +
    seperator1 +
    dateStr +
    " " +
    hours +
    ":" +
    minutesStr;
  return currentdate;
}

// 千分位
export function formatNumber(num: any, fixed?: any) {
  if (num >= 0 && num != null && num != undefined) {
    //将num中的$,去掉，将num变成一个纯粹的数据格式字符串
    num =
      typeof num === "number"
        ? num.toString().replace(/\$|\,/g, "")
        : typeof num === "string"
          ? num.replace(/\$|\,/g, "")
          : num.toString().replace(/\$|\,/g, "");
    //如果num不是数字，则将num置0，并返回
    if ("" == num || isNaN(num)) {
      return "Not a Number ! ";
    }
    //如果num是负数，则获取她的符号
    var sign = num.indexOf("-") > 0 ? "-" : "";
    //如果存在小数点，则获取数字的小数部分
    var cents = num.indexOf(".") > 0 ? num.substr(num.indexOf(".")) : "";
    cents = cents.length > 1 ? cents : ""; //注意：这里如果是使用change方法不断的调用，小数是输入不了的
    //获取数字的整数数部分
    num = num.indexOf(".") > 0 ? num.substring(0, num.indexOf(".")) : num;
    //如果没有小数点，整数部分不能以0开头
    if ("" == cents) {
      if (num.length > 1 && "0" == num.substr(0, 1)) {
        return "Not a Number ! ";
      }
    }
    //如果有小数点，且整数的部分的长度大于1，则整数部分不能以0开头
    else {
      if (num.length > 1 && "0" == num.substr(0, 1)) {
        return "Not a Number ! ";
      }
    }
    //针对整数部分进行格式化处理，这是此方法的核心，也是稍难理解的一个地方，逆向的来思考或者采用简单的事例来实现就容易多了
    /*
                  也可以这样想象，现在有一串数字字符串在你面前，如果让你给他家千分位的逗号的话，你是怎么来思考和操作的?
                  字符串长度为0/1/2/3时都不用添加
                  字符串长度大于3的时候，从右往左数，有三位字符就加一个逗号，然后继续往前数，直到不到往前数少于三位字符为止
                 */
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
      num =
        num.substring(0, num.length - (4 * i + 3)) +
        "," +
        num.substring(num.length - (4 * i + 3));
    }
    //将数据（符号、整数部分、小数部分）整体组合返回
    if (fixed === true || fixed === "true") {
      // 取整
      return sign + num;
    } else {
      // 保留小数
      return sign + num + cents;
    }
  } else {
    return "";
  }
}

// 格式化日期: (2022-01-27T07:43:53.465Z) => (2022/01/14 18:44)
function p(s: number) {
  return s < 10 ? "0" + s : s;
}
export function subStrFormatTime(time: string) {
  if (time) {
    var d2 = new Date(time);

    const resDate =
      d2.getFullYear() + "/" + p(d2.getMonth() + 1) + "/" + p(d2.getDate());
    const resTime = p(d2.getHours()) + ":" + p(d2.getMinutes());
    return resDate + " " + resTime;
  } else {
    return "";
  }
}