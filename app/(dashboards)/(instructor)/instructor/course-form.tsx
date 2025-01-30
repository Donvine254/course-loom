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
import { createCourse } from "@/lib/actions/courses";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const courseSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  title: z
    .string()
    .min(10, "Title is required and must be greater than 10 characters")
    .max(100, "Title must be within 100 characters"),
});

type CourseFormData = z.infer<typeof courseSchema>;

export const CourseForm = ({
  categories,
  userId,
}: {
  categories: Category[];
  userId: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
  const router = useRouter();
  const onSubmit = async (data: CourseFormData) => {
    if (!data.title || !data.categoryId || !userId) {
      throw new Error("All fields are required.");
    }

    try {
      const res = await createCourse({
        title: data.title,
        categoryId: data.categoryId,
        userId: userId,
      });
      if (res.success) {
        toast.success(res.message, {
          position: "top-center",
        });
        router.push(`/instructor/courses/${res.data?.id}`);
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const watchCategory = watch("categoryId");
  return (
    <form
      className="space-y-4 md:space-y-8 py-4 w-full max-w-lg"
      onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <h1 className="text-center text-xl md:text-2xl font-bold">
          Create a Course
        </h1>
      </div>
      <div className="space-y-2">
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
          className="max-w-md"
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
        disabled={isSubmitting}
        className="w-full max-w-md"
        title="create course">
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin " />
        ) : (
          "Create"
        )}
      </Button>
    </form>
  );
};
