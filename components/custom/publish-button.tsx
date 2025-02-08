"use client";
import { Button } from "../ui/button";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "../ui/tooltip";
import { Loader2 } from "lucide-react";

interface PublishButtonProps {
  type: "course" | "chapter";
  handlePublish: (isPublished: boolean) => void;
  isCompleted: boolean;
  isPublished: boolean;
  isPublishing: boolean;
}

export default function PublishButton({
  handlePublish,
  isCompleted,
  isPublished,
  isPublishing,
  type,
}: PublishButtonProps) {
  const publishMessage =
    type === "course"
      ? "You must complete all fields to publish this course, including having at least one chapter published."
      : "You must complete all fields to publish this chapter.";

  const unpublishMessage =
    type === "chapter"
      ? "Warning: If this is the only published chapter in the course, un-publishing it will also unpublish the course."
      : "Un-publishing this course will make it inaccessible to students.";
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={!isCompleted || isPublishing}
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => {
              handlePublish(!isPublished);
            }}>
            {isPublishing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isPublished ? (
              "Unpublish"
            ) : (
              "Publish"
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className="max-w-52"
          side="bottom"
          data-state="delayed-open">
          <p>{isPublished ? unpublishMessage : publishMessage}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
