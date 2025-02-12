"use client";
import CourseCard from "@/components/custom/course-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteWhitelist } from "@/lib/actions/wishlist";
import { PartialCourse } from "@/types";
import { Heart, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

export default function WishListComponent({
  courses,
}: {
  courses: PartialCourse[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const router = useRouter();
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

  async function removeFromWishList(courseId: string) {
    try {
      const res = await deleteWhitelist(courseId);
      if (res.success) {
        toast.success(res.message);
        setFilteredCourses((prev) =>
          prev.filter((course) => course.id !== courseId)
        );
        router.refresh();
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }
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
            {filteredCourses.map((course) => (
              <div className="relative" key={course.id}>
                <CourseCard course={course} />
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    removeFromWishList(course.id);
                  }}
                  title="click to remove course from wishlist"
                  className="absolute top-2 right-2 z-20 rounded-full bg-black/50 hover:bg-black/40 backdrop-blur transition"
                  size="icon">
                  <Heart className="h-8 w-8 fill-red-500 text-red-500" />
                </Button>
              </div>
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
