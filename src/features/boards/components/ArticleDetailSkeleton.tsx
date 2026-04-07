import { Skeleton } from "@/shared/ui/skeleton/Skeleton";


export default function ArticleDetailSkeleton() {
  return (
    <div className="space-y-4 mt-7">

      
      <Skeleton className="h-6 w-2/3" />

      
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <Skeleton className="h-6 w-6 rounded-[6px]" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-10" />
      </div>

   
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-4 w-3/6" />
      </div>

   
      <Skeleton className="h-35 w-35 rounded-xl" />

  
      <div className="mt-6 flex justify-between">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-10" />
      </div>

    
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-8 rounded-[6px]" />
        <Skeleton className="h-8 flex-1" />
      </div>

   
      <div className="mt-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="h-8 w-8 rounded-[6px]" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}