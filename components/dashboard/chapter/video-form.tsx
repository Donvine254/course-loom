"use client";
import { useState, useEffect } from "react";
import { Chapter } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateChapterVideo } from "@/lib/actions/chapters";
import { cn, ReloadWindow } from "@/lib/utils";
import { CustomOverlay } from "@/components/custom/overlay";
import { deleteFile } from "@/lib/actions/delete-files";
import { CircleCheck } from "lucide-react";
import { VideoUploader } from "@/components/custom/file-upload";
import dynamic from "next/dynamic";
import SubtitlesUploader from "./subtitles-form";
const DynamicVideoPlayer = dynamic(
  () => import("@/components/custom/video-player"),
  {
    loading: () => (
      <div className="relative">
        <CustomOverlay />
      </div>
    ),
    ssr: false,
  }
);
interface VideoFormProps {
  initialData: Chapter;
}
type VideoData = {
  videoUrl: string;
  duration: number;
};

export default function ChapterVideoUpload({ initialData }: VideoFormProps) {
  const [data, setData] = useState<VideoData>({
    videoUrl: initialData.videoUrl || "",
    duration: initialData.duration || 0,
  });
  const [isLoading, setIsLoading] = useState(false);
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

  const onSubmit = async (values: VideoData) => {
    setShowUploadBtn(false);
    try {
      const res = await updateChapterVideo(values, initialData.id);
      if (res.success) {
        toast.success("Chapter video uploaded successfully");
        setProgress(0);
        ReloadWindow();
      } else {
        toast.error("Something went wrong");
        setShowUploadBtn(true);
      }
    } catch {
      toast.error("Something went wrong");
      setShowUploadBtn(true);
    }
  };
  async function handleVideoChange() {
    setShowUploadBtn(!showUploadBtn);
    setData({
      videoUrl: "",
      duration: 0,
    });
    if (initialData.videoUrl) {
      setIsLoading(true);
      toast.success("Deleting current video...");
      await deleteFile(initialData.videoUrl, initialData.id);
      setIsLoading(false);
    }
  }
  return (
    <section>
      <h2 className="font-semibold flex items-center gap-2">
        Chapter Video <span className="text-red-500">*</span>
      </h2>
      <div className="border bg-card rounded-md p-4 my-2 transition-[height] animate-accordion-down ease-in-out shadow dark:shadow-indigo-500 relative ">
        {isLoading && <CustomOverlay />}
        <div className="grid grid-cols-1  md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:grid-cols-2 lg:grid-cols-2  gap-6">
          {data.videoUrl ? (
            <DynamicVideoPlayer
              url={data.videoUrl}
              subtitles={initialData.subtitles || ""}
              className="w-full h-full rounded-md outline outline-indigo-500"
            />
          ) : (
            <VideoUploader
              setIsUploading={setIsUploading}
              onChange={async (url: string, duration: number) => {
                await onSubmit({
                  videoUrl: url,
                  duration: duration,
                });
              }}
              endpoint="videoUploader"
              title={initialData.title}
              className="border-2 bg-card dark:bg-secondary text-muted-foreground  rounded-lg "
            />
          )}

          <div className="flex flex-col justify-between">
            <div className="space-y-2 md:space-y-4 flex flex-col justify-center text-muted-foreground">
              <p className="md:mb-2 xsm:text-sm xsm:text-center">
                Upload your chapter video here. All videos must be at least 720p
                and less than 1GB in size. Students are more likely to enroll if
                your videos are of high quality.{" "}
              </p>
              <small className="xsm:text-center">
                Click here to see{" "}
                <a
                  className="text-indigo-500 underline"
                  href="https://riverside.fm/blog/video-production-tips"
                  referrerPolicy="no-referrer"
                  target="_blank">
                  tips on how to make a good video!
                </a>
              </small>
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
                    onClick={handleVideoChange}
                    type="button"
                    className="hover:bg-destructive hover:text-white"
                    title="This will delete the existing video file!">
                    Change
                    {/* delete the image from upload thing */}
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
      {initialData.videoUrl && <SubtitlesUploader initialData={initialData} />}
    </section>
  );
}
