import axios from 'axios';
import type { ApiError } from '../types/apiError';

type ApiErrorResponse = {
  message?: string;
  code?: string;
};

const STATUS_ERROR_MESSAGES: Record<number, string> = {
  401: '로그인이 필요합니다.',
  403: '권한이 없습니다.',
  404: '데이터를 찾을 수 없습니다.',
} as const;

export function mapApiError(error: unknown): ApiError {
  if (!axios.isAxiosError(error)) {
    return {
      message: '알 수 없는 오류가 발생했습니다.',
    };
  }
  if (!error.response) {
    return {
      message: '네트워크 오류가 발생했습니다.',
    };
  }

  const { status, data } = error.response;
  const serverData = data as ApiErrorResponse | undefined;

  const mappedMessage = STATUS_ERROR_MESSAGES[status];

  return {
    message: serverData?.message ?? mappedMessage ?? '알 수 없는 오류가 발생했습니다.',
    status,
    code: serverData?.code,
  };
}
