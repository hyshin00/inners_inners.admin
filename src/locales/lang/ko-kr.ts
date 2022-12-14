import type { LocaleMessages } from 'vue-i18n';

const locale: LocaleMessages<I18nType.Schema> = {
  message: {
    system: {
      title: '관리자'
    },
    routes: {
      dashboard: {
        dashboard: '대시보드',
        analysis: '분석',
        workbench: '워크벤치'
      },
      about: {
        about: 'About'
      }
    }
  }
};

export default locale;
