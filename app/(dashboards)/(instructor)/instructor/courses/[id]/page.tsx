import React from "react";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import { EditCourseForm } from "./edit-course";
import { Header } from "./header";
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

  return (
    <section>
      <Header course={course} />
      <EditCourseForm course={course} categories={categories} />
    </section>
  );
}
