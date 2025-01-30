import prisma from "@/prisma/prisma";
import { CourseForm } from "./course-form";
import { currentUser } from "@clerk/nextjs/server";

export default async function InstructorPage() {
  const categories = await prisma.category.findMany();

  const user = await currentUser();
  const userId = user?.id || "";
  return (
    <div className="pt-8 md:pt-10 bg-gradient-to-tr from-indigo-100 via-gray-50 to-indigo-100 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950 min-h-screen">
      <div className="max-w-4xl mx-auto p-2 flex flex-col items-center justify-center py-16">
        <CourseForm categories={categories} userId={userId} />
      </div>
    </div>
  );
}
