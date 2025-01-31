"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HelpCircle, Pencil } from "lucide-react";
import { useState } from "react";
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
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface DescriptionFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  summary: z
    .string()
    .min(100, "Summary is required and must be greater than 100 characters")
    .max(250, "Summary must be within 250 characters"),
});

export const DescriptionForm = ({
  initialData,
  courseId,
}: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    if (isEditing) {
      form.setValue("summary", initialData.summary || "");
    }
    setIsEditing((current) => !current);
  };

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
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
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
              <Pencil className="h-4 w-4 mr-2" />
              Edit description
            </>
          )}
        </Button>
      </div>
      <small>
        A short summary on what students will learn in this course. Summary
        should be attention-grabbing!
      </small>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.summary && "text-slate-500 italic"
          )}>
          {initialData.summary || "No Summary"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4">
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
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
