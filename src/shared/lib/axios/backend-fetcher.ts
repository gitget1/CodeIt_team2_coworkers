import { mapApiError } from '@/shared/api/mapApiError';
import axios, { AxiosError } from 'axios';

const BASE_URL = process.env.API_BASE_URL;

if (!BASE_URL) {
  throw new Error('API_BASE_URL이 정의되지 않았습니다.');
}

const backendFetcher = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

backendFetcher.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(mapApiError(error));
  },
);

export default backendFetcher;
