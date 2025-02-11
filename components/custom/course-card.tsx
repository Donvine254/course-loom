import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { PartialCourse } from "@/types";
import { formatPrice, imageUrlConstructor } from "@/lib/utils";

export default function CourseCard({ course }: { course: PartialCourse }) {
  const { title, category, imageUrl, price, summary, slug } = course;
  return (
    <div className="border dark:border-gray-900 shadow bg-card dark:bg-gray-950 dark:text-white rounded-md dark:shadow-indigo-700 flex flex-col">
      <div
        className="aspect-video w-full relative overflow-hidden"
        style={{ position: "relative" }}>
        <Link href={`/courses/${slug}`}>
          <Image
            alt={title}
            fill
            src={imageUrlConstructor(imageUrl || "")}
            placeholder="blur"
            blurDataURL="/placeholder.jpg"
            className="rounded-t-md object-cover cursor-pointer"
            priority
          />
        </Link>
      </div>
      <div className="py-6 px-3 flex flex-col flex-grow">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg truncate">
            {category.name}
          </span>
          <div className="flex items-center text-muted-foreground">
            <span className="bg-indigo-50 text-indigo-600 p-1 rounded-full flex items-center justify-center mr-1">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="text-sm">
              {course._count?.chapters ?? 0} chapters
            </span>
          </div>
        </div>
        <Link
          href={`/courses/${slug}`}
          prefetch={false}
          className="block font-semibold max-w-full my-4 hover:text-indigo-600 transition-colors line-clamp-2 cursor-pointer hover:underline">
          {title}
        </Link>

        <div className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {summary}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="font-medium">
            {course.isFree ? "Free" : formatPrice(price)}
          </span>
          <Link href={`/courses/${slug}`} prefetch={false} passHref>
            <button className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center border dark:border-indigo-600 py-0.5 px-2 rounded-md group">
              Explore
              <ArrowRight className="h-4 w-4 ml-1 group-hover:animate-move-arrow" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
