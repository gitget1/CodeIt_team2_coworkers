import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

export default function BestArticleSkeleton() {
  return (
    <div className="mx-auto w-fit">
      <Skeleton className="h-6 w-40" />

      <div className="flex gap-4 pt-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-51.25 w-85 rounded-xl border border-slate-200 bg-white px-5 py-6"
          >
            <Skeleton className="h-5 w-16 rounded-full" />

            <div className="mt-4 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-2 w-2 rounded-full" />
        ))}
      </div>
    </div>
  );
}
