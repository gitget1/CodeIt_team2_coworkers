import { ACCESS_TOKEN_MAX_AGE, COOKIE_OPTIONS } from '@/shared/constants/auth';
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

  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh Token이 없습니다' });
  }

  try {
    const { data } = await axios.post<{ accessToken: string }>(`${BASE_URL}/auth/refresh-token`, {
      refreshToken,
    });

    res.setHeader(
      'Set-Cookie',
      serialize('accessToken', data.accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: ACCESS_TOKEN_MAX_AGE,
      }),
    );

    return res.status(200).json({ success: true, accessToken: data.accessToken });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return res.status(error.response?.status || 401).json({
        message: '올바르지 않은 refresh token입니다',
      });
    }

    return res.status(500).json({ message: '서버 에러가 발생했습니다' });
  }
}
