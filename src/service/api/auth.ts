import { request } from '../request';

/**
 * 검증 코드를 가져옵니다
 * @param phone - 전화 번호
 * @returns - 반품boolean값은 성공 여부를 나타냅니다
 */
export function fetchSmsCode(phone: string) {
  return request.post<boolean>('/getSmsCode', { phone });
}

/**
 * 로그인
 * @param userName - 사용자 이름
 * @param password - 비밀번호
 */
export function fetchLogin(userName: string, password: string) {
  return request.post<ApiAuth.Token>('/auth/login', { username: userName, password });
}

/** 사용자 정보를 얻으십시오 */
export function fetchUserInfo() {
  return request.get<ApiAuth.UserInfo>('/auth/getUserInfo');
}

/**
 * 사용자 경로 데이터를 얻습니다
 * @param userId - 사용자 ID
 * @description 백 -엔드 쿼리 사용자 ID를 기반으로 해당 문자 유형을 쿼리하고 해당 역할의 경로 데이터가 앞쪽으로 다시 스크리닝됩니다.
 */
export function fetchUserRoutes(userId: string) {
  return request.post<ApiRoute.Route>('/auth/getUserRoutes', { userId });
}

/**
 * 토큰을 새로 고치십시오
 * @param refreshToken
 */
export function fetchUpdateToken(refreshToken: string) {
  return request.post<ApiAuth.Token>('/auth/updateToken', { refreshToken });
}
