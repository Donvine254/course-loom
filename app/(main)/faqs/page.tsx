import React from "react";
import FAQ from "./faq";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Loom | Frequently Asked Questions",
  description: "An LMS platform that powers the modern mind!",
};
export default function FAQPage() {
  return (
    <section className="py-2 pt-8 md:pt-10 bg-gradient-to-tr from-indigo-200 via-gray-100 to-indigo-200 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950">
      <div className="bg-opacity-20 bg-inherit border-b ">
        <div className="px-6 py-10 md:py-20 flex flex-col items-center justify-center dark:bg-grid-indigo-800 bg-grid-indigo-100 bg-opacity-20 xsm:space-y-4">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize dark:text-white md:py-4">
            Frequently Asked Questions
          </h1>
          <p className="text-center text-muted-foreground">
            Can&apos;t find the answer you&apos;re looking for? We&apos;ve
            shared some of our most frequently asked questions to help you out.
          </p>
        </div>
      </div>
      <FAQ />
      <div className="my-6 text-center bg-indigo-200 border shadow shadow-indigo-500 w-fit rounded-lg p-6 mx-auto">
        <h3 className="text-lg font-medium text-indigo-900 mb-2">
          Still have questions?
        </h3>
        <p className="text-indigo-700">
          Contact our support team and we&apos;ll be happy to help you.
        </p>
        <Link
          href="/contact"
          prefetch={false}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Contact Support
        </Link>
      </div>
    </section>
  );
}
