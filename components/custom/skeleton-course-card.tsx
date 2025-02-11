import { Skeleton } from "@/components/ui/skeleton";
import { ImageIcon } from "lucide-react";

export function SkeletonCourseCard() {
  return (
    <div className="border dark:border-gray-900 shadow bg-card dark:bg-gray-950 dark:text-white rounded-md dark:shadow-indigo-700">
      <div className="aspect-video w-full relative overflow-hidden rounded-t-md">
        <Skeleton className="absolute inset-0">
          <div className="flex items-center justify-center h-full bg-muted rounded-t-md">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
          </div>
        </Skeleton>
      </div>
      <div className="py-6 px-3 space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24 rounded-lg" />
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
}
