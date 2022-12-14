/** 사용자 관련 모듈 */
declare namespace Auth {
  /**
   * 사용자문자유형(프론트 엔드 정적 라우팅은 문자 유형을 사용하여 라우팅 권한을 제어합니다.)
   * - super: 슈퍼 관리자이 권한에는 모든 라우팅 데이터가 있습니다据)
   * - admin: 관리자
   * - user: 사용자
   * - custom: 맞춤 역할
   */
  type RoleType = keyof typeof import('@/enum').EnumUserRole;

  /** 사용자 정보 */
  interface UserInfo {
    /** 사용자id */
    userId: string;
    /** 사용자 이름 */
    userName: string;
    /** 사용자 문자 유형 */
    userRole: RoleType;
  }
}

declare namespace UserManagement {
  interface User extends ApiUserManagement.User {
    /** 일련 번호 */
    index: number;
    /** 테이블key（id） */
    key: string;
  }

  interface WebUser extends ApiUserManagement.WebUser {
    /** 일련 번호 */
    index: number;
    /** 테이블key（id） */
    key: string;
  }
  /**
   * 성별
   * - 0: 女
   * - 1: 男
   */
  type GenderKey = NonNullable<User['gender']>;

  /**
   * 사용자 상태
   * - 1: 열어
   * - 2: 장애를 입히다
   * - 3: 얼다
   * - 4: 소프트 삭제
   */
  type UserStatusKey = NonNullable<User['userStatus']>;

  type UserAuthKey = NonNullable<WebUser['auth']>;
}
