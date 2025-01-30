"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Category, Course } from "@prisma/client";
import RichEditor from "@/components/custom/editor";
import { HelpCircle } from "lucide-react";
import { TitleForm } from "@/components/dashboard/course/title-form";
import { CategoryForm } from "@/components/dashboard/course/category-form";
type courseWithCategory = Course & {
  category: Category;
};
export const EditCourseForm = ({
  course,
  categories,
}: {
  course: courseWithCategory;
  categories: Category[];
}) => {
  return (
    <div className="p-2 sm:p-4 md:px-6 mx-auto max-w-4xl">
      {/* first section */}
      <p className="mb-4">Complete all sections to publish</p>

      {/* First section */}
      <section>
        <TitleForm initialData={course} courseId={course.id} />
        <CategoryForm
          initialData={{
            categoryId: course.category.id,
            name: course.category.name,
          }}
          categories={categories}
          courseId={course.id}
        />

        {/* div for course summary */}
        <div className="space-y-2">
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
                    Write a concise overview of your course (max 250
                    characters). Tell us what this course is about.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </label>
          <textarea
            maxLength={250}
            minLength={100}
            rows={3}
            placeholder="Enter a brief summary of your course."
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
            className="w-full  h-auto  rounded-md border bg-white dark:bg-input px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:bg-background focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          />
        </div>
        <div className="space-y-2">
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
          <div className="rounded-md min-h-[200px] h-full flex flex-col ">
            <RichEditor
              placeholder="Enter a course description"
              onChange={(value) => console.log(value)}
              className="flex-1 rounded-md"
            />
          </div>
        </div>
      </section>

      {/* second section */}
    </div>
  );
};
