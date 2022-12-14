/** 사용자 역할 */
export enum EnumUserRole {
  super = '슈퍼 관리자',
  admin = '관리자',
  user = '일반 사용자'
}

/** 登录模块 */
export enum EnumLoginModule {
  'pwd-login' = '비밀번호 로그인',
  'code-login' = '휴대폰 확인 코드 로그인',
  'register' = '가입',
  'reset-pwd' = '암호 재설정',
  'bind-wechat' = 'Wechat 바인딩'
}
