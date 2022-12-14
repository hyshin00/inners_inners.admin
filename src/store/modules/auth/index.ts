import { unref } from 'vue';
import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchLogin, fetchUserInfo } from '@/service';
import { useRouterPush } from '@/composables';
import { clearAuthStorage, getToken, getUserInfo, setRefreshToken, setToken, setUserInfo } from '@/utils';
import { useTabStore } from '../tab';
import { useRouteStore } from '../route';

interface AuthState {
  /** 사용자 정보 */
  userInfo: Auth.UserInfo;
  /** 사용자token */
  token: string;
  /** 로그인의 잠긴 상태 */
  loginLoading: boolean;
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loginLoading: false
  }),
  getters: {
    /** 로그인할지 여부 */
    isLogin(state) {
      return Boolean(state.token);
    }
  },
  actions: {
    /** repossess auth상태 */
    resetAuthStore() {
      const { toLogin } = useRouterPush(false);
      const { resetTabStore } = useTabStore();
      const { resetRouteStore } = useRouteStore();
      const route = unref(router.currentRoute);

      clearAuthStorage();
      this.$reset();

      resetTabStore();
      resetRouteStore();

      if (route.meta.requiresAuth) {
        toLogin();
      }
    },
    /**
     * 로그인 후 성공 또는 실패의 논리를 논리
     * @param backendToken - 반품token
     */
    async handleActionAfterLogin(backendToken: ApiAuth.Token) {
      const { toLoginRedirect } = useRouterPush(false);

      const loginSuccess = await this.loginByToken(backendToken);

      if (loginSuccess) {
        // 로그인 후 주소
        toLoginRedirect();

        // 로그인에 성공적으로 오신 것을 환영합니다. 프롬프트에 오신 것을 환영합니다
        window.$notification?.success({
          title: '로그인 성공!',
          content: `다시 오신 것을 환영합니다.${this.userInfo.userName}!`,
          duration: 3000
        });

        return;
      }

      // 실패한 경우 상태를 재설정하십시오
      this.resetAuthStore();
    },
    /**
     * ~에 따르면token로그인
     * @param backendToken - 반품token
     */
    async loginByToken(backendToken: ApiAuth.Token) {
      // debugger;
      let successFlag = false;

      // 첫 번째token캐시에 저장하십시오(다음 인터페이스의 요청 헤더는 필요합니다token)
      const { token, refreshToken } = backendToken;
      setToken(token);
      setRefreshToken(refreshToken);

      // 사용자 정보를 얻으십시오
      const { data } = await fetchUserInfo();
      if (data) {
        // 성공한 후 사용자 정보를 캐시에 저장하십시오
        setUserInfo(data);

        // 업데이트 상태
        this.userInfo = data;
        this.token = token;

        successFlag = true;
      }

      return successFlag;
    },
    /**
     * 로그인
     * @param userName - 사용자 이름
     * @param password - 비밀번호
     */
    async login(userName: string, password: string) {
      this.loginLoading = true;
      const { data } = await fetchLogin(userName, password);
      if (data) {
        await this.handleActionAfterLogin(data);
      }
      this.loginLoading = false;
    },
    /**
     * 사용자 권한을 교체하십시오(스위치 계정)
     * @param userRole
     */
    async updateUserRole(userRole: Auth.RoleType) {
      const { resetRouteStore, initAuthRoute } = useRouteStore();

      const accounts: Record<Auth.RoleType, { userName: string; password: string }> = {
        super: {
          userName: 'Super',
          password: 'super123'
        },
        admin: {
          userName: 'Admin',
          password: 'admin123'
        },
        user: {
          userName: 'User01',
          password: 'user01123'
        }
      };
      const { userName, password } = accounts[userRole];
      const { data } = await fetchLogin(userName, password);
      if (data) {
        await this.loginByToken(data);
        resetRouteStore();
        initAuthRoute();
      }
    }
  }
});
