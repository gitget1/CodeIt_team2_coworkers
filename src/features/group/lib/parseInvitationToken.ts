/**
 * 복사한 초대 URL, 경로+쿼리, 또는 토큰 문자열에서 초대 토큰을 추출합니다.
 * `new URL(..., base)` / localhost 기준 URL은 사용하지 않습니다(환경에 따라 잘못된 기준이 됨).
 */

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
