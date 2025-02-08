"use client";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/upload-thing";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
import {
  getVideoDuration,
  isValidImageFile,
  validateImageSize,
} from "@/lib/utils";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Button } from "../ui/button";

interface VideoUploadProps {
  onChange: (url: string, duration: number) => void;
  endpoint: keyof typeof ourFileRouter;
  className?: string;
  title: string;
  setIsUploading: (isUploading: boolean) => void;
}
// TODO: add subtitles vtt generator that saves the subtitles to uploadthing
export const VideoUploader = ({
  onChange,
  endpoint,
  className,
  title,
  setIsUploading,
}: VideoUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      className={className}
      appearance={{
        label: "text-muted-foreground",
        allowedContent: "text-muted-foreground",
        button: "bg-indigo-500 cursor-pointer",
      }}
      onBeforeUploadBegin={(files: File[]) => {
        return files.map(
          (f) => new File([f], title + f.name, { type: f.type })
        );
      }}
      onUploadBegin={() => setIsUploading(true)}
      onClientUploadComplete={async (res) => {
        const url = res?.[0].url;
        const duration = await getVideoDuration(url);
        onChange(url, duration);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  );
};

// file uploader
type FileUploadProps = Omit<VideoUploadProps, "onChange" | "setIsUploading"> & {
  onChange: (url: string) => void;
};
export const FileUploader = ({
  onChange,
  endpoint,
  className,
  title,
}: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      className={className}
      appearance={{
        label: "text-muted-foreground",
        allowedContent: "text-muted-foreground",
        button: "bg-indigo-500 cursor-pointer",
      }}
      onBeforeUploadBegin={(files: File[]) => {
        return files.map(
          (f) => new File([f], title + f.name, { type: f.type })
        );
      }}
      onUploadBegin={() => {
        if (!title) {
          toast.error("Please enter a file name first!");
          throw new Error("File name is required");
          //abort the upload
        }
      }}
      onClientUploadComplete={async (res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  );
};

type UploadButtonProps = {
  setImage: (url: string) => void;
  initialImage?: string | null;
  onUpload: (values: { imageUrl: string }) => void;
};
export const ImageUploadButton = ({
  setImage,
  initialImage,
  onUpload,
}: UploadButtonProps) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      setError("Invalid image selected");
      return;
    }
    // check if the file is an image and valid file size
    if (!isValidImageFile(file)) {
      setError("Please select a valid image file under 5MB");
      return false;
    }
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    // check if image is correct aspect ratio and size
    const validationResult = await validateImageSize(imageUrl);
    if (!validationResult.success) {
      setError(
        "Image must be at least 1280x720 pixels with a 16:9 aspect ratio"
      );
      URL.revokeObjectURL(imageUrl);
      return false;
    }
    return true;
  };

  const handleImageUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Please select an image first.");
      return;
    }
    setIsUploading(true);
    setUploadProgress(0);
    const startTime = Date.now();
    const estimatedUploadTime = 5000;
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min((elapsedTime / estimatedUploadTime) * 100, 95);
      setUploadProgress(progress);
    }, 200);

    try {
      const res = await uploadToCloudinary(file);
      if (res.success) {
        onUpload({ imageUrl: res.image });
        setUploadProgress(100);
        clearFileInput();
      } else {
        setUploadProgress(100);
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      setError("Upload failed.");
    } finally {
      clearInterval(interval);
      setIsUploading(false);
    }
  };

  function clearFileInput() {
    if (fileInputRef.current) {
      (fileInputRef.current as HTMLInputElement).value = "";
    }
    setError("");
    setImage(initialImage || "");
  }
  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={handleImageSelect}
      />
      <div className="flex items-center gap-4 w-full">
        {isUploading ? (
          <Button
            className="flex-1 text-xs text-muted-foreground"
            type="button"
            style={{
              background: `linear-gradient(to right, #4f46e5 ${uploadProgress}%, #fff ${uploadProgress}%)`,
            }}>
            Uploading... {Math.round(uploadProgress)}%
          </Button>
        ) : (
          <Button
            className="flex-1 truncate text-sm items-center justify-between gap-2"
            type="button"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}>
            <span className="truncate">
              {fileInputRef.current?.files?.[0]
                ? fileInputRef.current.files[0].name
                : "No File Selected"}
            </span>
            {fileInputRef.current?.files?.[0] && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  clearFileInput();
                }}>
                <X className="h-4 w-4" />
              </span>
            )}
          </Button>
        )}
        <Button
          disabled={!fileInputRef.current?.files?.[0] || isUploading || !!error}
          onClick={handleImageUpload}
          className="disabled:bg-opacity-50 disabled:pointer-events-none flex-shrink-0 bg-indigo-500 text-white hover:bg-indigo-700 hover:text-white">
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Upload"
          )}
        </Button>
      </div>
      {error && (
        <small className="text-destructive mt-2 text-xs">{error}</small>
      )}
    </>
  );
};
