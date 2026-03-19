import { Skeleton } from "@/shared/ui/skeleton/Skeleton"

export default function PostCardSkeleton() {
  return (
    <div className="space-y-3 rounded-lg border p-4">
      <Skeleton className="h-6 w-2/3" />

      <Skeleton className="h-40 w-full rounded-md" />
    </div>

  )
}
