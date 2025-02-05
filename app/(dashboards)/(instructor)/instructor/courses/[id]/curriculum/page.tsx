import React from "react";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { Header } from "../header";
import ChapterForm from "./chapter-form";
import ChapterList from "./chapter-list";
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

  return (
    <section>
      <Header course={course} />
      <ChapterForm id={course.id} />
      <ChapterList items={course.chapters} courseId={course.id} />
    </section>
  );
}
