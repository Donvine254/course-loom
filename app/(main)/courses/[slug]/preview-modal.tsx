import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";

interface VideoPreviewModalProps {
  videoUrl: string;
  title: string;
}

export function VideoPreviewModal({ videoUrl, title }: VideoPreviewModalProps) {
  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button className="border border-gray-200 hover:border-background justify-start gap-2">
          <Play className="h-4 w-4" />
          Preview this Course
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            src={videoUrl}
            title="Course Preview"
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
