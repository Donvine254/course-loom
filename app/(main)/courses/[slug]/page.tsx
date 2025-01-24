import React from "react";
import CoursePage from "./course-page";
import { course } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Loom | Explore our courses",
  description: "An LMS platform that powers the modern mind!",
};
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log(slug);
  return (
    <section className="pt-8 md:pt-10 bg-gradient-to-tr from-indigo-200 via-gray-100 to-indigo-200 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950">
      <CoursePage course={course} />
    </section>
  );
}
