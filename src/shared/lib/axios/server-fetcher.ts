import axios from 'axios';
import {
  ServerReq,
  ServerRes,
  withServerAuthInterceptor,
} from './interceptors/server-auth-interceptor';
import { mapApiError } from '@/shared/api/mapApiError';

const BASE_URL = process.env.API_BASE_URL;

export function ServerFetcher(req: ServerReq, res: ServerRes) {
  if (!BASE_URL) {
    throw new Error('API_BASE_URL is not defined');
  }

  const baseServerFetcher = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  });

  baseServerFetcher.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(mapApiError(error)),
  );

  return withServerAuthInterceptor(baseServerFetcher, req, res, BASE_URL);
}
