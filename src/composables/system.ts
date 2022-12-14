import UAParser from 'ua-parser-js';
import { useAuthStore } from '@/store';
import { isArray, isString } from '@/utils';

interface AppInfo {
  /** 프로젝트 이름 */
  name: string;
  /** 프로젝트 제목 */
  title: string;
  /** 프로젝트 설명 */
  desc: string;
}

/** 프로젝트 정보 */
export function useAppInfo(): AppInfo {
  const { VITE_APP_NAME: name, VITE_APP_TITLE: title, VITE_APP_DESC: desc } = import.meta.env;

  return {
    name,
    title,
    desc
  };
}

/** 장비 정보를 얻으십시오 */
export function useDeviceInfo() {
  const parser = new UAParser();
  const result = parser.getResult();
  return result;
}

/** 권한 판결 */
export function usePermission() {
  const auth = useAuthStore();

  function hasPermission(permission: Auth.RoleType | Auth.RoleType[]) {
    const { userRole } = auth.userInfo;

    let has = userRole === 'super';
    if (!has) {
      if (isArray(permission)) {
        has = (permission as Auth.RoleType[]).includes(userRole);
      }
      if (isString(permission)) {
        has = (permission as Auth.RoleType) === userRole;
      }
    }
    return has;
  }

  return {
    hasPermission
  };
}
