import { EXPIRED_COOKIE_OPTIONS } from '@/shared/constants/auth';
import { serialize } from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '올바르지 않은 접근입니다.' });
  }

  res.setHeader('Set-Cookie', [
    serialize('accessToken', '', EXPIRED_COOKIE_OPTIONS),
    serialize('refreshToken', '', EXPIRED_COOKIE_OPTIONS),
  ]);

  return res.status(200).json({ success: true });
}
