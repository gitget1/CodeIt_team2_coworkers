import { ApiError } from '@/shared/types/apiError';
import { Failure } from '@/shared/types/result';

const TASK_ERROR_MESSAGES = {
  TASK_NOT_FOUND: '존재하지 않는 할 일입니다.',
  TASK_ALREADY_EXISTS: '이미 존재하는 할 일이 있습니다.',
} as const;

type TaskErrorCode = keyof typeof TASK_ERROR_MESSAGES;

function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'message' in error;
}

function isTaskErrorCode(code: unknown): code is TaskErrorCode {
  return typeof code === 'string' && code in TASK_ERROR_MESSAGES;
}

export function mapTaskErrorToFailure(error: unknown): Failure<ApiError> {
  if (!isApiError(error)) {
    return {
      ok: false,
      error: {
        message: '알 수 없는 오류가 발생했습니다.',
      },
    };
  }
  const code = error.code;
  if (isTaskErrorCode(code)) {
    return {
      ok: false,
      error: {
        ...error,
        message: TASK_ERROR_MESSAGES[code],
      },
    };
  }
  return {
    ok: false,
    error,
  };
}
