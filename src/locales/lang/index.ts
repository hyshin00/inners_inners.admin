import koKR from './ko-kr';
import zhCN from './zh-cn';
import en from './en';

const locales = {
  'ko-KR': koKR,
  'zh-CN': zhCN,
  en
};

export type LocaleKey = keyof typeof locales;

export default locales;
