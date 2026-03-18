import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const isAuthPage = (pathname: string) => pathname === '/login' || pathname === '/signup';

let refreshPromise: Promise<void> | null = null;

const refreshClient = axios.create({
  withCredentials: true,
});

async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post('/api/auth/refresh-token')
      .then(() => undefined)
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

let isRedirecting = false;

async function handleAuthFailure() {
  if (isRedirecting) return;
  isRedirecting = true;

  try {
    await refreshClient.post('/api/auth/signOut');
  } catch (error) {
    console.warn('로그아웃 요청 실패:', error);
  }

  if (typeof window !== 'undefined') {
    if (!isAuthPage(window.location.pathname)) {
      window.location.href = '/login';
    }
  }
}

export function withClientAuthInterceptor(instance: AxiosInstance): AxiosInstance {
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryableRequestConfig | undefined;
      const status = error.response?.status;

      if (!originalRequest || status !== 401) {
        return Promise.reject(error);
      }

      if (originalRequest.skipAuthRefresh) {
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        if (!originalRequest.skipAuthFailureRedirect) {
          await handleAuthFailure();
        }
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        await refreshAccessToken();
        return instance(originalRequest);
      } catch (refreshError) {
        if (!originalRequest.skipAuthFailureRedirect) {
          await handleAuthFailure();
        }
        return Promise.reject(refreshError);
      }
    },
  );
  return instance;
}
