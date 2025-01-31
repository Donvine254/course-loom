"use client";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { HelpCircle, Pencil, Plus, PlusCircle, Trash2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { updateCourse } from "@/lib/actions/courses";

interface PrerequisitesFormProps {
  initialData: Course;
  courseId: string;
}

// Schema ensures at least 4 prerequisites
const formSchema = z.object({
  prerequisites: z
    .array(
      z.object({
        value: z
          .string()
          .min(30, "Objective cannot be less than 30 characters")
          .max(160, "Objective cannot be longer than 160 characters")
          .regex(/^[a-zA-Z0-9 ,.:!?&]+$/, "No special characters allowed"),
      })
    )
    .refine(
      (prerequisites) => {
        const values = prerequisites.map((obj) =>
          obj.value.toLowerCase().trim()
        );
        return new Set(values).size === values.length;
      },
      { message: "prerequisites must be unique" }
    ),
});

export const PrerequisitesForm = ({
  initialData,
  courseId,
}: PrerequisitesFormProps) => {
  const [isEditing, setIsEditing] = useState(!initialData.prerequisites);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prerequisites: initialData.prerequisites
        ? initialData.prerequisites
            .split(";")
            .map((obj) => ({ value: obj.trim() }))
        : [{ value: "" }],
    },
    mode: "onChange",
  });

  const { control, handleSubmit, formState, setValue } = form;
  const { isSubmitting } = formState;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "prerequisites",
  });

  const toggleEdit = () => {
    if (isEditing) {
      setValue(
        "prerequisites",
        initialData.prerequisites
          ? initialData.prerequisites
              .split(";")
              .map((obj) => ({ value: obj.trim() }))
          : [{ value: "" }]
      );
    }
    setIsEditing((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formattedPrerequisites = values.prerequisites
        .map((obj) => obj.value)
        .join("; ");
      console.log(courseId, formattedPrerequisites);
      const res = await updateCourse(courseId, {
        prerequisites: formattedPrerequisites,
      });
      if (res.success) {
        toast.success("Course objectives successfully");
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
        <label className="font-semibold flex items-center gap-2 text-muted-foreground">
          What are the requirements or prerequisites for taking your course?
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-72 text-sm" side="bottom">
                <p>
                  List the required skills, experience, tools or equipment
                  learners should have prior to taking your course. If there are
                  no requirements, use this space as an opportunity to lower the
                  barrier for beginners.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : initialData.prerequisites ? (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit prerequisites
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" /> Add prerequisites
            </>
          )}
        </Button>
      </div>
      <small className="text-muted-foreground">
        List the required skills, experience, tools or equipment learners should
        have prior to taking your course. If there are no requirements, use this
        space as an opportunity to lower the barrier for beginners.
      </small>
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={control}
                name={`prerequisites.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Input
                          disabled={!isEditing}
                          placeholder="Example: No Programming experience required."
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        title="remove"
                        disabled={fields.length <= 1 || !isEditing}
                        size="icon"
                        onClick={() => remove(index)}
                        className="shrink-0 text-red-500 bg-gray-100 dark:bg-red-100 hover:bg-destructive hover:text-destructive-foreground dark:hover:text-red-800">
                        <Trash2 className="h-4 w-4 " />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {isEditing && (
              <div className="flex items-center gap-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  title="add prerequisites"
                  className="bg-indigo-500 text-white"
                  disabled={fields.some(
                    (field, index) =>
                      !form.watch(`prerequisites.${index}.value`)
                  )}
                  onClick={() => append({ value: "" })}>
                  <Plus className="h-4 w-4 mr-2" /> Add More prerequisites
                </Button>
                <Button
                  size="sm"
                  title="save changes"
                  disabled={isSubmitting}
                  type="submit">
                  Save
                </Button>
              </div>
            )}
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};
