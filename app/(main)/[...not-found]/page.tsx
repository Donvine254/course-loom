import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Course Loom | Not Found",
  description: "An LMS platform that powers the modern mind!",
};
export default function NotFound() {
  return (
    <section className="h-screen py-2 pt-8 md:pt-10 flex items-center justify-center bg-indigo-100 dark:bg-indigo-950 bg-blend-darken">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-16 p-6">
        {/* Illustration */}
        <div className="aspect-video w-full relative overflow-hidden lg:hidden">
          <Image
            src="https://res.cloudinary.com/dipkbpinx/image/upload/v1737404563/illustrations/undraw_taken_mshk_emnw1v.svg"
            fill
            alt="404 illustration"
            className="animate-fade-in h-full object-contain bg-blend-color-lighten"
            priority
          />
        </div>
        {/* Content */}
        <div className="text-center lg:text-left space-y-4 md:space-y-6 lg:space-y-8 animate-fade-in [animation-delay:200ms] p-2">
          {/* Error Badge */}
          <span className="lg:text-center px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-sm text-muted-foreground shadow">
            404 Error
          </span>

          {/* Heading */}
          <h1 className="text-4xl text-gray-700 lg:text-6xl my-2 font-bold">
            Page Not Found
          </h1>
          {/* Description */}
          <p className="text-gray-600 text-center my-2 max-w-md mx-auto lg:mx-0">
            It seems you&apos;ve wandered into uncharted territory. Let&apos;s
            get you back on track.
          </p>
          {/* Return Home Button */}
          <div className="pt-4 flex items-center justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors h-12 w-fit">
              <ArrowLeft className="w-4 h-4 animate-move-arrow" />
              <span>Return Home</span>
            </Link>
          </div>
          <div className="absolute inset-0 -z-10 ">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-400/50 to-gray-500/50 backdrop-blur-3xl rounded-3xl transform -rotate-2" />
            <div className="absolute inset-0 bg-gradient-to-l from-gray-50/50 to-gray-100/50 backdrop-blur-3xl rounded-3xl transform rotate-2 shadow" />
          </div>
        </div>
        {/* Illustration */}
        <div className="aspect-video w-full relative overflow-hidden hidden lg:block">
          <Image
            src="https://res.cloudinary.com/dipkbpinx/image/upload/v1737404563/illustrations/undraw_taken_mshk_emnw1v.svg"
            fill
            alt="404 illustration"
            className="animate-fade-in h-full object-contain bg-blend-color-lighten"
            priority
          />
        </div>
      </div>
    </section>
  );
}
