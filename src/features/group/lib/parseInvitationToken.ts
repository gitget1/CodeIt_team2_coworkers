/**
 * 복사한 초대 URL, 경로+쿼리, 또는 토큰 문자열에서 초대 토큰을 추출합니다.
 */
export function parseInvitationToken(input: string): string | null {
  const s = input.trim();
  if (!s) return null;

  const fromQueryString = (q: string): string | null => {
    const m = q.match(/[?&]token=([^&]+)/);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  };

  if (s.includes('://') || s.startsWith('/')) {
    try {
      const url = /^https?:\/\//i.test(s)
        ? new URL(s)
        : new URL(s, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
      const t = url.searchParams.get('token');
      if (t) return t;
    } catch {
      /* fall through */
    }
  }

  const fromQs = fromQueryString(s);
  if (fromQs) return fromQs;

  if (!/[/?]/.test(s)) return s;

  return null;
}
