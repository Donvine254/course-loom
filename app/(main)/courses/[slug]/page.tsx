import React from "react";
import CoursePage from "./course-page";
import { course } from "@/constants";
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  console.log(slug);
  return (
    <section className="py-2 pt-8 md:pt-10 bg-gradient-to-tr from-indigo-200 via-gray-100 to-indigo-200 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950">
      <CoursePage course={course} />
    </section>
  );
}
