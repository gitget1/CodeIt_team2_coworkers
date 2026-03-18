import { ApiError } from '@/shared/types/apiError';
import { Failure } from '@/shared/types/result';

const TASK_ERROR_MESSAGES = {
  TASK_NOT_FOUND: '존재하지 않는 할 일입니다.',
  TASK_ALREADY_EXISTS: '이미 존재하는 할 일이 있습니다.',
} as const;

type TaskErrorCode = keyof typeof TASK_ERROR_MESSAGES;

export function mapTaskErrorToFailure(error: ApiError): Failure<ApiError> {
  const code = error.code as TaskErrorCode | undefined;

  const finalError =
    code && TASK_ERROR_MESSAGES[code] ? { ...error, message: TASK_ERROR_MESSAGES[code] } : error;

  return {
    ok: false,
    error: finalError,
  };
}
