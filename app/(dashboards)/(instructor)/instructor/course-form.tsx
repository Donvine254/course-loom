"use client";
import ComboBox from "@/components/custom/combobox";
import { Input } from "@/components/ui/input";
import { Category } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const courseSchema = z.object({
  category: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .nullable(),
  title: z
    .string()
    .min(50, "Title is required")
    .max(100, "Title must be within 100 characters"),
});
type CourseFormData = z.infer<typeof courseSchema>;
export const CourseForm = ({ categories }: { categories: Category[] }) => {
  const [formData, setFormData] = useState<CourseFormData>({
    category: null,
    title: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validatedData = courseSchema.parse(formData);
      console.log("Form data is valid:", validatedData);
      // Proceed with form submission
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation errors:", error.errors);
        // Handle validation errors (e.g., display error messages)
      }
    }
  };

  return (
    <form className="min-w-[400px] space-y-4" onSubmit={handleSubmit}>
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
          name="title"
          placeholder="e.g Web Development for Beginners"
          maxLength={100}
          value={formData.title}
          onChange={handleChange}
        />
        <small></small>
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
          value={formData.category?.id || ""}
          onChange={(id) => {
            const selectedCategory =
              categories.find((cat) => cat.id === id) || null;
            setFormData((prev) => ({ ...prev, category: selectedCategory }));
          }}
        />
        <small>
          If you&apos;re not sure about the right category, you can change it
          later
        </small>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};
