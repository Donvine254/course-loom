"use client";
import ProgressIndicator from "@/components/dashboard/course/progress-indicator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PublishCourse } from "@/lib/actions/courses";
import { Course, Chapter } from "@prisma/client";
import { AlertTriangle, CircleCheck, InfoIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
// eslint-disable-next-line
declare const confetti: any;
type CourseWithChapter = Course & {
  chapters: Chapter[];
};
export const Header = ({ course }: { course: CourseWithChapter }) => {
  const pathname = usePathname();
  const router = useRouter();
  const requiredFields = [
    course.title,
    course.description,
    course.categoryId,
    course.summary,
    course.objectives,
    course.imageUrl,
    course.prerequisites,
    course.chapters.some((chapter) => chapter.isPublished),
  ];
  const requiredFieldsCount = requiredFields.length;
  const missingFields = requiredFields.filter((field) => !Boolean(field));
  const missingFieldsCount = missingFields.length;
  const isCompleted = requiredFields.every(Boolean);

  async function handlePublish() {
    try {
      const res = await PublishCourse(course.id);
      if (res.success) {
        toast.success(res.message);
        confetti({
          particleCount: 4000,
          spread: 100,
          origin: { y: 0.3 },
        });
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  return (
    <div>
      {" "}
      {!course.isPublished ? (
        isCompleted ? (
          <Alert variant="info">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription className="xsm:text-xs">
              This course is complete but not yet published. Consider publishing
              it to make it visible to students.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="xsm:text-xs">
              This course is unpublished. It will not be visible to students.
            </AlertDescription>
          </Alert>
        )
      ) : (
        <Alert variant="success">
          <CircleCheck className="h-4 w-4" />
          <AlertDescription className="xsm:text-xs">
            This course is published. It will be visible to all students.
          </AlertDescription>
        </Alert>
      )}
      {/* buttons section */}
      <div className="flex gap-2 overflow-x-auto p-4 md:px-6 mx-auto max-w-4xl w-full justify-between">
        <div className="flex gap-5 ">
          <Link href={`/instructor/courses/${course.id}`}>
            <Button
              size="sm"
              variant={
                pathname === `/instructor/courses/${course.id}`
                  ? "default"
                  : "outline"
              }>
              Basic Information
            </Button>
          </Link>
          <Link href={`/instructor/courses/${course.id}/curriculum`}>
            <Button
              size="sm"
              variant={
                pathname === `/instructor/courses/${course.id}/curriculum`
                  ? "default"
                  : "outline"
              }>
              Curriculum
            </Button>
          </Link>
        </div>
        <div className="flex gap-5 items-start">
          {/* TODO: Add publish and delete buttons */}
          <Button
            disabled={!isCompleted}
            variant="ghost"
            size="sm"
            onClick={handlePublish}
            title="complete all sections to publish this course">
            {course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button
            size="icon"
            title="delete course"
            type="button"
            className="bg-red-100 text-destructive hover:bg-destructive hover:text-destructive-foreground">
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <ProgressIndicator
        total={requiredFieldsCount}
        current={missingFieldsCount}
      />
    </div>
  );
};
