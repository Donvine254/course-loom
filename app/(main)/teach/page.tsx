import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import GetStarted from "./get-started";
import OnboardingForm from "./onboarding-form";
import { currentUser } from "@clerk/nextjs/server";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Course Loom | Become an Instructor",
  description: "An LMS platform that powers the modern mind!",
};

export default async function Page() {
  const stats = [
    { value: "62M+", label: "Students" },
    { value: "830M+", label: "Enrollments" },
    { value: "180+", label: "Countries" },
    { value: "75+", label: "Languages" },
  ];
  const user = await currentUser();
  return (
    <section className="pt-8 md:pt-10 bg-gradient-to-tr from-indigo-200 via-gray-100 to-indigo-200 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950">
      <Script
        async
        defer
        src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
      {/* Hero section */}
      <div className="min-h-screen">
        <div className="md:hidden flex flex-col">
          <div className="relative w-full h-[300px] sm:h-[400px]">
            <Image
              src="https://res.cloudinary.com/dipkbpinx/image/upload/t_hiring-banner/v1737669436/illustrations/ojlwjx3ickpbptlxg2ws.webp"
              alt="Instructor teaching"
              fill
              quality={100}
              className="object-cover object-top"
              priority
            />
          </div>
          <div className="px-6 py-8 flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold mb-4 text-center">
              Become an Instructor
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Join our community of educators and share your expertise with
              learners worldwide. Transform your knowledge into impact.
            </p>
            <OnboardingForm
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors min-w-64"
              id={user?.id || ""}
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block min-h-screen relative">
          <div className="absolute inset-0">
            <Image
              src="https://res.cloudinary.com/dipkbpinx/image/upload/t_hiring-banner/v1737669437/illustrations/szwddtkog39ndiqnoxap.webp"
              alt="Teaching background"
              fill
              quality={100}
              className="object-cover"
              priority
            />

            {/* Overlay for better text readability */}
          </div>
          <div className="relative z-10 container mx-auto px-6 h-screen flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Become an Instructor
              </h1>
              <p className="text-xl mb-8 leading-relaxed text-muted-foreground">
                Join our community of educators and share your expertise with
                learners worldwide. Transform your knowledge into impact and
                change lives — including your own.
              </p>
              <OnboardingForm
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors md:text-lg min-w-64"
                id={user?.id || ""}
              />
            </div>
          </div>
        </div>
      </div>
      <Separator />
      {/* Reasons section */}
      <div className="py-4 pb-8 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-8">
            So many reasons to start
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <Image
                src="https://res.cloudinary.com/dipkbpinx/image/upload/v1737673025/illustrations/jkvb2et2tasqrhqt4abo.webp"
                alt="teach-your-way"
                height={80}
                width={80}
                className="w-20 h-20 bg-indigo-950  mx-auto mb-6 object-contain"
              />

              <h3 className="text-xl font-semibold mb-4">Teach your way</h3>
              <p className="text-muted-foreground">
                Publish the course you want, in the way you want, and always
                have control of your own content.
              </p>
            </div>
            <div className="text-center">
              <Image
                src="https://res.cloudinary.com/dipkbpinx/image/upload/v1737673025/illustrations/lgqsmy4pp0jwng7xssoa.webp"
                alt="teach-your-way"
                height={80}
                width={80}
                className="w-20 h-20 bg-indigo-950  mx-auto mb-6 object-contain"
              />
              <h3 className="text-xl font-semibold mb-4">Inspire learners</h3>
              <p className="text-muted-foreground">
                Teach what you know and help learners explore their interests,
                gain new skills, and advance their careers.
              </p>
            </div>
            <div className="text-center">
              <Image
                src="https://res.cloudinary.com/dipkbpinx/image/upload/v1737673024/illustrations/kqd3u8zjwbqhkydvqqvg.webp"
                alt="teach-your-way"
                height={80}
                width={80}
                className="w-20 h-20 bg-indigo-950  mx-auto mb-6 object-contain"
              />
              <h3 className="text-xl font-semibold mb-4">Get rewarded</h3>
              <p className="text-muted-foreground">
                Expand your professional network, build your expertise, and earn
                money on each paid enrollment.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Section */}
      <div className="bg-indigo-700 py-16 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold mb-3">{stat.value}</div>
                <div className="text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Get started section */}
      <GetStarted />
      {/* section for CTA */}
      <section className="bg-indigo-600 dark:bg-indigo-800 text-white py-8 md:py-12relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 mb-6 text-sm font-medium rounded-full bg-indigo-50 text-indigo-600">
              Begin Your Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Transform your expertise into impact
            </h2>
            <p className="text-lg text-gray-200 mb-8">
              Join our community of instructors and start creating courses
              today. Share your knowledge and help others grow while building
              your own success story.
            </p>
            <OnboardingForm
              className="bg-white text-indigo-600  hover:bg-gray-100 transition-all duration-300 text-lg "
              title="Start Teaching Today"
              id={user?.id || ""}
            />
          </div>
        </div>
      </section>
    </section>
  );
}
