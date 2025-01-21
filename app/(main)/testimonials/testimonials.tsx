"use client";
import { useState } from "react";
import { testimonials } from "@/constants/testimonials";

import { TestimonialCard } from "./testimonial-card";

type SortOption = "latest" | "oldest" | "highest" | "lowest";

const Testimonials = () => {
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  const sortedTestimonials = [...testimonials].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex sm:justify-end">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="flex h-10 xsm:w-full w-fit items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500  disabled:cursor-not-allowed disabled:opacity-50">
            <option value="" disabled>
              Sort by
            </option>
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          {sortedTestimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`${
                index % 3 === 1
                  ? "lg:translate-y-12 lg:my-2 animate-fade-in delay-150"
                  : ""
              } ${testimonial.description.length > 200 ? "row-span-2" : ""}`}>
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
