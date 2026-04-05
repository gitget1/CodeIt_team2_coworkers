import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

const ROW_COUNT = 3;

export function TaskCommentsListSkeleton() {
  return (
    <div className="space-y-0" aria-busy="true" aria-label="댓글 불러오는 중">
      {Array.from({ length: ROW_COUNT }, (_, i) => (
        <div key={i} className="border-background-tertiary border-b py-4 last:border-b-0">
          <div className="flex gap-2">
            <Skeleton className="size-8 shrink-0 rounded-[8px]" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3.5 w-full max-w-md" />
              <Skeleton className="h-3.5 w-[92%] max-w-md" />
              <Skeleton className="h-3 w-14" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
