import axios from 'axios';
import { withClientAuthInterceptor } from './interceptors/client-auth-interceptor';

const baseClientFetcher = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
});

export const clientFetcher = withClientAuthInterceptor(baseClientFetcher);
