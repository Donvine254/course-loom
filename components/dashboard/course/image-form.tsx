"use client";
import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { updateCourse } from "@/lib/actions/courses";
import { Course } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ImageUploadButton } from "@/components/ui/file-upload";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

type FormSchema = {
  imageUrl: string;
};

export default function CourseImageUpload({
  initialData,
  courseId,
}: ImageFormProps) {
  const [image, setImage] = useState<string>(initialData.imageUrl || "");
  const [showUploadBtn, setShowUploadBtn] = useState<boolean>(
    !initialData.imageUrl
  );
  const router = useRouter();
  const onSubmit = async (values: FormSchema) => {
    try {
      const res = await updateCourse(courseId, values);
      if (res.success) {
        toast.success("Course image updated successfully");
        router.refresh();
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="border bg-card rounded-md p-4 my-4 transition-[height] animate-accordion-down ease-in-out">
      <h2 className="text-2xl font-semibold mb-4">Course image</h2>
      <div className="flex gap-6">
        <div className="flex-1 aspect-[16/9] relative bg-muted rounded-lg overflow-hidden">
          {image ? (
            <Image
              src={image || "/placeholder.jpg"}
              alt="Course preview"
              className="bg-neutral italic"
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="flex items-center justify-center h-60 bg-none border rounded-md mt-2">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="mb-2">
              Upload your course image here. It must meet our course image
              quality standards to be accepted.
            </p>
            <p className="text-sm text-muted-foreground">
              Important guidelines: 1280 x 720 pixels; .jpg, .jpeg, .gif, or
              .png. no text on the image. 16/9 recommended aspect ratio.
            </p>
          </div>
          <div className="space-y-4 my-2 border-2 border-dashed bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 rounded-md">
            <ImageUploadButton
              endpoint="imageUploader"
              className={`w-full ${!showUploadBtn ? "hidden" : ""}`}
              onChange={(url) => {
                if (url) {
                  setImage(url);
                  onSubmit({ imageUrl: url });
                }
              }}
            />
            {!showUploadBtn && (
              <Button onClick={() => setShowUploadBtn(!showUploadBtn)}>
                Change Image
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
