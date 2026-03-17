import { APiError } from '@/shared/types/apiError';

type ServerError = APiError & {
  code?: string;
};

export function mapTaskError(error: ServerError) {
  switch (error.code) {
    case 'TASK_NAME_TOO_SHORT':
      return { message: '할 일의 이름은 최소 2자 이상이어야 합니다.' };

    case 'TASK_ALREADY_EXISTS':
      return { message: '이미 존재하는 할 일이 있습니다.' };

    default:
      return error;
  }
}
