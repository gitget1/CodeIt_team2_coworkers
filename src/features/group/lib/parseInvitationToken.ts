/**
 * 복사한 초대 URL, 경로+쿼리, 또는 토큰 문자열에서 초대 토큰을 추출합니다.
 * `new URL(..., base)` / localhost 기준 URL은 사용하지 않습니다(환경에 따라 잘못된 기준이 됨).
 */

/**
 * 스킴이 있는 절대 URL은 `https:`만 허용합니다(`http:`, `javascript:` 등 차단).
 * 경로·쿼리만 있는 문자열(`/accept-invitation?token=`)은 스킴이 없으므로 허용합니다.
 */
const URL_SCHEME_PATTERN = /^([a-z][a-z0-9+.-]*):/i;

/**
 * `?token=` 또는 `&token=` 뒤의 값만 캡처합니다. 다음 `&` 전까지.
 * application/x-www-form-urlencoded 에서 공백이 `+`로 온 경우 디코딩 전에 치환합니다.
 */
const TOKEN_QUERY_PARAM_PATTERN = /[?&]token=([^&]+)/;

function decodeCapturedTokenValue(rawTokenValue: string): string {
  return decodeURIComponent(rawTokenValue.replace(/\+/g, ' '));
}

export function parseInvitationToken(input: string): string | null {
  const trimmedInput = input.trim();
  if (!trimmedInput) return null;

  const schemeMatch = trimmedInput.match(URL_SCHEME_PATTERN);
  if (schemeMatch && schemeMatch[1].toLowerCase() !== 'https') {
    return null;
  }

  const tokenQueryMatch = trimmedInput.match(TOKEN_QUERY_PARAM_PATTERN);
  if (tokenQueryMatch) {
    return decodeCapturedTokenValue(tokenQueryMatch[1]);
  }

  /** `?` `/` 없이 붙여 넣은 순수 토큰 문자열 */
  if (!/[/?]/.test(trimmedInput)) {
    return trimmedInput;
  }

  return null;
}
