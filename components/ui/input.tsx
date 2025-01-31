import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border bg-gray-100 dark:bg-input  px-3 py-2 text-base ring-offset-background  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:bg-background focus-visible:ring-indigo-500 disabled:cursor-not-allowed  md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
