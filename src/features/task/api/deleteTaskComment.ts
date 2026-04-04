import { clientFetcher } from '@/shared/lib/axios/client-fetcher';

export async function deleteTaskComment(taskId: number, commentId: number): Promise<void> {
  await clientFetcher.delete(`/tasks/${taskId}/comments/${commentId}`);
}
