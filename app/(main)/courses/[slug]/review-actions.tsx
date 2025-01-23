"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  MoreVertical,
  ThumbsDown,
  ThumbsUp,
  TriangleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export const ReviewActions = () => {
  const [helpful, setHelpful] = useState<"up" | "down" | null>(null); //
  const [popoverOpen, setPopoverOpen] = useState(false);
  const handleAction = (action: "up" | "down") => {
    setHelpful(action);
    setPopoverOpen(false);
    toast.success("Thanks for your feedback!", {
      position: "top-center",
    });
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          title="report"
          aria-label="report"
          className="h-8 w-8 p-0 hover:bg-indigo-100 hover:text-gray-950 absolute right-2 top-2">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 space-y-4">
        <Button
          variant="ghost"
          type="button"
          className="w-full justify-start gap-4 text-destructive hover:bg-destructive hover:text-white"
          title="Report review as inappropriate">
          <TriangleAlert className="h-4 w-4" />
          Report
        </Button>
        <Separator />
        <div className="flex items-center justify-center gap-2 mt-2 text-muted-foreground text-sm w-full">
          <p>Helpful? </p>
          <ThumbsUp
            className={`h-4 w-4 cursor-pointer ${
              helpful === "up" ? "text-green-500" : "hover:text-green-500"
            }`}
            onClick={() => handleAction("up")}
          />
          <ThumbsDown
            className={`h-4 w-4 cursor-pointer ${
              helpful === "down" ? "text-destructive" : "hover:text-destructive"
            }`}
            onClick={() => handleAction("down")}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
