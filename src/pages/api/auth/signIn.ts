import {
  ACCESS_TOKEN_MAX_AGE,
  COOKIE_OPTIONS,
  REFRESH_TOKEN_MAX_AGE,
} from '@/shared/constants/auth';
import { ApiError } from '@/shared/types/apiError';
import axios, { isAxiosError } from 'axios';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.API_BASE_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '올바르지 않은 접근입니다' });
  }

  if (!BASE_URL) {
    return res.status(500).json({ message: 'API_BASE_URL이 정의되지 않았습니다' });
  }

  try {
    const response = await axios.post(`${BASE_URL}/auth/signIn`, req.body);
    const { accessToken, refreshToken, user } = response.data;

    res.setHeader('Set-Cookie', [
      serialize('accessToken', accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: ACCESS_TOKEN_MAX_AGE,
      }),
      serialize('refreshToken', refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: REFRESH_TOKEN_MAX_AGE,
      }),
    ]);

    return res.status(200).json({ user });
  } catch (error: unknown) {
    if (isAxiosError<ApiError>(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || '알 수 없는 에러가 발생했습니다.';

      return res.status(status).json({ message });
    }

    return res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
  }
}
