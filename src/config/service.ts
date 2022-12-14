/** 시간 초과 시간을 요청합니다 */
export const REQUEST_TIMEOUT = 60 * 1000;

/** 오류 정보를 표시합니다 */
export const ERROR_MSG_DURATION = 3 * 1000;

/** 기본 요청 오류code */
export const DEFAULT_REQUEST_ERROR_CODE = 'DEFAULT';

/** 기본 요청 오류 텍스트 */
export const DEFAULT_REQUEST_ERROR_MSG = '요청 오류';

/** 시간 초과 오류를 요청합니다code(수정을 위해：ECONNABORTED) */
export const REQUEST_TIMEOUT_CODE = 'ECONNABORTED';

/** 요청 시간 초과의 오류 텍스트 */
export const REQUEST_TIMEOUT_MSG = '요청 시간이 초과되었습니다';

/** 네트워크에는 코드를 사용할 수 없습니다 */
export const NETWORK_ERROR_CODE = 'NETWORK_ERROR';

/** 네트워크에서 사용할 수없는 오류 텍스트 */
export const NETWORK_ERROR_MSG = '네트워크를 사용할 수 없습니다';

/** 다양한 상태의 다양한 상태에서 오류를 요청합니다 */
export const ERROR_STATUS = {
  400: '400: 잘못된 요청 구문입니다.',
  401: '401: 인증되지 않았습니다.',
  403: '403: 서버가 권한을 거정합니다.',
  404: '404: 요청 리소스가 존재하지 않습니다.',
  405: '405: 요청 방법은 허용되지 않습니다.',
  408: '408: 네트워크 요청 시간 초과',
  500: '500: 인터넷 서버 오류',
  501: '501: 서버는 요청 함수를 구현하지 않습니다.',
  502: '502: 게이트웨이 오류',
  503: '503: 서비스를 사용할 수 없습니다.',
  504: '504: 게이트웨이 시간 초과',
  505: '505: 서버는 요청 http 버전을 지원하지 않습니다.',
  [DEFAULT_REQUEST_ERROR_CODE]: DEFAULT_REQUEST_ERROR_MSG
};

/** 오류 메시지를 나타 내지 마십시오code */
export const NO_ERROR_MSG_CODE: (string | number)[] = [];

/** token시설을 상쾌하게해야합니다token的code(여기66666그냥 예입니다，백엔드를 표현해야합니다token만료되었습니다채우십시오e填进来) */
export const REFRESH_TOKEN_CODE: (string | number)[] = [66666];
