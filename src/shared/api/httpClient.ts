import axios, { AxiosError } from 'axios';
import { mapApiError } from './mapApiError';

// TODO: 환경변수로 관리할 예정
const NEXT_PUBLIC_API_BASE_URL = `https://fe-project-cowokers.vercel.app`;

const httpClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  withCredentials: true,
});

// 상태 코드 기반의 공통 에러만 처리 도메인별 에러 처리는 각 API레이어에서 수행
httpClient.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    return Promise.reject(mapApiError(error));
  },
);
export default httpClient;
