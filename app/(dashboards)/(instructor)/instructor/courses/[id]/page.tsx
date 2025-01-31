import React from "react";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import { EditCourseForm } from "./edit-course";
import { Header } from "./header";
export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: { id: id },
    include: {
      category: true,
    },
  });
  if (!course) {
    redirect("/instructor");
  }
  const categories = await prisma.category.findMany();

  return (
    <section>
      <Header id={course.id} />
      <EditCourseForm course={course} categories={categories} />
    </section>
  );
}
