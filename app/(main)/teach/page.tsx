import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
export default function Page() {
  return (
    <section className="py-2 pt-8 md:pt-10 bg-gradient-to-tr from-indigo-200 via-gray-100 to-indigo-200 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950">
      <div className="min-h-screen">
        <div className="md:hidden flex flex-col">
          <div className="relative w-full h-[300px]">
            <Image
              src="https://res.cloudinary.com/dipkbpinx/image/upload/v1737669436/illustrations/ojlwjx3ickpbptlxg2ws.webp"
              alt="Instructor teaching"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="px-6 py-8 flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold mb-4">Become an Instructor</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
              Join our community of educators and share your expertise with
              learners worldwide. Transform your knowledge into impact.
            </p>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Start Teaching
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block min-h-screen relative">
          <div className="absolute inset-0">
            <Image
              src="https://res.cloudinary.com/dipkbpinx/image/upload/t_hiring-banner/v1737669437/illustrations/szwddtkog39ndiqnoxap.webp"
              alt="Teaching background"
              fill
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
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors md:text-lg min-w-64">
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
