"use client";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone, UploadButton } from "@/lib/upload-thing";
import { toast } from "sonner";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  className?: string;
  title: string;
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
  title,
}: FileUploadProps) => {
  return (
    <UploadButton
      endpoint={endpoint}
      className={className}
      appearance={{
        button: "ut-ready:bg-indigo-500 ut-uploading:cursor-not-allowed",
        allowedContent: "text-sm",
      }}
      // onBeforeUploadBegin={(files) => {
      //   (() => {
      //     for (const file of files) {
      //       const objectUrl = URL.createObjectURL(file);
      //       const img = new Image();
      //       img.src = objectUrl;
      //       img.onload = async () => {
      //         const { width, height } = img;
      //         const aspectRatio = width / height;
      //         if (width >= 1280 && height >= 720 && aspectRatio === 16 / 9) {
      //           return files.map(
      //             (f) =>
      //               new File([f], title.toLowerCase() + f.name, {
      //                 type: f.type,
      //               })
      //           );
      //         } else {
      //           alert(
      //             "Image must be at least 1280x720 pixels with a 16:9 aspect ratio."
      //           );
      //           return false;
      //         }
      //       };
      //     }
      //   })();
      //   return true;
      // }}
      onBeforeUploadBegin={(files) => {
        return files.map(
          (f) => new File([f], title.toLowerCase() + f.name, { type: f.type })
        );
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
