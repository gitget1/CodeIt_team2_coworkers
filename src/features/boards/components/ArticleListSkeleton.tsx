import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

export default function ArticleListSkeleton() {
  return (
    <div className="grid w-full max-w-[1074px] grid-cols-1 gap-3 lg:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-39 rounded-xl border border-slate-200 px-6 py-5">
          <div className="flex justify-between">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            <Skeleton className="h-22 w-22 rounded" />
          </div>

          <div className="mt-4 flex justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
