import { createI18n } from 'vue-i18n' // import from runtime only

import { getCookie } from '@/utils/auth'

// vant 设置语言
import { Locale } from 'vant';
// 引入英文语言包
import enUS from 'vant/es/locale/lang/en-US';
import zhCN from 'vant/es/locale/lang/zh-CN';

// import elementEnLocale from 'element-plus/lib/locale/lang/en'
// import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'

// User defined lang
import enLocale from './en'
import zhLocale from './zh-cn'

const messages = {
  en: {
    ...enLocale,
    // ...elementEnLocale
  },
  'zh-cn': {
    ...zhLocale,
    // ...elementZhLocale
  }
}

export const getLocale = () => {
  const cookieLanguage = getCookie('language')
  if (cookieLanguage) {
    return cookieLanguage
  }
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }

  // Default language is english
  return 'zh'
}

// vant 设置语言
if (getLocale().indexOf("zh")) {
  Locale.use('zh-CN', zhCN);
} else {
  Locale.use('en-US', enUS);
}


const i18n = createI18n({
  locale: getLocale(),
  messages: messages
})

export default i18n