"use client";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { updateCourse } from "@/lib/actions/courses";
import { Course } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ImageUploadButton } from "@/components/ui/file-upload";
import Image from "next/image";
import { deleteCloudinaryImage } from "@/lib/cloudinary";
import { useRouter } from "next/navigation";

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
  const [image, setImage] = useState<string>(
    initialData.imageUrl
      ? `https://res.cloudinary.com/dipkbpinx/image/upload/${initialData.imageUrl}.webp`
      : ""
  );
  const router = useRouter();

  const [showUploadBtn, setShowUploadBtn] = useState<boolean>(
    !initialData.imageUrl
  );
  const onSubmit = async (values: FormSchema) => {
    try {
      const res = await updateCourse(courseId, values);
      if (res.success) {
        toast.success("Course image updated successfully");
        setShowUploadBtn(false);
        router.refresh();
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };
  async function handleImageChange() {
    setShowUploadBtn(!showUploadBtn);
    setImage("");
    if (initialData.imageUrl) {
      await deleteCloudinaryImage(initialData.imageUrl, initialData.id);
    }
  }
  return (
    <div className="border bg-card rounded-md p-4 my-4 transition-[height] animate-accordion-down ease-in-out shadow dark:shadow-indigo-500">
      <h2 className="font-semibold flex items-center gap-2 mb-2">
        Course image
      </h2>
      <div className="grid grid-cols-1  md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:grid-cols-2 lg:grid-cols-2  gap-6">
        <div className="aspect-[16/9] relative bg-muted rounded-lg overflow-hidden">
          {image ? (
            <Image
              src={image || "/placeholder.jpg"}
              alt="Course banner image"
              className="bg-neutral italic"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-none  rounded-md">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p className="mb-2">
              Upload your course image here. It must meet our course image
              quality standards to be accepted.
            </p>
            <small className="text-muted-foreground">
              Important guidelines: 1280 x 720 pixels; Supported types: .jpg,
              .jpeg, .avif, .webp, or .png; 16/9 recommended aspect ratio.
            </small>
          </div>
          <div className="space-y-4 my-2 border-2 border-dashed  p-4 rounded-md">
            {showUploadBtn && (
              <ImageUploadButton
                setImage={setImage}
                initialImage={initialData.imageUrl}
                onUpload={async (values: FormSchema) => onSubmit(values)}
              />
            )}
            {!showUploadBtn && (
              <div className="flex items-center justify-between gap-4">
                <Button
                  className="flex-1 text-xs text-white bg-indigo-600 hover:bg-indigo-600"
                  type="button">
                  100%
                </Button>
                <Button
                  onClick={handleImageChange}
                  type="button"
                  title="This will delete the existing image!">
                  Change
                  {/* delete the image from cloudinary */}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
