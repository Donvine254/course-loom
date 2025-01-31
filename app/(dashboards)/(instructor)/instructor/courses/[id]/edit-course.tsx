"use client";
import React from "react";

import { Category, Course } from "@prisma/client";
import { TitleForm } from "@/components/dashboard/course/title-form";
import { CategoryForm } from "@/components/dashboard/course/category-form";
import { SummaryForm } from "@/components/dashboard/course/summary-form";
import { DescriptionForm } from "@/components/dashboard/course/description-form";
import { ObjectivesForm } from "@/components/dashboard/course/objectives-form";
import { PrerequisitesForm } from "@/components/dashboard/course/prerequisites-form";
import { ImageForm } from "@/components/dashboard/course/image-form";
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
      <section className="space-y-2 md:space-y-4">
        <TitleForm initialData={course} courseId={course.id} />
        <CategoryForm
          initialData={{
            categoryId: course.category.id,
            name: course.category.name,
          }}
          categories={categories}
          courseId={course.id}
        />

        <SummaryForm initialData={course} courseId={course.id} />
        <DescriptionForm initialData={course} courseId={course.id} />
        <ObjectivesForm initialData={course} courseId={course.id} />
        <PrerequisitesForm initialData={course} courseId={course.id} />
        <ImageForm initialData={course} courseId={course.id} />
      </section>

      {/* second section */}
    </div>
  );
};
