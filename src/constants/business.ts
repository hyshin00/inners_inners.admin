/** 성별 */
export const genderLabels: Record<UserManagement.GenderKey, string> = {
  0: '여성',
  1: '남성'
};

export const genderOptions: { value: UserManagement.GenderKey; label: string }[] = [
  { value: '0', label: genderLabels['0'] },
  { value: '1', label: genderLabels['1'] }
];

/** 사용자 상태 */
export const userStatusLabels: Record<UserManagement.UserStatusKey, string> = {
  1: '열어',
  2: '장애를 입히다',
  3: '얼다',
  4: '삭제'
};

export const userAuthLabels: Record<UserManagement.UserAuthKey, string> = {
  admin: '관리자',
  user: '사용자'
};

export const userStatusOptions: { value: UserManagement.UserStatusKey; label: string }[] = [
  { value: '1', label: userStatusLabels['1'] },
  { value: '2', label: userStatusLabels['2'] },
  { value: '3', label: userStatusLabels['3'] },
  { value: '4', label: userStatusLabels['4'] }
];

export const userAuthOptions: { value: UserManagement.UserAuthKey; label: string }[] = [
  { value: 'admin', label: userAuthLabels.admin },
  { value: 'user', label: userAuthLabels.user }
];
