"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Book,
  Code2,
  Database,
  LineChart,
  Palette,
  Search,
  Smartphone,
  Camera,
  Briefcase,
  GraduationCap,
  DollarSign,
  Filter,
  SortAsc,
  SortDesc,
  Calendar,
  BookOpen,
} from "lucide-react";
import { sampleCourses } from "@/constants";
import CourseCard from "@/components/ui/course-card";

const categories = [
  { name: "All", icon: Book, color: "text-gray-500" },
  { name: "Web Development", icon: Code2, color: "text-blue-500" },
  { name: "Data Science", icon: Database, color: "text-green-500" },
  { name: "Marketing", icon: LineChart, color: "text-purple-500" },
  { name: "Design", icon: Palette, color: "text-pink-500" },
  { name: "Business", icon: Briefcase, color: "text-orange-500" },
  { name: "Photography", icon: Camera, color: "text-indigo-500" },
  { name: "Finance", icon: DollarSign, color: "text-yellow-500" },
  { name: "Mobile Development", icon: Smartphone, color: "text-red-500" },
];

type SortOption =
  | "default"
  | "title-asc"
  | "title-desc"
  | "latest"
  | "oldest"
  | "chapters-asc"
  | "chapters-desc";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategories((prev) => {
      // If "All" is clicked
      if (categoryName === "All") {
        return ["All"];
      }

      // If a category other than "All" is clicked
      const newCategories = prev.filter((cat) => cat !== "All");
      if (prev.includes(categoryName)) {
        // Remove the category if it's already selected
        const filtered = newCategories.filter((cat) => cat !== categoryName);
        // If no categories remain, select "All"
        return filtered.length === 0 ? ["All"] : filtered;
      } else {
        // Add the new category
        return [...newCategories, categoryName];
      }
    });
  };

  const sortCourses = (courses: typeof sampleCourses) => {
    switch (sortBy) {
      case "title-asc":
        return [...courses].sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return [...courses].sort((a, b) => b.title.localeCompare(a.title));
      case "chapters-asc":
        return [...courses].sort((a, b) => a.chapters - b.chapters);
      case "chapters-desc":
        return [...courses].sort((a, b) => b.chapters - a.chapters);
      default:
        return courses;
    }
  };

  const filteredCourses = sortCourses(
    sampleCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.includes("All") ||
        selectedCategories.includes(course.category);
      const matchesPrice =
        course.price >= priceRange[0] && course.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    })
  );

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <Slider
          defaultValue={[0, 100]}
          max={100}
          step={1}
          value={priceRange}
          onValueChange={setPriceRange}
          className="py-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>KSH {priceRange[0] * 120}</span>
          <span>KSH {priceRange[1] * 120}</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Sort By</h3>
        <RadioGroup
          value={sortBy}
          onValueChange={(value) => setSortBy(value as SortOption)}>
          <div className="space-y-3">
            <Label className="flex items-center space-x-3 cursor-pointer">
              <RadioGroupItem value="default" />
              <span>Default</span>
            </Label>
            <Label className="flex items-center space-x-3 cursor-pointer">
              <RadioGroupItem value="title-asc" />
              <SortAsc className="h-4 w-4 mr-2" />
              <span>Title A-Z</span>
            </Label>
            <Label className="flex items-center space-x-3 cursor-pointer">
              <RadioGroupItem value="title-desc" />
              <SortDesc className="h-4 w-4 mr-2" />
              <span>Title Z-A</span>
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
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar and Filter Toggle */}
      <div className="relative mb-6 flex items-center gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {isMobile && (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filters</DrawerTitle>
              </DrawerHeader>
              <div className="p-4">
                <FilterContent />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>

      {/* Category Filters */}
      <ScrollArea className="w-full mb-8">
        <div className="flex space-x-2 pb-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategories.includes(category.name);
            return (
              <Button
                key={category.name}
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
            <div className="lg:sticky lg:top-4 p-4 bg-card dark:bg-gray-950 border rounded-lg shadow dark:shadow-indigo-600">
              <FilterContent />
            </div>
          </div>
        )}

        {/* Course Grid */}
        <div className="lg:col-span-3">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
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
  );
}
