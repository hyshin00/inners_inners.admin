/** 요청 서비스의 환경 구성 */
type ServiceEnv = Record<ServiceEnvType, ServiceEnvConfig>;

/** 다른 요청 서비스의 환경 구성 */
const serviceEnv: ServiceEnv = {
  dev: {
    url: 'http://localhost:5050',
    urlPattern: '/url-pattern',
    secondUrl: 'http://localhost:5050',
    secondUrlPattern: '/second-url-pattern'
  },
  test: {
    url: 'http://localhost:8080',
    urlPattern: '/url-pattern',
    secondUrl: 'http://localhost:8081',
    secondUrlPattern: '/second-url-pattern'
  },
  prod: {
    url: 'http://localhost:8080',
    urlPattern: '/url-pattern',
    secondUrl: 'http://localhost:8081',
    secondUrlPattern: '/second-url-pattern'
  }
};

/**
 * 현재 환경 모드에서 요청 서비스 구성 가져 오기
 * @param env 주위
 */
export function getServiceEnvConfig(env: ImportMetaEnv) {
  const { VITE_SERVICE_ENV = 'dev' } = env;

  const config = serviceEnv[VITE_SERVICE_ENV];

  return config;
}
