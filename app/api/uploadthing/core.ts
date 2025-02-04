import { createUploadthing, type FileRouter } from "uploadthing/next";

const uploadThing = createUploadthing();

export const ourFileRouter = {
  imageUploader: uploadThing({
    "image/jpeg": { maxFileSize: "4MB", maxFileCount: 1 },
    "image/png": { maxFileSize: "4MB", maxFileCount: 1 },
    "image/webp": { maxFileSize: "4MB", maxFileCount: 1 },
    "image/avif": { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { file: file.url };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
