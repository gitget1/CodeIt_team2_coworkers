import { APiError } from '@/shared/types/apiError';

type ServerError = APiError & {
  code?: string;
};

const TASK_ERROR_MESSAGES = {
  TASK_NAME_TOO_SHORT: '할 일의 이름은 최소 2자 이상이어야 합니다.',
  TASK_ALREADY_EXISTS: '이미 존재하는 할 일이 있습니다.',
} as const;

type TaskErrorCode = keyof typeof TASK_ERROR_MESSAGES;

export function mapTaskError(error: ServerError) {
  const code = error.code as TaskErrorCode | undefined;

  if (code && TASK_ERROR_MESSAGES[code]) {
    return { message: TASK_ERROR_MESSAGES[code] };
  }

  return {
    message: '알 수 없는 오류가 발생했습니다.',
  };
}
