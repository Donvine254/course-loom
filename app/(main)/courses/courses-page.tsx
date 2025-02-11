"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Search, GraduationCap, Filter } from "lucide-react";
import CourseCard from "@/components/custom/course-card";
import { FilterContent } from "@/components/custom/courses-filter";
import { PartialCourse } from "@/types";
import { CategoryFilters } from "@/constants/categories";

type SortOption =
  | "default"
  | "title-asc"
  | "title-desc"
  | "latest"
  | "oldest"
  | "chapters-asc"
  | "chapters-desc";

export default function CoursesPage({ courses }: { courses: PartialCourse[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1080);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    setSearchQuery(query);
    return () => window.removeEventListener("resize", checkMobile);
  }, [query]);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategories((prev) => {
      // If "All" is clicked
      if (categoryName === "All") {
        return ["All"];
      }
      const newCategories = prev.filter((cat) => cat !== "All");
      if (prev.includes(categoryName)) {
        const filtered = newCategories.filter((cat) => cat !== categoryName);
        return filtered.length === 0 ? ["All"] : filtered;
      } else {
        return [...newCategories, categoryName];
      }
    });
  };

  const sortCourses = (courses: PartialCourse[]) => {
    switch (sortBy) {
      case "title-asc":
        return [...courses].sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return [...courses].sort((a, b) => b.title.localeCompare(a.title));
      case "chapters-asc":
        return [...courses].sort(
          (a, b) => a._count.chapters - b._count.chapters
        );
      case "chapters-desc":
        return [...courses].sort(
          (a, b) => b._count.chapters - a._count.chapters
        );
      default:
        return courses;
    }
  };

  const filteredCourses = sortCourses(
    courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.summary?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.includes("All") ||
        selectedCategories.includes(course.category.name);
      const matchesPrice =
        course.price >= priceRange[0] && course.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    })
  );

  return (
    <section>
      <div className="bg-opacity-20 bg-inherit hidden lg:block border-b">
        <p className="text-sm font-medium">Home / Courses</p>
        <div className="px-6 py-10 md:py-20 flex items-center justify-center dark:bg-grid-indigo-800 bg-grid-indigo-100 bg-opacity-20">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize dark:text-white md:py-4">
            Explore Courses
          </h1>
        </div>
      </div>
      <div className="mx-auto px-4 py-8 lg:pt-2">
        {/* Search Bar and Filter Toggle */}
        <div className="relative mb-6 flex items-center gap-2">
          <div className="relative flex-grow lg:hidden group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 dark:peer-hover:text-white" />
            <input
              type="search"
              placeholder="Search courses..."
              className="pl-10 border px-3 py-2 rounded-md border-indigo-500 hover:outline-none bg-indigo-50 dark:bg-gray-800 focus:outline-none flex-1 w-full peer placeholder:text-muted-foreground focus:bg-card dark:focus:bg-gray-700 dark:focus:placeholder-gray-200 focus:transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {isMobile && (
            <Drawer modal>
              <DrawerTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerDescription />
                <DrawerHeader>
                  <DrawerTitle>Filters</DrawerTitle>
                </DrawerHeader>
                <div className="p-4">
                  <FilterContent
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>

        {/* Category Filters */}
        <ScrollArea className="w-full mb-8">
          <div className="flex space-x-2 pb-4">
            {CategoryFilters.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategories.includes(category.name);
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  className={`flex items-center gap-2 whitespace-nowrap ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : category.color
                  }`}
                  onClick={() => handleCategoryClick(category.name)}>
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar - Desktop */}
          {!isMobile && (
            <div className="space-y-6 ">
              <div className="lg:sticky lg:top-16 p-4 bg-card dark:bg-gray-950 border rounded-lg shadow dark:shadow-indigo-600">
                <FilterContent
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              </div>
            </div>
          )}
          {/* Course Grid */}
          <div className="lg:col-span-3">
            {filteredCourses && filteredCourses.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <GraduationCap className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-semibold">No courses found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
