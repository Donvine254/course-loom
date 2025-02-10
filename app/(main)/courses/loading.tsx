import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Search,
  GraduationCap,
  FilterX,
  SortAsc,
  SortDesc,
  Calendar,
  BookOpen,
  Filter,
} from "lucide-react";
import CourseCard from "@/components/custom/course-card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { PartialCourse } from "@/types";
import { getAllCourses } from "@/lib/actions";
import { CategoryFilters } from "@/constants/categories";

export default async function Loading() {
  const courses = (await getAllCourses()) as PartialCourse[] | [];
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
        <div className="relative mb-6 flex items-center gap-2 lg:hidden">
          <div className="relative flex-grow  group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 dark:peer-hover:text-white" />
            <input
              type="search"
              disabled
              placeholder="Search courses..."
              className="pl-10 border px-3 py-2 rounded-md border-indigo-500 hover:outline-none bg-indigo-50 dark:bg-gray-800 focus:outline-none flex-1 w-full peer placeholder:text-muted-foreground focus:bg-card dark:focus:bg-gray-700 dark:focus:placeholder-gray-200 focus:transition-colors"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Category Filters */}
        <ScrollArea className="w-full mb-8">
          <div className="flex space-x-2 pb-4">
            {CategoryFilters.map((category) => {
              const Icon = category.icon;

              return (
                <Button
                  key={category.name}
                  variant="outline"
                  className={`flex items-center gap-2 whitespace-nowrap ${category.color}`}>
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* add filters */}
          <div className="space-y-6 hidden lg:block ">
            <div className="lg:sticky lg:top-16 p-4 bg-card dark:bg-gray-950 border rounded-lg shadow dark:shadow-indigo-600">
              {/* add filters here */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                  <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>KSH 0</span>
                    <span>KSH 12000</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Sort By</h3>
                  <RadioGroup>
                    <div className="space-y-3">
                      <Label className="flex items-center space-x-3 cursor-pointer">
                        <RadioGroupItem value="default" />
                        <FilterX className="h-4 w-4 mr-2" />
                        <span>Default</span>
                      </Label>
                      <Label className="flex items-center space-x-3 cursor-pointer">
                        <RadioGroupItem value="title-asc" />
                        <SortAsc className="h-4 w-4 mr-2" />
                        <span>Title (A-Z)</span>
                      </Label>
                      <Label className="flex items-center space-x-3 cursor-pointer">
                        <RadioGroupItem value="title-desc" />
                        <SortDesc className="h-4 w-4 mr-2" />
                        <span>Title (Z-A)</span>
                      </Label>
                      <Label className="flex items-center space-x-3 cursor-pointer">
                        <RadioGroupItem value="latest" />
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Latest</span>
                      </Label>
                      <Label className="flex items-center space-x-3 cursor-pointer">
                        <RadioGroupItem value="oldest" />
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Oldest</span>
                      </Label>
                      <Label className="flex items-center space-x-3 cursor-pointer">
                        <RadioGroupItem value="chapters-asc" />
                        <BookOpen className="h-4 w-4 mr-2" />
                        <span>Chapters (Low to High)</span>
                      </Label>
                      <Label className="flex items-center space-x-3 cursor-pointer">
                        <RadioGroupItem value="chapters-desc" />
                        <BookOpen className="h-4 w-4 mr-2" />
                        <span>Chapters (High to Low)</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
          {/* Course Grid */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {courses.length === 0 && (
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
