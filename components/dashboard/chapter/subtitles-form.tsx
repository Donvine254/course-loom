"use client";

import { useState, useEffect } from "react";
import { cn, ReloadWindow } from "@/lib/utils";
import { FileUploader } from "@/components/custom/file-upload";
import { Chapter } from "@prisma/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";

export default function SubtitlesUploader({
  initialData,
}: {
  initialData: Chapter;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadBtn, setShowUploadBtn] = useState<boolean>(
    !initialData.videoUrl
  );
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!isUploading) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5;
        return newProgress >= 100 ? 0 : newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isUploading]);
  const onSubmit = async (url: string) => {
    setShowUploadBtn(false);
    try {
      console.log(url);
      ReloadWindow();
    } catch {
      toast.error("Something went wrong");
      setShowUploadBtn(true);
    }
  };
  const handleBeforeUploadBegin = (files: File[]) => {
    setIsUploading(true);
    files.forEach((file) => {
      if (!file.name.toLowerCase().endsWith(".vtt")) {
        setIsUploading(false);
        toast.error(
          `❌ Invalid file type: ${file.name}. Only .vtt files are allowed.`
        );
        throw new Error(
          `❌ Invalid file type: ${file.name}. Only .vtt files are allowed.`
        );
      }
    });
    return files;
  };

  return (
    <section className="py-2">
      <h2 className="font-semibold flex items-center gap-2 my-2">
        Subtitles <span>(optional)</span>
      </h2>
      <div className="border bg-card rounded-md p-4 my-2 transition-[height] animate-accordion-down ease-in-out shadow dark:shadow-indigo-500 relative ">
        <div className="grid grid-cols-1  md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:grid-cols-2 lg:grid-cols-2  gap-6">
          <FileUploader
            endpoint="fileUploader"
            title={initialData.title}
            handleBeforeUploadBegin={handleBeforeUploadBegin}
            className="border-2 bg-card dark:bg-secondary text-muted-foreground  rounded-lg "
            onChange={(url) => {
              setIsUploading(false);
              onSubmit(url);
            }}
          />
          <div className="flex flex-col justify-between">
            <div className="space-y-2 md:space-y-4 flex flex-col justify-center text-muted-foreground">
              <p className=" md:mb-2 xsm:text-sm xsm:text-center">
                Add video subtitles to help students learn better.Important:
                Uploaded files should only be .vtt extension, otherwise they
                will not be shown in the video.
              </p>
              <a
                href="https://www.vtt-creator.com/editor"
                target="_blank"
                referrerPolicy="no-referrer"
                className="text-indigo-500 hover:underline">
                Use VTT Creator to easily create subtitles
              </a>
            </div>
            <div className="space-y-4 mt-2 border-2 border-dashed  p-4 rounded-md">
              {!showUploadBtn ? (
                <div className="flex items-center justify-between gap-4">
                  <Button
                    className="flex-1 text-xs text-white bg-indigo-600 hover:bg-indigo-600"
                    type="button">
                    <CircleCheck className="h-3 w-3" /> 100%
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowUploadBtn(!showUploadBtn)}
                    className="hover:bg-destructive hover:text-white"
                    title="This will delete the existing video file!">
                    Change
                    {/* delete the subtitles from upload thing */}
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  className={cn(
                    "w-full cursor-default",
                    isUploading && "text-muted-foreground"
                  )}
                  style={{
                    background: `linear-gradient(to right, #4f46e5 ${progress}%, #fff ${progress}%)`,
                    transition: "background 0.1s linear",
                  }}>
                  {isUploading ? <>Uploading..</> : "No file selected"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
