import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { useUpdateGroupMutation } from '@/features/group/hooks/useUpdateGroupMutation';
import type { GroupDetail } from '@/features/group/model/entities/group.model';
import { TeamEditCard } from '@/shared/ui/team/TeamEditCard';
import { teamDashboardPath } from '@/shared/constants/routes';
import { mapApiError } from '@/shared/api/mapApiError';

type Props = {
  group: GroupDetail;
};

export function TeamEditPageContent({ group }: Props) {
  const router = useRouter();
  const { mutateAsync } = useUpdateGroupMutation();

  return (
    <>
      <Head>
        <title>팀 수정하기 | Coworkers</title>
        <meta name="description" content="팀 이름을 수정합니다." />
      </Head>

      <div className="box-border flex min-h-full flex-1 flex-col items-center justify-center overflow-y-auto bg-[#F4F7F9] px-4 py-8 sm:px-6">
        <TeamEditCard
          className="shrink-0"
          defaultName={group.name}
          onSubmit={async ({ name }) => {
            const trimmed = name.trim();
            if (!trimmed) {
              toast.error('팀 이름을 입력해주세요.');
              return;
            }
            try {
              await mutateAsync({
                groupId: group.id,
                body: { name: trimmed },
              });
              toast.success('팀 정보가 수정되었습니다.');
              await router.push(teamDashboardPath(String(group.id)));
            } catch (error) {
              toast.error(mapApiError(error).message);
            }
          }}
        />
      </div>
    </>
  );
}
