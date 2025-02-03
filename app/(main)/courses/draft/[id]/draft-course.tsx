import { Button } from "@/components/ui/button";
import { imageUrlConstructor } from "@/lib/utils";
import { Category, Chapter, Course, Instructor } from "@prisma/client";
import { BadgeInfo, Globe, GraduationCap, Play, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { renderStars } from "@/lib/render-stars";
type FullCourse = Course & {
  category: Category;
  instructor: Instructor;
  chapters: Chapter[];
};
export default function DraftCourse({ course }: { course: FullCourse }) {
  return (
    <div>
      {/* header section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-6 xsm:gap-2 md:gap-8 items-center ">
            <div>
              <div className="flex items-center gap-2 my-2 lg:mb-4">
                <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-sm  ">
                  40% Off
                </span>
                <span className="text-sm font-medium truncate">
                  {course.category.name}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                {course.title}
              </h1>
              <p className="text-sm text-gray-200 my-2">
                {course.summary || "No summary provided"}
              </p>
              <div className="flex items-center flex-wrap gap-4 mb-4 text-sm md:text-base">
                <div className="flex items-center">
                  <div className="flex mr-2">{renderStars(Math.floor(0))}</div>
                  <span className="ml-1">0.0</span>
                  <span className="ml-1">(0 ratings)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>0 students</span>
                </div>
                <div className="flex items-center flex-wrap gap-4 mb-2 text-sm md:text-base">
                  <div className="flex items-center gap-1">
                    <BadgeInfo className="w-4 h-4 rotate-180" />
                    <span>
                      Last updated on{" "}
                      {new Date(course.updatedAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <span>English</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <Image
                  src={`https://ui-avatars.com/api/?background=random&name=${course.instructor.username}`}
                  height={32}
                  width={32}
                  alt={course.instructor.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium capitalize">
                    {course.instructor.username}
                  </p>
                  <p className="text-sm text-gray-200 capitalize">
                    {course.instructor.specialization}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Link href="#enroll" passHref scroll>
                  <Button
                    variant="secondary"
                    className="justify-start gap-2"
                    disabled>
                    <GraduationCap className="h-5 w-5" /> Enroll Now
                  </Button>
                </Link>
                <Button
                  className="border border-gray-200 hover:border-background justify-start gap-2"
                  disabled>
                  <Play className="h-4 w-4" />
                  Preview this Course
                </Button>
              </div>
            </div>
            <div className="relative">
              <video
                poster={imageUrlConstructor(course.imageUrl || "") || ""}
                className="w-full h-full object-cover rounded-md"
                controls
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
