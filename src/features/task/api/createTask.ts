import httpClient from '@/shared/api/httpClient';
import { mapTaskError } from './mapTaskError';

export async function createTask() {
  try {
    const res = await httpClient.post('/tasks');
    return res.data;
  } catch (error) {
    throw mapTaskError(error as any);
  }
}

// TODO:
// 현재 API 레이어에서 에러를 throw만 하고 있음
// 추후 React Query 전역 onError와 UI를 연결하여
// UI 레이어에서 에러 메시지를 표시하도록 처리 예정
