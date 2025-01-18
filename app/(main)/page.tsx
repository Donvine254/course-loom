import {
  ArrowRight,
  CornerRightUp,
  GraduationCap,
  LibraryBig,
  Sparkle,
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

export default function Page() {
  return (
    <section className="bg-gradient-to-tr from-indigo-200 via-gray-100 to-indigo-200 ">
      <div className="pt-12 bg-grid-indigo-100 bg-opacity-20  min-h-screen  overflow-hidden py-2 md:pt-8 flex items-center justify-center relative">
        <div className="container mx-auto px-6 pt-12 md:pt-20 pb-16 md:pb-24 text-center max-w-4xl">
          <div className="inline-block">
            <span className="inline-flex items-center rounded-full px-4 py-1 text-sm bg-indigo-50 text-indigo-600 border border-indigo-600 mb-6">
              <TrophyIcon className="h-4 w-4 mr-2" /> Best E-Learning Services
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8 md:leading-loose tracking-tight">
            Unlock Your Potential with
            <span className="text-indigo-600 block md:inline-block md:mt-6">
              {" "}
              Expert-Led Courses
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-2xl mx-auto px-4">
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
              <Sparkle className="h-6 w-6  text-indigo-500 absolute -top-4 -right-2 hidden group-hover:block delay-150 ease-in-out" />
              <Sparkle className="h-6 w-6  text-indigo-500 absolute -bottom-4 -left-2 hidden group-hover:block delay-150 ease-in-out" />
            </Link>
            <Link
              href="/courses"
              prefetch={null}
              className="w-full sm:w-auto flex items-center justify-center border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-200 transition-colors h-12">
              <LibraryBig className="w-5 h-5 text-indigo-600" /> Browse Courses
            </Link>
          </div>
        </div>
        <div className="absolute -right-2 bottom-1/4 bg-card rounded-lg shadow-lg p-4 hidden lg:block">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="font-bold">50+ Tutors</p>
            </div>
          </div>
        </div>
        <div className="absolute right-32 top-20 bg-card rounded-lg shadow-lg p-4 hidden lg:block">
          <div className="flex items-center gap-2">
            <LibraryBig className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="font-bold">100+ Online Courses</p>
            </div>
          </div>
        </div>
        <div className="absolute -left-2 top-1/4 bg-card rounded-lg shadow-lg p-4 hidden lg:block">
          <div className="text-center">
            <div className="w-fit p-1 rounded-full text-white mx-auto bg-indigo-700">
              <UserRound className="h-6 w-6" />
            </div>
            <p className="font-bold text-xl">15K+</p>
            <p className="text-sm text-gray-600">Students Enrolled</p>
            <div className="flex items-center -space-x-4">
              <Image
                alt="user 1"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                className="relative inline-block h-12 w-12 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
                height={48}
                width={48}
              />
              <Image
                alt="user 2"
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1061&amp;q=80"
                className="relative inline-block h-12 w-12 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
                height={48}
                width={48}
              />
              <Image
                alt="user 3"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1288&amp;q=80"
                className="relative inline-block h-12 w-12 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
                height={48}
                width={48}
              />
              <Image
                alt="user 4"
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1287&amp;q=80"
                className="relative inline-block h-12 w-12 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
                height={48}
                width={48}
              />
              <Image
                alt="user 5"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1760&amp;q=80"
                className="relative inline-block h-12 w-12 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
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
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Library Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <VideoIcon className="w-6 h-6 text-indigo-600" />
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
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-indigo-600" />
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
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-lg">
                  <Users className="w-6 h-6 text-indigo-600" />
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
      <section className="py-6 px-4 bg-gradient-to-tr from-indigo-200 via-gray-100 to-indigo-200">
        <div className="container mx-auto">
          <div className="flex items-center justify-between gap-2 py-2">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold">
              Featured Courses
            </h2>
            <Link href="/courses" passHref>
              <Button className="justify-start gap-1" variant="ghost">
                View All <CornerRightUp className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <CourseShowCase />
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-8 md:py-12">
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
