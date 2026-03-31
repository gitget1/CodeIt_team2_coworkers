import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

export function TeamDashboardApiLoading() {
  return (
    <div
      className="flex min-h-full flex-1 flex-col gap-6 bg-background-secondary p-4 md:p-6"
      role="status"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">팀 정보를 불러오는 중입니다.</span>
      <Skeleton className="h-[196px] w-full max-w-full rounded-[20px] md:h-[239px]" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-7 w-48 rounded-md" />
        <Skeleton className="min-h-[280px] w-full rounded-xl" />
      </div>
      <p className="text-center text-sm text-txt-secondary">팀 정보를 불러오는 중…</p>
    </div>
  );
}
