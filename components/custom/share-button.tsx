"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Mail,
  Link2,
  Share2,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import { baseUrl } from "@/lib/utils";

interface ShareButtonProps {
  course: {
    title: string;
    slug: string;
    summary: string;
  };
  className: string;
}

export default function ShareButton({ course, className }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const courseUrl = `${baseUrl}/courses/${course.slug}`;

  const handleSharing = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: course.title,
          text: course.summary,
          url: courseUrl,
        });
      } catch (error) {
        toast.error("Something went wrong");
        console.error("Error sharing content:", error);
      }
    } else {
      toast.error("Web Share API not supported in this browser.");
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(courseUrl);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log(err);
      toast.error("Failed to copy link");
    }
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        courseUrl
      )}&quote=${encodeURIComponent(course.summary)}`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        courseUrl
      )}&text=${encodeURIComponent(course.summary)}`,
      "_blank"
    );
  };

  const shareOnWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        `${course.title}: ${course.summary} ${courseUrl}`
      )}`,
      "_blank"
    );
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(
      course.title
    )}&body=${encodeURIComponent(
      `${course.summary}\n\nCheck out this course: ${courseUrl}`
    )}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          <Share2 className="w-5 h-5 mx-auto" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share this course</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2 mb-4">
          <div className="grid flex-1 gap-2">
            <Input readOnly value={courseUrl} />
          </div>
          <Button variant="secondary" className="px-3" onClick={copyLink}>
            <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
            <Link2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-around">
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={shareOnFacebook}>
            <Facebook className="w-5 h-5 text-blue-600" />
          </Button>
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={shareOnTwitter}>
            <Twitter className="w-5 h-5 text-sky-500" />
          </Button>
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={shareOnWhatsApp}>
            <MessageCircle className="w-5 h-5 text-green-500" />
          </Button>
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={shareViaEmail}>
            <Mail className="w-5 h-5 text-red-500" />
          </Button>
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={handleSharing}>
            <Share2 className="w-5 h-5 text-purple-500" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
