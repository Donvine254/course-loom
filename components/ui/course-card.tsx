import React from "react";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

type CourseCardProps = {
  title: string;
  image: string;
  category: string;
  description: string;
  chapters: number;
  price: number;
};

export default function CourseCard({ course }: { course: CourseCardProps }) {
  const { title, category, image, price, chapters, description } = course;
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
          className="rounded-md object-contain  cursor-pointer"
          style={{ width: "auto", height: "auto" }}
          priority
        />
      </div>
      <div className="py-6 px-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg truncate">
            {category}
          </span>
          <div className="flex items-center text-muted-foreground">
            <span className="bg-indigo-50 text-indigo-600 p-1 rounded-full flex items-center justify-center mr-1">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="text-sm">{chapters} chapters</span>
          </div>
        </div>
        <h3 className="md:text-lg font-semibold  mb-4 hover:text-indigo-600 transition-colors truncate cursor-pointer ">
          <Link href="/courses" prefetch={false}>
            {title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-medium">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "KSH",
              maximumFractionDigits: 0,
            }).format(price * 120)}
          </span>
          <Link href="/courses" prefetch={false} passHref>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center border py-0.5 px-2 rounded-md group">
              Explore
              <ArrowRight className="h-4 w-4 ml-1 group-hover:animate-move-arrow" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
