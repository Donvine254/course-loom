import React from "react";
import { Category, Course } from "@prisma/client";
import { TitleForm } from "@/components/dashboard/course/title-form";
import { CategoryForm } from "@/components/dashboard/course/category-form";
import { SummaryForm } from "@/components/dashboard/course/summary-form";
import { DescriptionForm } from "@/components/dashboard/course/description-form";
import { ObjectivesForm } from "@/components/dashboard/course/objectives-form";
import { PrerequisitesForm } from "@/components/dashboard/course/prerequisites-form";
import CourseImageUpload from "@/components/dashboard/course/image-form";
import PricingForm from "@/components/dashboard/course/pricing-form";
import { CircleDollarSign } from "lucide-react";
import ProgressIndicator from "@/components/dashboard/course/progress-indicator";
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
    <div className="p-2 sm:p-4 md:px-6 mx-auto max-w-4xl ">
      {/* first section */}
      <ProgressIndicator course={course} />
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
        {/* <ImageForm initialData={course} courseId={course.id} /> */}
        <CourseImageUpload initialData={course} courseId={course.id} />
        <h2 className="my-2 font-semibold flex items-center gap-4">
          <CircleDollarSign className="h-4 w-4" /> Sell Your Course
        </h2>
        <PricingForm initialData={course} courseId={course.id} />
      </section>

      {/* second section */}
    </div>
  );
};
