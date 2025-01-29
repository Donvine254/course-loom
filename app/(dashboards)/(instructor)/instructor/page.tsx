import prisma from "@/prisma/prisma";
import { CourseForm } from "./course-form";
export default async function InstructorPage() {
  const categories = await prisma.category.findMany();
  return (
    <div className="pt-8 md:pt-10 bg-gradient-to-tr from-indigo-200 via-gray-100 to-indigo-200 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950">
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <CourseForm categories={categories} />
      </div>
    </div>
  );
}
