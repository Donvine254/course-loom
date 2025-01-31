import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";

export const CustomOverlay = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute h-full w-full bg-gray-500/10 dark:bg-indigo-500/50 top-0 right-0 rounded-m flex items-center justify-center z-50 cursor-wait",
        className
      )}>
      <Loader2 className="animate-spin h-6 w-6 text-indigo-600 dark:text-white" />
    </div>
  );
};
