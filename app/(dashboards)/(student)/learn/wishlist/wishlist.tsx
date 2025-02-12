"use client";
import CourseCard from "@/components/custom/course-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PartialCourse } from "@/types";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function WishListComponent({
  courses,
}: {
  courses: PartialCourse[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredCourses(courses);
      return;
    }

    setFilteredCourses(
      courses.filter(
        (c) =>
          c.title?.toLowerCase().includes(query) ||
          c.category.name?.toLocaleLowerCase().includes(query) ||
          c.summary?.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="p-2 sm:p-4 md:px-6 ">
      <div className="flex w-full items-center justify-between gap-2">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          <Input
            placeholder="Search wishlist"
            type="search"
            className="w-full pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Button variant="secondary" asChild>
          <Link href="/courses" prefetch={false}>
            Browse Courses
          </Link>
        </Button>
      </div>
      {filteredCourses && filteredCourses.length > 0 ? (
        <div className="py-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        </div>
      ) : (
        <div className="py-6 text-muted-foreground ">
          <Image
            src="https://res.cloudinary.com/dipkbpinx/image/upload/v1739399891/illustrations/undraw_file-search_cbur_hrzysu.svg"
            width={300}
            height={300}
            alt="illustration"
            className="mx-auto my-8"
          />
          <p className="text-center">
            You have wishlist courses. Browse courses and add any course that
            you like to wishlist.
          </p>
        </div>
      )}
    </div>
  );
}
