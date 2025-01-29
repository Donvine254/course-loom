"use client";
import ComboBox from "@/components/custom/combobox";
import { Input } from "@/components/ui/input";
import type { Category } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, Loader2 } from "lucide-react";
import type React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const courseSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  title: z
    .string()
    .min(20, "Title is required and must be greater than 50 characters")
    .max(100, "Title must be within 100 characters"),
});

type CourseFormData = z.infer<typeof courseSchema>;

export const CourseForm = ({ categories }: { categories: Category[] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    watch,
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      categoryId: "",
      title: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: CourseFormData) => {
    console.log("Form data is valid:", data);
    // Proceed with form submission
  };

  const watchCategory = watch("categoryId");
  return (
    <form className=" space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1 className="text-center text-xl md:text-2xl font-bold">
          Create a Course
        </h1>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">
          What would you like to name your course? Don&apos;t worry, you can
          change this later.
        </p>
        <label
          htmlFor="title"
          className="font-semibold flex items-center gap-2 text-muted-foreground">
          Course Title
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
                  Choose a clear and compelling title. Keep it within 100
                  characters. It&apos;s ok if you can&apos;t think of a good
                  title now. You can change it later.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Input
          {...register("title")}
          placeholder="eg. Web Development for Beginners"
          maxLength={100}
        />
        {errors.title && (
          <small className="text-red-500">{errors.title.message}</small>
        )}
      </div>
      <div className="space-y-2">
        <label
          htmlFor="category"
          className="font-semibold flex items-center gap-2 text-muted-foreground">
          Category
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
                  What category best fits the knowledge you&apos;ll share?.
                  It&apos;s ok if you can&apos;t think of a correct category
                  now. You can change it later.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <ComboBox
          categories={categories}
          value={watchCategory || ""}
          onChange={(id) => {
            const selectedCategory =
              categories.find((cat) => cat.id === id) || null;
            setValue("categoryId", selectedCategory?.id || "");
          }}
        />
        {errors.categoryId && (
          <small className="text-red-500">{errors.categoryId.message}</small>
        )}
      </div>
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        title="create course">
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create"}
      </Button>
    </form>
  );
};
