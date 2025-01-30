import React from "react";
import { BookOpen, Users, DollarSign, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course, CourseTable } from "@/components/dashboard/recent-courses";
import { StatsCard } from "@/components/dashboard/stat-card";
import { EmptyState } from "@/components/dashboard/no-courses";

// Mock data
const mockCourses: Course[] = [
  // { id: "1", title: "React Fundamentals", status: "published", price: 99 },
  // { id: "2", title: "Advanced TypeScript", status: "draft", price: 149 },
  // { id: "3", title: "Node.js Masterclass", status: "published", price: 199 },
  // { id: "4", title: "GraphQL API Design", status: "archived", price: 79 },
  // { id: "5", title: "Docker for Developers", status: "published", price: 129 },
];

export default function Dashboard() {
  return (
    <div className="pt-8 md:pt-10 bg-gradient-to-tr from-indigo-100 via-gray-50 to-indigo-100 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950 min-h-screen p-2">
      <div className="grid gap-4 p-2 sm:p-4 md:p-6 md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:grid-cols-3 lg:grid-cols-3">
        <StatsCard icon={BookOpen} title="Published Courses" value="12" />
        <StatsCard icon={Users} title="Total Students" value="1,234" />
        <StatsCard icon={DollarSign} title="Total Earnings" value="$12,345" />
      </div>

      {/* Latest Courses */}
      <div className="space-y-4 p-2 sm:p-4 md:px-6">
        <div className="flex justify-between items-center gap-4">
          <h1 className="font-semibold text-lg md:text-xl">Recent Courses</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Course
          </Button>
        </div>
        {mockCourses.length > 0 ? (
          <CourseTable courses={mockCourses} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
