import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { serialize } from 'cookie';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';

export type ServerReq = NextApiRequest | GetServerSidePropsContext['req'];
export type ServerRes = NextApiResponse | GetServerSidePropsContext['res'];

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
};

function appendSetCookie(res: ServerRes, cookies: string | string[]) {
  const prev = res.getHeader('Set-Cookie');
  const prevArray = prev ? (Array.isArray(prev) ? prev : [String(prev)]) : [];
  const nextArray = Array.isArray(cookies) ? cookies : [cookies];

  res.setHeader('Set-Cookie', [...prevArray, ...nextArray]);
}

function setAccessTokenCookie(res: ServerRes, accessToken: string) {
  appendSetCookie(res, serialize('accessToken', accessToken, cookieOptions));
}

function clearAuthCookies(res: ServerRes) {
  appendSetCookie(res, [
    serialize('accessToken', '', { ...cookieOptions, maxAge: 0 }),
    serialize('refreshToken', '', { ...cookieOptions, maxAge: 0 }),
  ]);
}

const refreshClient = axios.create();

export function withServerAuthInterceptor(
  instance: AxiosInstance,
  req: ServerReq,
  res: ServerRes,
  baseURL: string,
): AxiosInstance {
  let currentAccessToken = req.cookies.accessToken ?? null;
  const refreshToken = req.cookies.refreshToken;
  let refreshPromise: Promise<string> | null = null;

  instance.interceptors.request.use((config) => {
    if (currentAccessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${currentAccessToken}`;
    }

    return config;
  });

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

      if (originalRequest._retry || !refreshToken) {
        currentAccessToken = null;
        clearAuthCookies(res);
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshClient
            .post<{ accessToken: string }>(`${baseURL}/auth/refresh-token`, {
              refreshToken,
            })
            .then(({ data }) => data.accessToken)
            .finally(() => {
              refreshPromise = null;
            });
        }

        currentAccessToken = await refreshPromise;
        setAccessTokenCookie(res, currentAccessToken);

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${currentAccessToken}`;

        return instance(originalRequest);
      } catch (refreshError) {
        currentAccessToken = null;
        clearAuthCookies(res);
        return Promise.reject(refreshError);
      }
    },
  );

  return instance;
}
