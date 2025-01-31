import React from "react";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import { EditCourseForm } from "./edit-course";
import { Header } from "./header";
import ProgressIndicator from "@/components/dashboard/course/progress-indicator";
import { currentUser } from "@clerk/nextjs/server";
export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await currentUser();
  if (!user) {
    redirect("/instructor");
  }
  const course = await prisma.course.findUnique({
    where: { id: id, instructorId: user.id },
    include: {
      category: true,
      chapters: true,
      instructor: {
        select: {
          clerkId: true,
        },
      },
    },
  });
  if (!course || !user) {
    redirect("/instructor");
  }
  const categories = await prisma.category.findMany();
  const requiredFields = [
    course.title,
    course.description,
    course.categoryId,
    course.summary,
    course.objectives,
    course.imageUrl,
    course.prerequisites,
    course.chapters.some((chapter) => chapter.isPublished),
  ];
  const requiredFieldsCount = requiredFields.length;
  const missingFields = requiredFields.filter((field) => !Boolean(field));
  const missingFieldsCount = missingFields.length;
  const isCompleted = requiredFields.every(Boolean);
  console.log(
    `requiredFields: ${requiredFields.length}`,
    `missingFields: ${missingFieldsCount}`
  );
  return (
    <section>
      <Header id={course.id} isCompleted={isCompleted} />
      <ProgressIndicator
        total={requiredFieldsCount}
        current={missingFieldsCount}
      />
      <EditCourseForm course={course} categories={categories} />
    </section>
  );
}
