"use client";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone, UploadButton } from "@/lib/upload-thing";
import { toast } from "sonner";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  className?: string;
}

export const FileUpload = ({
  onChange,
  endpoint,
  className,
}: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      className={className}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  );
};

export const ImageUploadButton = ({
  onChange,
  endpoint,
  className,
}: FileUploadProps) => {
  return (
    <UploadButton
      endpoint={endpoint}
      className={className}
      appearance={{
        button:
          "ut-ready:bg-indigo-500 ut-uploading:cursor-not-allowed  bg-red-500 bg-none after:bg-orange-400",
        allowedContent: "text-sm",
      }}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  );
};
