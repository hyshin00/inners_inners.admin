import type { ProxyOptions } from 'vite';

/**
 * 네트워크 프록시를 설정하십시오
 * @param isOpenProxy - 에이전트를 열 것인지 여부
 * @param envConfig - env환경 구성
 */
export function createViteProxy(isOpenProxy: boolean, envConfig: ServiceEnvConfig) {
  if (!isOpenProxy) return undefined;

  const proxy: Record<string, string | ProxyOptions> = {
    [envConfig.urlPattern]: {
      target: envConfig.url,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${envConfig.urlPattern}`), '')
    },
    [envConfig.secondUrlPattern]: {
      target: envConfig.secondUrl,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${envConfig.secondUrlPattern}`), '')
    }
  };

  return proxy;
}
