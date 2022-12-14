import { getLoginModuleRegExp } from '@/utils';

/** 뿌리: / */
export const ROOT_ROUTE: AuthRoute.Route = {
  name: 'root',
  path: '/',
  redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
  meta: {
    title: 'Root'
  }
};

/** 고정 라우팅 */
export const constantRoutes: AuthRoute.Route[] = [
  ROOT_ROUTE,
  {
    name: 'login',
    path: '/login',
    component: 'self',
    props: route => {
      const moduleType = (route.params.module as EnumType.LoginModuleKey) || 'pwd-login';
      return {
        module: moduleType
      };
    },
    meta: {
      title: '로그인',
      dynamicPath: `/login/:module(${getLoginModuleRegExp()})?`,
      singleLayout: 'blank'
    }
  },
  {
    name: 'constant-page',
    path: '/constant-page',
    component: 'self',
    meta: {
      title: '고정 페이지',
      singleLayout: 'blank'
    }
  },
  {
    name: 'no-permission',
    path: '/no-permission',
    component: 'self',
    meta: {
      title: '권한없음',
      singleLayout: 'blank'
    }
  },
  {
    name: 'not-found',
    path: '/not-found',
    component: 'self',
    meta: {
      title: '찾을 수 없습니다',
      singleLayout: 'blank'
    }
  },
  {
    name: 'service-error',
    path: '/service-error',
    component: 'self',
    meta: {
      title: '서버 오류',
      singleLayout: 'blank'
    }
  },
  // 유효하지 않은 경로의 라우팅과 일치합니다
  {
    name: 'not-found-page',
    path: '/:pathMatch(.*)*',
    component: 'blank',
    meta: {
      title: '찾을 수 없습니다',
      singleLayout: 'blank'
    }
  }
];
