import React from "react";
import Testimonials from "./testimonials";
import CTA from "@/components/ui/call-to-action";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Course Loom | Student Success Stories",
    description: "An LMS platform that powers the modern mind!",
  };
export default function TestimonialsPage() {
  return (
    <section className="py-2 pt-8 md:pt-10 bg-gradient-to-tr from-indigo-200 via-gray-100 to-indigo-200 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950">
      <div className="bg-opacity-20 bg-inherit border-b ">
        <div className="px-6 py-10 md:py-20 flex flex-col items-center justify-center dark:bg-grid-indigo-800 bg-grid-indigo-100 bg-opacity-20 xsm:space-y-4">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize dark:text-white md:py-4">
            Student Success Stories
          </h1>
          <p className="text-center text-muted-foreground">
            Join thousands of learners who transformed their careers with
            Courseloom
          </p>
        </div>
      </div>
      <Testimonials />
      <CTA />
    </section>
  );
}
