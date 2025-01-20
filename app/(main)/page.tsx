import {
  ArrowRight,
  CornerRightUp,
  GraduationCap,
  LibraryBig,
  Sparkles,
  TrophyIcon,
  UserRound,
  Users,
  VideoIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CourseShowCase } from "@/components/ui/course-carousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Loom | Learning begins here!",
  description: "An LMS platform that powers the modern mind!",
};
export default async function Page() {
  return (
    <section className="bg-gradient-to-tr from-indigo-200 via-gray-100 to-indigo-200 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950">
      <div className="pt-12 bg-grid-indigo-100 dark:bg-grid-indigo-800 bg-opacity-20  min-h-screen  overflow-hidden py-2 md:pt-8 flex items-center justify-center relative">
        <div className="container mx-auto px-6 pt-12 md:pt-20 pb-16 md:pb-24 text-center max-w-4xl">
          <div className="inline-block">
            <span className="inline-flex items-center rounded-full px-4 py-1 text-sm bg-indigo-50 text-indigo-600 border border-indigo-600 mb-6">
              <TrophyIcon className="h-4 w-4 mr-2" /> Best E-Learning Services
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 md:mb-8 md:leading-loose tracking-tight">
            Unlock Your Potential with
            <span className="text-indigo-600 block md:inline-block md:mt-6">
              {" "}
              Expert-Led Courses
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto px-4">
            Join thousands of learners worldwide and master new skills with our
            premium online courses. Start your learning journey today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
            <Link
              className="w-full sm:w-auto flex items-center justify-center bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors h-12 relative group"
              href="/dashboard"
              prefetch={null}>
              <GraduationCap className="w-6 h-6 mr-2" />
              Start Learning Now
              <ArrowRight className="ml-2 h-5 w-5 animate-move-arrow" />
              <Sparkles className="h-6 w-6  text-indigo-500 absolute -top-8 -right-2 hidden md:block animate-pulse delay-150 ease-in-out" />
              <Sparkles className="h-6 w-6  text-indigo-500 absolute -bottom-8 -left-2 hidden md:block animate-pulse delay-100 ease-in-out" />
            </Link>
            <Link
              href="/courses"
              prefetch={null}
              className="w-full sm:w-auto flex items-center justify-center border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900 dark:hover:text-white transition-colors h-12">
              <LibraryBig className="w-5 h-5" /> Browse Courses
            </Link>
          </div>
        </div>
        <div className="absolute -right-2 bottom-1/4 bg-card  rounded-lg shadow-lg p-4 hidden lg:block border border-input dark:border-indigo-900 dark:text-white dark:shadow dark:shadow-indigo-600 dark:bg-gray-900">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="font-bold">50+ Tutors</p>
            </div>
          </div>
        </div>
        <div className="absolute right-32 top-20 bg-card rounded-lg shadow-lg p-4 hidden lg:block border border-input dark:border-indigo-900 dark:text-white dark:shadow dark:shadow-indigo-600 dark:bg-gray-900 ">
          <div className="flex items-center gap-2">
            <LibraryBig className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="font-bold">100+ Online Courses</p>
            </div>
          </div>
        </div>
        <div className="absolute -left-2 top-1/4 bg-card rounded-lg shadow-lg p-4 hidden lg:block border border-input dark:border-indigo-900 dark:text-white dark:shadow dark:shadow-indigo-600 dark:bg-gray-950">
          <div className="text-center">
            <div className="w-fit p-1 rounded-full text-white mx-auto bg-indigo-700">
              <UserRound className="h-6 w-6" />
            </div>
            <p className="font-bold text-xl">15K+</p>
            <p className="text-sm text-gray-600 my-1">Students Enrolled</p>
            <div className="flex items-center -space-x-4">
              <Image
                alt="user 1"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                className="relative inline-block h-12 w-12 rounded-full border-2 border-white dark:border-indigo-600 object-cover object-center hover:z-10 focus:z-10"
                height={48}
                width={48}
              />
              <Image
                alt="user 2"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1061&amp;q=80"
                className="relative inline-block h-12 w-12 rounded-full border-2 border-white dark:border-orange-800  object-cover object-center hover:z-10 focus:z-10"
                height={48}
                width={48}
              />
              <Image
                alt="user 3"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1288&amp;q=80"
                className="relative inline-block h-12 w-12 rounded-full border-2 border-white dark:border-blue-800  object-cover object-center hover:z-10 focus:z-10"
                height={48}
                width={48}
              />
              <Image
                alt="user 4"
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1287&amp;q=80"
                className="relative inline-block h-12 w-12 rounded-full border-2 border-white dark:border-green-800  object-cover object-center hover:z-10 focus:z-10"
                height={48}
                width={48}
              />
              <Image
                alt="user 5"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1760&amp;q=80"
                className="relative inline-block h-12 w-12 rounded-full border-2 border-white dark:border-indigo-600  object-cover object-center hover:z-10 focus:z-10"
                height={48}
                width={48}
              />
            </div>
          </div>
        </div>
        <div className="absolute -left-4 bottom-28 hidden lg:block rotate-90">
          <div className={`grid grid-cols-5 gap-2`}>
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-indigo-400/60"
              />
            ))}
          </div>
        </div>
        <div className="absolute left-1/4 -top-2 hidden lg:block">
          <div className={`grid grid-cols-5 gap-2`}>
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-indigo-400/60"
              />
            ))}
          </div>
        </div>
        <div className="absolute -right-4 top-48 hidden lg:block rotate-90">
          <div className={`grid grid-cols-5 gap-2`}>
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-indigo-400/60"
              />
            ))}
          </div>
        </div>
      </div>
      <section className="py-16 px-4 bg-gray-50 dark:bg-black dark:border-y dark:border-y-indigo-900">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Library Card */}
            <div className="bg-card dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-input dark:border-indigo-900 dark:text-white">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-600 rounded-lg">
                  <VideoIcon className="w-6 h-6 text-indigo-600 dark:text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">150+ Free Videos</h3>
                  <Link
                    href="/courses"
                    className="text-sm text-indigo-600 hover:underline">
                    View More →
                  </Link>
                </div>
              </div>
            </div>

            {/* Courses Card */}
            <div className="bg-card dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-input dark:border-indigo-900 dark:text-white">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-lg dark:bg-indigo-600">
                  <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">10K+ Online Courses</h3>
                  <Link
                    href="/courses"
                    className="text-sm text-indigo-600 hover:underline">
                    View More →
                  </Link>
                </div>
              </div>
            </div>

            {/* Expert Card */}
            <div className="bg-card dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-input dark:border-indigo-900 dark:text-white">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 dark:bg-indigo-600 rounded-lg">
                  <Users className="w-6 h-6 text-indigo-600 dark:text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    50+ Expert Instructors
                  </h3>
                  <Link
                    href="/courses"
                    className="text-sm text-indigo-600 hover:underline">
                    View More →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* section for featured courses */}
      <section
        className="py-6 px-4 bg-gradient-to-tr from-indigo-200 via-gray-100 to-indigo-200 dark:bg-gradient-to-tr dark:from-indigo-800 dark:via-gray-900 dark:to-indigo-800 dark:text-white
">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center py-1">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold w-fit bg-gray-100 dark:bg-gray-900 text-indigo-600 px-3 py-1">
              Featured Courses
            </h2>
            <p className="text-center text-muted-foreground">
              Explore our most popular courses and start your learning journey
              today
            </p>
          </div>

          <CourseShowCase />
          <div className="flex items-center justify-center">
            <Link href="/courses" passHref>
              <Button
                className="justify-start gap-1 bg-gray-100 dark:bg-gray-900 text-indigo-600 hover:bg-indigo-600 hover:text-white dark:border-gray-900 transition-colors"
                variant="outline">
                View All <CornerRightUp className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* CTA Section */}
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
            <Button className="w-full sm:w-auto bg-white text-indigo-600  hover:bg-gray-100 transition-colors justify-start">
              <GraduationCap className="w-6 h-6 mr-2" /> Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </section>
  );
}
