"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HelpCircle, Pencil, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import RichEditor from "@/components/custom/editor";
import parse from "html-react-parser";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { updateCourse } from "@/lib/actions/courses";
import { cn } from "@/lib/utils";
interface DescriptionFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  description: z
    .string()
    .min(
      200,
      "description is required and must be greater than 100 characters"
    ),
});

export const DescriptionForm = ({
  initialData,
  courseId,
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(!initialData.description);

  const toggleEdit = () => {
    if (isEditing) {
      form.setValue("description", initialData.description || "");
    }
    setIsEditing((current) => !current);
  };
  useEffect(() => {
    if (initialData && !initialData.description) {
      setIsEditing(true);
    }
  }, [initialData]);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await updateCourse(courseId, values);
      if (res.success) {
        toast.success("Course description updated successfully");
        toggleEdit();
        router.refresh();
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="border bg-card rounded-md p-4 my-4 transition-[height] animate-accordion-down ease-in-out shadow dark:shadow-indigo-500">
      <div className="font-medium flex items-center justify-between">
        <label
          htmlFor="description"
          className="font-semibold flex items-center gap-2">
          Course Description
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent
                className="max-w-72 text-sm"
                side="bottom"
                data-state="delayed-open">
                <p>
                  Provide detailed information about your course content and
                  structure.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              {initialData && !initialData.description ? (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  <span className="xsm:hidden">Add Description</span>
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  <span className="xsm:hidden">Edit Description</span>
                </>
              )}
            </>
          )}
        </Button>
      </div>
      <small className="text-muted-foreground">
        Description should have a minimum of 200 words.
      </small>
      {!isEditing &&
        (initialData.description ? (
          <div className="mt-4" suppressHydrationWarning>
            <div className="prose prose-sm max-w-none p-4 bg-gray-100 dark:bg-input rounded-md  text-sm">
              {parse(initialData.description) ?? initialData.description}
            </div>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-muted rounded-md text-muted-foreground text-sm">
            You have not updated your course description yet.
          </div>
        ))}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("space-y-4 mt-4", !isEditing && "hidden")}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RichEditor
                    placeholder="Enter a course description"
                    value={field.value}
                    disabled={!isEditing}
                    onChange={(value: string) =>
                      form.setValue("description", value)
                    }
                    className="flex-1 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-x-2">
            <Button disabled={isSubmitting} type="submit" size="sm">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
