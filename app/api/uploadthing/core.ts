import { createUploadthing, type FileRouter } from "uploadthing/next";

const uploadThing = createUploadthing();

export const ourFileRouter = {
  imageUploader: uploadThing({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    return { file: file.url };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
