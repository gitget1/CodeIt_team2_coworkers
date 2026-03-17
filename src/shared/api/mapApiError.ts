import { AxiosError } from 'axios';

export function mapApiError(error: AxiosError) {
  if (!error.response) {
    return {
      message: '네트워크 오류가 발생했습니다.',
    };
  }

  const { status, data } = error.response;
  if (status === 401) {
    return { message: '로그인이 필요합니다.', status };
  }

  if (status === 403) {
    return { message: '권한이 없습니다.', status };
  }

  if (status === 404) {
    return { message: '데이터를 찾을 수 없습니다', status };
  }

  return {
    message: (data as any)?.message ?? '알 수 없는 오류가 발생했습니다.',
    status,
  };
}
