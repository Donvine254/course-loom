"use client";
import { useState } from "react";
import { Chapter } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateChapterVideo } from "@/lib/actions/chapters";
import { deleteFile } from "@/lib/upload-thing";
import { ReloadWindow } from "@/lib/utils";
import { FileUpload } from "@/components/ui/file-upload";

interface VideoFormProps {
  initialData: Chapter;
}
type VideoData = {
  video: string;
  duration: number;
};

export default function ChapterVideoUpload({ initialData }: VideoFormProps) {
  const [data, setData] = useState<VideoData>({
    video: initialData.videoUrl || "",
    duration: initialData.duration || 0,
  });
  const [showUploadBtn, setShowUploadBtn] = useState<boolean>(
    !initialData.videoUrl
  );
  const onSubmit = async (values: VideoData) => {
    try {
      const res = await updateChapterVideo(values, initialData.id);
      if (res.success) {
        toast.success("Chapter video uploaded successfully");
        setShowUploadBtn(false);
        ReloadWindow();
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };
  async function handleVideoChange() {
    setShowUploadBtn(!showUploadBtn);
    setData({
      video: "",
      duration: 0,
    });
    if (initialData.videoUrl) {
      await deleteFile(initialData.videoUrl, initialData.id);
    }
  }
  return (
    <div className="border bg-card rounded-md p-4 my-4 transition-[height] animate-accordion-down ease-in-out shadow dark:shadow-indigo-500">
      <h2 className="font-semibold flex items-center gap-2 mb-2">
        Chapter Video <span className="text-red-500">*</span>
      </h2>
      <div className="grid grid-cols-1  md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:grid-cols-2 lg:grid-cols-2  gap-6">
        <div className="aspect-video relative bg-muted rounded-lg overflow-hidden">
          {data.video ? (
            <video
              src={data.video}
              poster={data.video}
              className="w-full h-full"
              controls
              autoPlay
              preload="metadata"
            />
          ) : (
            <FileUpload
              onChange={(url: string, duration: number) => {
                setData({
                  video: url,
                  duration: duration,
                });
                onSubmit({
                  video: url,
                  duration: duration,
                });
              }}
              endpoint="videoUploader"
              title={initialData.title}
              className="border-2 bg-card dark:bg-secondary text-muted-foreground"
            />
          )}
        </div>
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
            {showUploadBtn && (
              <Button type="button" className="w-full">
                No video uploaded
              </Button>
            )}
            {!showUploadBtn && (
              <div className="flex items-center justify-between gap-4">
                <Button
                  className="flex-1 text-xs text-white bg-indigo-600 hover:bg-indigo-600"
                  type="button">
                  100%
                </Button>
                <Button
                  onClick={handleVideoChange}
                  type="button"
                  title="This will delete the existing video file!">
                  Change
                  {/* delete the image from upload thing */}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
