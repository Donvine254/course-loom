import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
export default function Page() {
  return (
    <section className="bg-gradient-to-tr from-indigo-200 via-gray-50 to-indigo-200 ">
      <div className="pt-12 bg-grid-indigo-100  min-h-screen  overflow-hidden py-2 md:pt-8 flex items-center justify-center ">
        <div className="container mx-auto px-6 pt-12 md:pt-20 pb-16 md:pb-24 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8">
            Unlock Your Potential with
            <span className="text-indigo-600 block md:inline">
              {" "}
              Expert-Led Courses
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-2xl mx-auto px-4">
            Join thousands of learners worldwide and master new skills with our
            premium online courses. Start your learning journey today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <button className="w-full sm:w-auto flex items-center justify-center bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition-colors">
              Start Learning Now
              <ArrowRight className="ml-2 h-5 w-5 animate-move-arrow" />
            </button>
            <Link
              href="/courses"
              prefetch={null}
              className="w-full sm:w-auto flex items-center justify-center border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors">
              View Courses
            </Link>
          </div>
        </div>
        <Image
          src="https://res.cloudinary.com/dipkbpinx/image/upload/v1737082617/illustrations/undraw_online-information_hhp2_x5mi1y.svg"
          alt="illustration"
          width={300}
          height={300}
        />
      </div>
    </section>
  );
}
