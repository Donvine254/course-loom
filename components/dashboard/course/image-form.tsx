"use client";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { updateCourse } from "@/lib/actions/courses";
import { Course } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ImageUploadButton } from "@/components/ui/file-upload";
import { validateImageSize } from "@/lib/utils";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

type FormSchema = {
  imageUrl: string;
};

// TODO: change image uploads to work with cloudinary due to image compression
export default function CourseImageUpload({
  initialData,
  courseId,
}: ImageFormProps) {
  const [image, setImage] = useState<string>(initialData.imageUrl || "");
  const [showUploadBtn, setShowUploadBtn] = useState<boolean>(
    !initialData.imageUrl
  );
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const onSubmit = async (values: FormSchema) => {
    setError("");
    try {
      const res = await updateCourse(courseId, values);
      if (res.success) {
        toast.success("Course image updated successfully");
        router.refresh();
      } else {
        setError("Something went wrong");
      }
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="border bg-card rounded-md p-4 my-4 transition-[height] animate-accordion-down ease-in-out shadow dark:shadow-indigo-500">
      <h2 className="font-semibold flex items-center gap-2 mb-2">
        Course image
      </h2>
      <div className="flex flex-col md:roup-has-[[data-collapsible=icon]]/sidebar-wrapper:flex-row lg:flex-row gap-6">
        <div className="flex-1 aspect-[16/9] relative bg-muted rounded-lg overflow-hidden">
          {image ? (
            // eslint-disable-next-line
            <img
              src={image || "/placeholder.jpg"}
              alt="Course preview"
              className="bg-neutral italic"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-none  rounded-md">
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
            <small className="text-muted-foreground">
              Important guidelines: 1280 x 720 pixels; .jpg, .jpeg, .gif, or
              .png. no text on the image. 16/9 recommended aspect ratio.
            </small>
          </div>
          <div className="space-y-4 my-2 border-2 border-dashed   flex items-center justify-center p-4 rounded-md">
            <ImageUploadButton
              endpoint="imageUploader"
              title={initialData.title}
              className={`w-full ${!showUploadBtn ? "hidden" : ""}`}
              onChange={async (url) => {
                if (url) {
                  const res = await validateImageSize(url);
                  if (res.success) {
                    setImage(url);
                    setShowUploadBtn(false);
                    onSubmit({ imageUrl: url });
                  } else {
                    setError(res.error || "Something went wrong");
                  }
                }
              }}
            />
            {!showUploadBtn && (
              <Button onClick={() => setShowUploadBtn(!showUploadBtn)}>
                Change Image
              </Button>
            )}
          </div>
          {error && <small className="text-xs text-destructive">{error}</small>}
        </div>
      </div>
    </div>
  );
}
