// 백 -엔드 인터페이스에서 데이터 유형이 반환되었습니다

/** 백엔드와 관련된 사용자 지분의 유형 */
declare namespace ApiAuth {
  /** 토큰을 반환하고 토큰을 새로 고치십시오 */
  interface Token {
    token: string;
    refreshToken: string;
  }
  /** 사용자 정보가 반환되었습니다 */
  type UserInfo = Auth.UserInfo;
}

/** 라우팅 관련 유형은 백엔드에서 반환되었습니다 */
declare namespace ApiRoute {
  /** 라우팅 데이터 유형이 반환되었습니다 */
  interface Route {
    /** 동적 경로 */
    routes: AuthRoute.Route[];
    /** 홈페이지에 해당하는 키 */
    home: AuthRoute.RouteKey;
  }
}

declare namespace ApiUserManagement {
  interface User {
    /** 사용자 ID */
    id: string;
    /** 사용자 이름 */
    userName: string | null;
    /** 나이 */
    age: number | null;
    /**
     * 성별
     * - 0: 여성
     * - 1: 남성
     */
    gender: '0' | '1' | null;
    /** 사용자 휴대 전화 번호 */
    phone: string;
    /** 사용자 사서함 */
    email: string | null;
    /**
     * 사용자 상태
     * - 1: 열어
     * - 2: 장애를 입히다
     * - 3: 얼다
     * - 4: 소프트 삭제
     */
    userStatus: '1' | '2' | '3' | '4' | null;
  }

  interface WebUser {
    /** 사용자 ID */
    id: number;
    /** 사용자 이름 */
    username: string;
    name: string | null;
    auth: 'admin' | 'user' | null;
    createdTime: Date | null;
    updatedTime: Date | null;
    type: string;
  }
}
