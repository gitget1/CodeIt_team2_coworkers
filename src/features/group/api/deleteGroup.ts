import { clientFetcher } from '@/shared/lib/axios/client-fetcher';

export interface DeleteGroupParams {
  groupId: number;
}
export async function deleteGroup({ groupId }: DeleteGroupParams): Promise<void> {
  await clientFetcher.delete(`/groups/${groupId}`);
}
