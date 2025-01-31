"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HelpCircle, Pencil, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
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
interface SummaryFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  summary: z
    .string()
    .min(100, "Summary is required and must be greater than 100 characters")
    .max(250, "Summary must be within 250 characters"),
});

export const SummaryForm = ({ initialData, courseId }: SummaryFormProps) => {
  const [isEditing, setIsEditing] = useState(!initialData.summary);

  const toggleEdit = () => {
    if (isEditing) {
      form.setValue("summary", initialData.summary || "");
    }
    setIsEditing((current) => !current);
  };
  useEffect(() => {
    if (initialData && !initialData.summary) {
      setIsEditing(true);
    }
  }, [initialData]);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      summary: initialData?.summary || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(courseId, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="border bg-card rounded-md p-4 my-4 transition-[height] animate-accordion-down ease-in-out">
      <div className="font-medium flex items-center justify-between">
        <label
          htmlFor="description"
          className="font-semibold flex items-center gap-2 text-muted-foreground">
          Short Description/ Summary
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent
                className="max-w-72 text-sm"
                side="bottom"
                data-state="delayed-open">
                <p>
                  Write a concise overview of your course (max 250 characters).
                  Tell us what this course is about.
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
              {initialData && !initialData.summary ? (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Summary
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Summary
                </>
              )}
            </>
          )}
        </Button>
      </div>
      <small className="text-muted-foreground">
        Provide a short summary on what students will learn in this course.
        Summary should be attention-grabbing!
      </small>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <textarea
                    rows={3}
                    maxLength={250}
                    minLength={100}
                    placeholder="Enter a brief summary of your course."
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                    className="w-full  h-auto  rounded-md border bg-white dark:bg-input px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:bg-background focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    disabled={isSubmitting || !isEditing}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isEditing && (
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                size="sm">
                Save
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
