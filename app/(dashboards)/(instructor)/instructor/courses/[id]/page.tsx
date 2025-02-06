import React from "react";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import { EditCourseForm } from "./edit-course";
import { Header } from "./header";
import { currentUser } from "@clerk/nextjs/server";
import Script from "next/script";
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
      <Script
        async
        defer
        src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
      <Header course={course} />
      <EditCourseForm course={course} categories={categories} />
    </section>
  );
}
