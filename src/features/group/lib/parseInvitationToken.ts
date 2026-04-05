/**
 * 복사한 초대 URL, 경로+쿼리, 또는 토큰 문자열에서 초대 토큰을 추출합니다.
 * `new URL(..., base)` / localhost 기준 URL은 사용하지 않습니다(환경에 따라 잘못된 기준이 됨).
 */

/**
 * 스킴이 있는 절대 URL은 `https:` 또는 로컬 한정 `http://localhost|127.0.0.1`만 허용합니다.
 * 경로·쿼리만 있는 문자열(`/accept-invitation?token=`)은 스킴이 없으므로 허용합니다.
 */
const URL_SCHEME_PATTERN = /^([a-z][a-z0-9+.-]*):/i;

/** 프로덕션은 https만. 로컬 초대 링크는 `window.location.origin`이 http일 수 있음. */
const LOCAL_HTTP_ORIGIN_PATTERN = /^http:\/\/(localhost|127\.0\.0\.1)(?::\d+)?/i;

function isAllowedAbsoluteUrlScheme(scheme: string, fullInput: string): boolean {
  const s = scheme.toLowerCase();
  if (s === 'https') return true;
  if (s === 'http') return LOCAL_HTTP_ORIGIN_PATTERN.test(fullInput);
  return false;
}

/**
 * `?token=` 또는 `&token=` 뒤의 값만 캡처합니다. 다음 `&` 전까지.
 *
 * 초대 링크는 `encodeURIComponent(token)`으로 만들어지므로 `decodeURIComponent`만 적용합니다.
 * (토큰 본문에 `+`가 있어도 쿼리에서는 `%2B`로 오므로, `+`→공백 치환은 하지 않습니다.)
 */
const TOKEN_QUERY_PARAM_PATTERN = /[?&]token=([^&]+)/;

function decodeCapturedTokenValue(rawTokenValue: string): string {
  return decodeURIComponent(rawTokenValue);
}

export function parseInvitationToken(input: string): string | null {
  const trimmedInput = input.trim();
  if (!trimmedInput) return null;

  const schemeMatch = trimmedInput.match(URL_SCHEME_PATTERN);
  if (schemeMatch && !isAllowedAbsoluteUrlScheme(schemeMatch[1], trimmedInput)) {
    return null;
  }

  const tokenQueryMatch = trimmedInput.match(TOKEN_QUERY_PARAM_PATTERN);
  if (tokenQueryMatch) {
    try {
      return decodeCapturedTokenValue(tokenQueryMatch[1]);
    } catch {
      return null;
    }
  }

  /** `?` `/` 없이 붙여 넣은 순수 토큰 문자열 */
  if (!/[/?]/.test(trimmedInput)) {
    return trimmedInput;
  }

  return null;
}
