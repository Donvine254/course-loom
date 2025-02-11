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
import { Mail, Link2, Share2, MoreHorizontal, Check } from "lucide-react";
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
          <Button
            variant="secondary"
            className="px-3 hover:bg-indigo-500 hover:text-white"
            onClick={copyLink}
            type="button"
            title="copy link">
            <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Link2 className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex justify-around">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            title="share on facebook"
            className="rounded-full bg-[#3B5998] text-white hover:bg-blue-600 hover:text-white"
            onClick={shareOnFacebook}>
            <svg
              fill="currentColor"
              viewBox="0 0 500 1000"
              height="20"
              width="20">
              <title>Facebook</title>
              <path d="M500 206H358c-9.333 0-17.667 5-25 15-7.333 10-11 22.333-11 37v102h178v148H322v442H152V508H0V360h152v-86c0-62.667 19.667-115.667 59-159s88.333-65 147-65h142v156" />
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            title="Share on twitter"
            className="rounded-full bg-indigo-100 hover:bg-indigo-200"
            onClick={shareOnTwitter}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.3263 1.90381H21.6998L14.3297 10.3273L23 21.7898H16.2112L10.894 14.8378L4.80995 21.7898H1.43443L9.31743 12.7799L1 1.90381H7.96111L12.7674 8.25814L18.3263 1.90381ZM17.1423 19.7706H19.0116L6.94539 3.81694H4.93946L17.1423 19.7706Z"
                fill="#222222"></path>
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            title="Share on whatsapp"
            className="rounded-full bg-[#25D366] hover:bg-green-600"
            onClick={shareOnWhatsApp}>
            <svg
              viewBox="0 0 24 24"
              fill="#25D366"
              height="20"
              width="20"
              className="cursor-pointer fill-white">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M2.004 22l1.352-4.968A9.954 9.954 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 01-5.03-1.355L2.004 22zM8.391 7.308a.961.961 0 00-.371.1 1.293 1.293 0 00-.294.228c-.12.113-.188.211-.261.306A2.729 2.729 0 006.9 9.62c.002.49.13.967.33 1.413.409.902 1.082 1.857 1.971 2.742.214.213.423.427.648.626a9.448 9.448 0 003.84 2.046l.569.087c.185.01.37-.004.556-.013a1.99 1.99 0 00.833-.231 4.83 4.83 0 00.383-.22s.043-.028.125-.09c.135-.1.218-.171.33-.288.083-.086.155-.187.21-.302.078-.163.156-.474.188-.733.024-.198.017-.306.014-.373-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.401-.621a.498.498 0 00-.177-.041.482.482 0 00-.378.127v-.002c-.005 0-.072.057-.795.933a.35.35 0 01-.368.13 1.416 1.416 0 01-.191-.066c-.124-.052-.167-.072-.252-.109l-.005-.002a6.01 6.01 0 01-1.57-1c-.126-.11-.243-.23-.363-.346a6.296 6.296 0 01-1.02-1.268l-.059-.095a.923.923 0 01-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41a4.38 4.38 0 00.263-.373c.118-.19.155-.385.093-.536-.28-.684-.57-1.365-.868-2.041-.059-.134-.234-.23-.393-.249-.054-.006-.108-.012-.162-.016a3.385 3.385 0 00-.403.004z" />
              <title>Whatsapp</title>
            </svg>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            title="Share via email"
            className="rounded-full bg-indigo-100"
            onClick={shareViaEmail}>
            <Mail className="w-5 h-5 text-red-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            title="More share options"
            className="rounded-full bg-indigo-100"
            onClick={handleSharing}>
            <MoreHorizontal className="w-5 h-5 text-indigo-500" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
