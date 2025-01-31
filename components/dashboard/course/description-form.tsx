"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HelpCircle, Pencil, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import RichEditor from "@/components/custom/editor";
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
          Course Description
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
                  Add description
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit description
                </>
              )}
            </>
          )}
        </Button>
      </div>
      <small className="text-muted-foreground">
        Description should have a minimum of 200 words.
      </small>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
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
          {isEditing && (
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};
