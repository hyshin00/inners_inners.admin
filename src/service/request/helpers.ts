import type { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store';
import { getRefreshToken, setRefreshToken, setToken } from '@/utils';
import { fetchUpdateToken } from '../api';

/**
 * 새로 고치다token
 * @param axiosConfig - token요청 구성이 무효화 될 때
 */
export async function handleRefreshToken(axiosConfig: AxiosRequestConfig) {
  const { resetAuthStore } = useAuthStore();
  const refreshToken = getRefreshToken();
  const { data } = await fetchUpdateToken(refreshToken);
  if (data) {
    setToken(data.token);
    setRefreshToken(data.refreshToken);
    const config = { ...axiosConfig };
    if (config.headers) {
      config.headers.Authorization = data.token;
    }
    return config;
  }

  resetAuthStore();
  return null;
}
