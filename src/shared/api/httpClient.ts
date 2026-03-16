import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

// TODO: 환경변수로 관리할 예정
const NEXT_PUBLIC_API_BASE_URL = `https://fe-project-cowokers.vercel.app`;

const httpClient = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

export default httpClient;
