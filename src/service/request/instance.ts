import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { REFRESH_TOKEN_CODE } from '@/config';
import {
  getToken,
  handleAxiosError,
  handleBackendError,
  handleResponseError,
  handleServiceResult,
  transformRequestData
} from '@/utils';
import { handleRefreshToken } from './helpers';

/**
 * 캡슐화axios요청 클래스
 * @author innerS<honghuangdc@gmail.com>
 */
export default class CustomAxiosInstance {
  instance: AxiosInstance;

  backendConfig: Service.BackendResultConfig;

  /**
   *
   * @param axiosConfig - axios구성
   * @param backendConfig - 데이터 구성이 백엔드에서 반환되었습니다
   */
  constructor(
    axiosConfig: AxiosRequestConfig,
    backendConfig: Service.BackendResultConfig = {
      codeKey: 'code',
      dataKey: 'data',
      msgKey: 'message',
      successCode: 200
    }
  ) {
    this.backendConfig = backendConfig;
    this.instance = axios.create(axiosConfig);
    this.setInterceptor();
  }

  /** 요청 인터셉터를 설정하십시오 */
  setInterceptor() {
    this.instance.interceptors.request.use(
      async config => {
        const handleConfig = { ...config };
        if (handleConfig.headers) {
          // 데이터 변환
          const contentType = handleConfig.headers['Content-Type'] as string;
          handleConfig.data = await transformRequestData(handleConfig.data, contentType);
          // 설정token
          handleConfig.headers.Authorization = `Bearer ${getToken()}`;
          // handleConfig.headers.Authorization = `${getToken()}`;
        }
        return handleConfig;
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
    this.instance.interceptors.response.use(
      async response => {
        const { status } = response;
        if (status === 200 || status < 300 || status === 304) {
          const backend = response.data;
          const { codeKey, dataKey, successCode } = this.backendConfig;
          // 성공적인 요청
          if (backend[codeKey] === successCode) {
            return handleServiceResult(null, backend[dataKey]);
          }

          // token불합격,새로 고치다新token
          if (REFRESH_TOKEN_CODE.includes(backend[codeKey])) {
            const config = await handleRefreshToken(response.config);
            if (config) {
              return this.instance.request(config);
            }
          }

          const error = handleBackendError(backend, this.backendConfig);
          return handleServiceResult(error, null);
        }
        const error = handleResponseError(response);
        return handleServiceResult(error, null);
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
  }
}
