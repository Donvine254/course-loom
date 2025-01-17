import React from "react";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";

type CourseCardProps = {
  title: string;
  image: string;
  category: string;
  description: string;
  chapters: number;
  price: number;
};

export default function CourseCard({ course }: { course: CourseCardProps }) {
  const { title, category, image, price, chapters } = course;
  return (
    <div className="w-fit border shadow bg-card rounded-md max-w-sm">
      <div className="aspect-video w-full overflow-hidden">
        <Image
          alt={title}
          src={image}
          width={300}
          height={300}
          placeholder="blur"
          blurDataURL="/placeholder.jpg"
          className="rounded-md  cursor-pointer"
          style={{ width: "auto", height: "auto" }}
          priority
        />
      </div>
      <div className="py-6 px-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
            {category}
          </span>
          <div className="flex items-center text-muted-foreground">
            <BookOpen className="h-4 w-4 mr-1" />
            <span className="text-sm">{chapters} chapters</span>
          </div>
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 hover:text-indigo-600 transition-colors truncate">
          {/* how do i prevent the title from overflowing and increasing the width of its parent? */}
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-medium">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "KSH",
              maximumFractionDigits: 0,
            }).format(price * 120)}
          </span>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center border py-0.5 px-2 rounded-md">
            Explore
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
