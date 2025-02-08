import { Button } from "../ui/button";
import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from "../ui/tooltip";

interface PublishButtonProps {
  type: "course" | "chapter";
  handlePublish: (isPublished: boolean) => void;
  isCompleted: boolean;
  isPublished: boolean;
}

export default function PublishButton({
  handlePublish,
  isCompleted,
  isPublished,
  type,
}: PublishButtonProps) {
  const publishMessage =
    type === "course"
      ? "You must complete all fields to publish this course, including having at least one chapter published."
      : "You must complete all fields to publish this chapter.";

  const unpublishMessage =
    type === "chapter"
      ? "Warning: If this is the only published chapter in the course, unpublishing it will also unpublish the course."
      : "Unpublishing this course will make it inaccessible to students.";
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none h-10 px-4 py-2">
          <Button
            disabled={!isCompleted}
            variant="ghost"
            size="sm"
            title="complete all sections to publish"
            onClick={() => handlePublish(!isPublished)}>
            {isPublished ? "Unpublish" : "Publish"}
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
