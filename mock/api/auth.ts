import type { MockMethod } from 'vite-plugin-mock';
import { userModel } from '../model';

/** 매개 변수 오류의 상태 코드입니다 */
const ERROR_PARAM_CODE = 10000;

const ERROR_PARAM_MSG = '매개 변수 점검 실패!';

const apis: MockMethod[] = [
  // 검증 코드를 가져옵니다
  {
    url: '/mock/getSmsCode',
    method: 'post',
    response: (): Service.MockServiceResult<boolean> => {
      return {
        code: 200,
        message: 'ok',
        data: true
      };
    }
  },
  // 사용자+암호 로그인
  {
    url: '/mock/login',
    method: 'post',
    response: (options: Service.MockOption): Service.MockServiceResult<ApiAuth.Token | null> => {
      const { userName = undefined, password = undefined } = options.body;

      if (!userName || !password) {
        return {
          code: ERROR_PARAM_CODE,
          message: ERROR_PARAM_MSG,
          data: null
        };
      }

      const findItem = userModel.find(item => item.userName === userName && item.password === password);

      if (findItem) {
        return {
          code: 200,
          message: 'ok',
          data: {
            token: findItem.token,
            refreshToken: findItem.refreshToken
          }
        };
      }
      return {
        code: 1000,
        message: '잘못된 사용자 이름 또는 비밀번호!',
        data: null
      };
    }
  },
  // 사용자 정보를 얻으십시오(토큰을 휴대하도록 헤드를 요청하십시오, 토큰을 기반으로 사용자 정보를 얻습니다)
  {
    url: '/mock/getUserInfo',
    method: 'get',
    response: (options: Service.MockOption): Service.MockServiceResult<ApiAuth.UserInfo | null> => {
      // Mock Plug -in에서 얻은 필드는 승인입니다., 프론트 엔드는 승인 필드입니다
      const { authorization = '' } = options.headers;
      const REFRESH_TOKEN_CODE = 66666;

      if (!authorization) {
        return {
          code: REFRESH_TOKEN_CODE,
          message: '사용자가 실패했거나 존재하지 않습니다!',
          data: null
        };
      }
      const userInfo: Auth.UserInfo = {
        userId: '',
        userName: '',
        userRole: 'user'
      };
      const isInUser = userModel.some(item => {
        const flag = item.token === authorization;
        if (flag) {
          const { userId: itemUserId, userName, userRole } = item;
          Object.assign(userInfo, { userId: itemUserId, userName, userRole });
        }
        return flag;
      });

      if (isInUser) {
        return {
          code: 200,
          message: 'ok',
          data: userInfo
        };
      }

      return {
        code: REFRESH_TOKEN_CODE,
        message: '사용자 정보는 비정상적입니다!',
        data: null
      };
    }
  },
  {
    url: '/mock/updateToken',
    method: 'post',
    response: (options: Service.MockOption): Service.MockServiceResult<ApiAuth.Token | null> => {
      const { refreshToken = '' } = options.body;

      const findItem = userModel.find(item => item.refreshToken === refreshToken);

      if (findItem) {
        return {
          code: 200,
          message: 'ok',
          data: {
            token: findItem.token,
            refreshToken: findItem.refreshToken
          }
        };
      }
      return {
        code: 3000,
        message: '用户已失效或不存在！',
        data: null
      };
    }
  }
];

export default apis;
