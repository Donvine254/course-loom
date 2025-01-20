import React from "react";
import { Contact } from "./contact";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";
export const metadata: Metadata = {
  title: "Course Loom | Contact Us",
  description: "An LMS platform that powers the modern mind!",
};

export default function Page() {
  return (
    <div className="py-2 pt-8 md:pt-10 bg-gradient-to-tr from-indigo-200 via-gray-100 to-indigo-200 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950">
      <Contact />
      <section className="bg-indigo-600 dark:bg-indigo-800 text-white py-8 md:py-12">
        <div className="container mx-auto px-6 text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto px-4">
              Join our community of learners and take the first step towards
              your goals.
            </p>
          </div>
          <Link href="/dashboard" prefetch={null} passHref>
            <Button className="w-auto bg-white text-indigo-600  hover:bg-gray-100 transition-colors justify-start">
              <GraduationCap className="w-6 h-6 mr-2" /> Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
