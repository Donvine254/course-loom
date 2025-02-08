"use client";
import DeleteButton from "@/components/custom/delete-dialog";
import PublishButton from "@/components/custom/publish-button";
import ProgressIndicator from "@/components/dashboard/course/progress-indicator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import deleteChapter, { PublishChapter } from "@/lib/actions/chapters";
import { Chapter } from "@prisma/client";
import { InfoIcon, MoveLeft, CircleCheck, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// eslint-disable-next-line
declare const confetti: any;
export const ChapterHeader = ({ chapter }: { chapter: Chapter }) => {
  const router = useRouter();
  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const requiredFieldsCount = requiredFields.length;
  const missingFields = requiredFields.filter((field) => !Boolean(field));
  const missingFieldsCount = missingFields.length;
  const isCompleted = requiredFields.every(Boolean);
  const handleDeleteChapter = async (id: string) => {
    try {
      const res = await deleteChapter(id);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
        router.replace(`/instructor/courses/${chapter.courseId}/curriculum`);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  async function handlePublish(isPublished: boolean) {
    try {
      const res = await PublishChapter(chapter.id, chapter.courseId, isPublished);
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
      {!chapter.isPublished ? (
        isCompleted ? (
          <Alert variant="info">
            <InfoIcon className="h-4 w-4" />
            <AlertDescription className="xsm:text-xs">
              This chapter is complete but not yet published. Consider
              publishing it to make it visible to students.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="xsm:text-xs">
              This chapter is unpublished. It will not be visible to students.
            </AlertDescription>
          </Alert>
        )
      ) : (
        <Alert variant="success">
          <CircleCheck className="h-4 w-4" />
          <AlertDescription className="xsm:text-xs">
            This chapter is published. It will be visible to all students.
          </AlertDescription>
        </Alert>
      )}
      {/* buttons section */}
      <div className="flex gap-2 overflow-x-auto p-4 md:px-6 mx-auto max-w-4xl w-full justify-between">
        <Link href={`/instructor/courses/${chapter.courseId}/curriculum`}>
          <Button size="sm" className="justify-between" variant="default">
            <MoveLeft className="h-4 w-4 mr-2" /> Back to Curriculum
          </Button>
        </Link>

        <div className="flex gap-5 items-start">
          {/* TODO: Add publish and delete buttons */}
          <PublishButton
            type="chapter"
            isPublished={chapter.isPublished}
            handlePublish={handlePublish}
            isCompleted={isCompleted}
          />
          <DeleteButton
            onDelete={handleDeleteChapter}
            id={chapter.id}
            item="course chapter"
          />
        </div>
      </div>
      <ProgressIndicator
        total={requiredFieldsCount}
        current={missingFieldsCount}
      />
    </div>
  );
};
