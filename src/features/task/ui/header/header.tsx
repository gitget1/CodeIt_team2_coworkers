import { cn } from '@/shared/lib/cn';
import { ReactNode } from 'react';
import Breadcrumb from './breadcrumb';
import { useTaskParams } from '../../lib/useTaskParams';
import { useGroupQuery } from '@/features/group';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

type Props = {
  right?: ReactNode;
  className?: string;
};

export default function Header({ right, className }: Props) {
  const { groupId } = useTaskParams();
  const { data: group, isLoading } = useGroupQuery(groupId);
  if (isLoading) {
    return <Skeleton className="h-10 w-full max-w-[720px] rounded-xl" />;
  }
  const breadcrumbItems = [
    { label: group?.name ?? '', href: `/group/${groupId}` },
    { label: '법인 등기' },
  ];
  /**TODO:
   * BreadcrumbItem의 할일 리스트는
   * 임시 데이터로 실제 데이터 변경 시
   * 연결 작업 및 경로 수정 필요
   */

  return (
    <header
      className={cn(
        'bg-background-secondary flex w-full max-w-[720px] items-center justify-between rounded-xl px-6 py-4 text-2xl',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="flex items-center gap-2">{right}</div>
    </header>
  );
}
