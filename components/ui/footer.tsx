import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Separator } from "./separator";
export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 dark:text-white pt-12 pb-4">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-indigo-600 space-x-2 mb-8 md:mb-0">
            <Image
              src="https://res.cloudinary.com/dipkbpinx/image/upload/v1737068784/logos/uxdt5wtwbk0qctgm5qbe.png"
              height={32}
              width={32}
              alt="Course Loom"
              priority
              className="h-8 w-8 xsm:h-6 xsm:w-6 "
            />
            <h1 className="text-2xl xsm:text-lg font-bold">CourseLoom</h1>
          </Link>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
            <Link
              href="/instructor"
              className="hover:text-blue-600 hover:underline">
              Become an Instructor
            </Link>
            <Link
              href="/courses"
              className="hover:text-blue-600 hover:underline">
              Courses
            </Link>
            <Link
              href="/contact"
              className="hover:text-blue-600 hover:underline">
              Contact
            </Link>
            <Link
              href="/privacy"
              className="hover:text-blue-600 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
        <Separator />
        <div className="text-center text-sm">
          &copy; {new Date().getFullYear()} CourseLoom. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
