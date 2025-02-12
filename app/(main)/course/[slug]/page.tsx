import React from "react";
import CoursePage from "./course-page";
import { Metadata } from "next";
import { getCourseData } from "@/lib/actions";
import { redirect } from "next/navigation";
import prisma from "@/prisma/prisma";
export const metadata: Metadata = {
  title: "Course Loom | Explore our courses",
  description: "An LMS platform that powers the modern mind!",
};

export async function generateStaticParams() {
  try {
    const slugs = await prisma.course.findMany({
      where: {
        status: "PUBLISHED",
      },
      select: {
        slug: true,
      },
    });
    const slugArray = slugs.map((slugObj) => slugObj.slug);
    return slugArray;
  } catch (error) {
    console.error("Error fetching courses data:", error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseData(slug);
  if (!course) redirect("/courses?res=course-not-found");
  return (
    <section className="pt-8 md:pt-10 bg-gradient-to-tr from-indigo-200 via-gray-100 to-indigo-200 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950">
      <CoursePage course={course} />
    </section>
  );
}
