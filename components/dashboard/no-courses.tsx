import React from "react";
import Image from "next/image";
import Link from "next/link";

export function EmptyState() {
  return (
    <div className="w-full p-6 rounded-lg bg-card border-input shadow dark:bg-gray-900 dark:shadow-indigo-500">
      <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex-1 flex items-center justify-center">
          <Image
            src="https://res.cloudinary.com/dipkbpinx/image/upload/v1738231319/illustrations/brkdxs3pfxt2rihwncht.png"
            alt="illustration"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between items-start  space-y-4">
          <h3 className="text-lg md:text-xl lg:text-2xl font-medium self-center md:self-start">
            Create Your First Course!
          </h3>
          <p className="text-muted-foreground max-w-lg text-sm md:text-base text-center md:text-start">
            Whether you&apos;ve been teaching for years or are teaching for the
            first time, you can make an engaging course. We&apos;ve compiled
            resources and best practices to help you get to the next level, no
            matter where you&apos;re starting.
          </p>
          <Link
            prefetch={false}
            href="/instructor/courses/create"
            className="text-indigo-600 md:text-lg underline font-semibold self-center md:self-start">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
