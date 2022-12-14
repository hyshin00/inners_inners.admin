/**
 *환경 유형 배경 서비스
 * - dev: 배경 개발 환경
 * - test: 배경 테스트 환경
 * - prod: 배경 생산 환경
 */
type ServiceEnvType = 'dev' | 'test' | 'prod';

/** 배경 서비스의 환경 구성 */
interface ServiceEnvConfig {
  /** 요청 주소 */
  url: string;
  /** 일치하는 경로의 일반 문자열, 주소 전달 에이전트를 가로 채기 위해 사용됩니다(모든 /시작 + 문자열, 단일 /부적합한 효과) */
  urlPattern: '/url-pattern';
  /** 다른 백 -엔드 요청 주소 (여러 다른 백 -엔드 서비스가있을 때) */
  secondUrl: string;
  /** 일치하는 경로의 일반 문자열, 주소 전달 에이전트를 가로 채기 위해 사용됩니다(모든 /시작 + 문자열, 단일 /부적합한 효과) */
  secondUrlPattern: '/second-url-pattern';
}

interface ImportMetaEnv {
  /** 프로젝트 기본 주소 */
  readonly VITE_BASE_URL: string;
  /** 프로젝트 이름 */
  readonly VITE_APP_NAME: string;
  /** 프로젝트 제목 */
  readonly VITE_APP_TITLE: string;
  /** 프로젝트 설명 */
  readonly VITE_APP_DESC: string;
  /**
   * 권한 라우팅 모드:
   * - static - 전면 -엔드 문의 정적
   * - dynamic - 백엔드의 역학
   */
  readonly VITE_AUTH_ROUTE_MODE: 'static' | 'dynamic';
  /** 라우팅 홈페이지의 경로 */
  readonly VITE_ROUTE_HOME_PATH: Exclude<AuthRoute.RoutePath, '/' | '/not-found-page' | '/:pathMatch(.*)*'>;
  /** iconify아이콘은 구성 요소로서 접두사입니다 */
  readonly VITE_ICON_PREFFIX: string;
  /**
   * 로컬 SVG 아이콘 구성 요소로서의 접두사, 포함해야합니다 VITE_ICON_PREFFIX
   * - 체재 {VITE_ICON_PREFFIX}-{로컬 아이콘 수집 이름}
   * - 예를 들어：icon-local
   */
  readonly VITE_ICON_LOCAL_PREFFIX: string;
  /** 백 -엔드 서비스의 환경 유형 */
  readonly VITE_SERVICE_ENV?: ServiceEnvType;
  /** 요청 에이전트를 엽니 다 */
  readonly VITE_HTTP_PROXY?: 'Y' | 'N';
  /** 패키지 파일 크기 결과 분석을 열는지 여부 */
  readonly VITE_VISUALIZER?: 'Y' | 'N';
  /** 포장 및 압축 여부 */
  readonly VITE_COMPRESS?: 'Y' | 'N';
  /** 압축 알고리즘 유형 */
  readonly VITE_COMPRESS_TYPE?: 'gzip' | 'brotliCompress' | 'deflate' | 'deflateRaw';
  /** hash라우팅 모드 */
  readonly VITE_HASH_ROUTE?: 'Y' | 'N';
  /** 배포되는지 여부vercel */
  readonly VITE_VERCEL?: 'Y' | 'N';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
