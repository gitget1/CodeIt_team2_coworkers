import axios from 'axios';
import type { ApiError } from '../types/apiError';

/** `clientFetcher` 등에서 `mapApiError`로 거절된 값 여부 (단언 없이 catch 분기용) */
export function isApiError(error: unknown): error is ApiError {
  if (typeof error !== 'object' || error === null) return false;
  const o = error as Record<string, unknown>;
  return typeof o.message === 'string';
}

type ApiErrorResponse = {
  message?: string;
  code?: string;
};

const DEFAULT_ERROR_MESSAGE = '알 수 없는 오류가 발생했습니다.';

const STATUS_ERROR_MESSAGES: Record<number, string> = {
  401: '로그인이 필요합니다.',
  403: '권한이 없습니다.',
};

function isApiErrorResponse(data: unknown): data is ApiErrorResponse {
  if (typeof data !== 'object' || data === null) return false;

  const d = data as Record<string, unknown>;

  return (
    ('message' in d ? typeof d.message === 'string' : true) &&
    ('code' in d ? typeof d.code === 'string' : true)
  );
}

export function mapApiError(error: unknown): ApiError {
  if (!axios.isAxiosError(error)) {
    return {
      message: DEFAULT_ERROR_MESSAGE,
    };
  }

  if (!error.response) {
    return {
      message: '네트워크 오류가 발생했습니다.',
    };
  }

  const { status, data } = error.response;
  const responseData = isApiErrorResponse(data) ? data : undefined;

  const message = STATUS_ERROR_MESSAGES[status] ?? responseData?.message ?? DEFAULT_ERROR_MESSAGE;

  return {
    message,
    status,
    code: responseData?.code,
  };
}
