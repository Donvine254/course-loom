"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { HelpCircle, Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Category } from "@prisma/client";
import ComboBox from "@/components/custom/combobox";
import { updateCourse } from "@/lib/actions/courses";
import { CustomOverlay } from "@/components/custom/overlay";

interface CategoryProps {
  initialData: {
    categoryId: string;
    name: string;
  };
  courseId: string;
  categories: Category[];
}

const formSchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
});

export const CategoryForm = ({
  initialData,
  courseId,
  categories,
}: CategoryProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    if (isEditing) {
      form.setValue("categoryId", initialData.categoryId || "");
    }
    setIsEditing((current) => !current);
  };
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await updateCourse(courseId, values);
      if (res.success) {
        toast.success("Course category updated successfully");
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
    <div className="border bg-card rounded-md p-4 my-2 shadow dark:shadow-indigo-500 relative">
      {isSubmitting && <CustomOverlay />}
      <div className="font-medium flex items-center justify-between">
        <label
          htmlFor="category"
          className="font-semibold flex items-center gap-2 ">
          Category
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
                  What category best fits the knowledge you&apos;ll share?.
                  It&apos;s ok if you can&apos;t think of a correct category
                  now. You can change it later.
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
              <span className="xsm:hidden">Edit category</span>
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ComboBox
                    categories={categories}
                    value={field.value}
                    disabled={!isEditing}
                    className={isEditing ? "max-w-md" : ""}
                    onChange={() => {
                      const selectedCategory =
                        categories.find((cat) => cat.id === field.value) ||
                        null;
                      form.setValue("categoryId", selectedCategory?.id || "");
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isEditing && (
            <div className="flex items-center gap-x-2">
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
    </div>
  );
};
