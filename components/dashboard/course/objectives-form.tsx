"use client";
import { Course } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Grip,
  HelpCircle,
  Loader2,
  Pencil,
  Plus,
  PlusCircle,
  Trash2,
} from "lucide-react";
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
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { updateCourse } from "@/lib/actions/courses";

interface ObjectivesFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  objectives: z
    .array(
      z.object({
        value: z
          .string()
          .min(20, "Objective cannot be less than 30 characters")
          .max(160, "Objective cannot be longer than 160 characters")
          .regex(/^[a-zA-Z0-9 ,.:!?&]+$/, "No special characters allowed"),
      })
    )
    .refine(
      (objectives) => {
        const values = objectives.map((obj) => obj.value.toLowerCase().trim());
        return new Set(values).size === values.length;
      },
      { message: "Objectives must be unique" }
    ),
});

export const ObjectivesForm = ({
  initialData,
  courseId,
}: ObjectivesFormProps) => {
  const [isEditing, setIsEditing] = useState(!initialData.objectives);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      objectives: initialData.objectives
        ? initialData.objectives
            .split(";")
            .map((obj) => ({ value: obj.trim() }))
        : [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
    },
    mode: "onChange",
  });

  const { control, handleSubmit, formState, setValue } = form;
  const { isSubmitting } = formState;

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "objectives",
  });

  const toggleEdit = () => {
    if (isEditing) {
      setValue(
        "objectives",
        initialData.objectives
          ? initialData.objectives
              .split(";")
              .map((obj) => ({ value: obj.trim() }))
          : [{ value: "" }, { value: "" }, { value: "" }, { value: "" }]
      );
    }
    setIsEditing((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formattedObjectives = values.objectives
        .map((obj) => obj.value)
        .join("; ");

      const res = await updateCourse(courseId, {
        objectives: formattedObjectives,
      });

      if (res.success) {
        toast.success("Course objectives updated successfully");
        toggleEdit();
        router.refresh();
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const placeholders = [
    "Example: Understand HTML structure and semantics",
    "Example: Style webpages using CSS and frameworks",
    "Example: Write interactive JavaScript code",
    "Example: Work with APIs and fetch data",
  ];

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
    form.trigger("objectives");
  };
  if (!isMounted) {
    return false;
  }

  return (
    <div className="border bg-card rounded-md p-4 my-4 transition-[height] animate-accordion-down ease-in-out shadow dark:shadow-indigo-500">
      <div className="font-medium flex items-center justify-between">
        <label className="font-semibold flex items-center gap-2 ">
          Learning Objectives
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent className="max-w-72 text-sm" side="bottom">
                <p>
                  Define at least four clear learning objectives to set
                  expectations for students.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            "Cancel"
          ) : initialData.objectives ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              <span className="xsm:hidden">Edit Objectives</span>
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              <span className="xsm:hidden">Add Objectives</span>
            </>
          )}
        </Button>
      </div>
      <p>What will students learn in your course?</p>
      <small className="text-muted-foreground">
        You must enter at least 4 learning objectives. Each objective must be
        unique.
      </small>

      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="objectives">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {fields.map((field, index) => (
                      <Draggable
                        key={field.id}
                        draggableId={String(field.id)}
                        index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="flex w-full items-center space-x-2 my-4">
                            <FormField
                              control={control}
                              name={`objectives.${index}.value`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl className="w-full">
                                    <Input
                                      disabled={!isEditing}
                                      className="w-full"
                                      placeholder={
                                        placeholders[index] ||
                                        "Add another objective"
                                      }
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Remove button */}
                            <Button
                              type="button"
                              variant="outline"
                              title="remove"
                              disabled={fields.length <= 4 || !isEditing}
                              size="icon"
                              onClick={() => remove(index)}
                              className="shrink-0 text-red-500 bg-gray-100 dark:bg-red-100 hover:bg-destructive hover:text-destructive-foreground dark:hover:text-red-800">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <div
                              title="drag to re-order items"
                              className="shrink-0 px-2 py-3 rounded-md h-10 w-10 border border-input bg-background inline-flex items-center justify-center hover:text-accent-foreground"
                              {...provided.dragHandleProps}>
                              <Grip className="h-4 w-4" />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {isEditing && (
              <div className="flex items-center gap-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  title="add objectives"
                  className="bg-indigo-500 text-white"
                  disabled={fields.some(
                    (field, index) => !form.watch(`objectives.${index}.value`)
                  )}
                  onClick={() => append({ value: "" })}>
                  <Plus className="h-4 w-4 mr-2" /> Add More Objectives
                </Button>
                <Button
                  size="sm"
                  title="save changes"
                  disabled={isSubmitting}
                  type="submit">
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </FormProvider>
    </div>
  );
};

