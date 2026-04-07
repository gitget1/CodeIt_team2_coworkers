import {
  ACCESS_TOKEN_MAX_AGE,
  COOKIE_OPTIONS,
  REFRESH_TOKEN_MAX_AGE,
} from '@/shared/constants/auth';
import backendFetcher from '@/shared/lib/axios/backend-fetcher';
import { ApiError } from '@/shared/types/apiError';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'status' in error && 'message' in error;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '올바르지 않은 접근입니다' });
  }

  try {
    const { data } = await backendFetcher.post('/auth/signIn/KAKAO', req.body);
    const { accessToken, refreshToken, user } = data;

    res.setHeader('Set-Cookie', [
      serialize('accessToken', accessToken, { ...COOKIE_OPTIONS, maxAge: ACCESS_TOKEN_MAX_AGE }),
      serialize('refreshToken', refreshToken, { ...COOKIE_OPTIONS, maxAge: REFRESH_TOKEN_MAX_AGE }),
    ]);

    return res.status(200).json({ user });
  } catch (error: unknown) {
    if (isApiError(error)) {
      return res
        .status(error.status || 500)
        .json({ message: error.message || '서버 오류가 발생했습니다.' });
    }
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: '알 수 없는 서버 오류가 발생했습니다.' });
  }
}
