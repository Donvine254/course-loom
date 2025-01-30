import React from "react";
import { BookOpen, Users, DollarSign, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course, CourseTable } from "@/components/dashboard/recent-courses";
import { StatsCard } from "@/components/dashboard/stat-card";
import { EmptyState } from "@/components/dashboard/no-courses";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/prisma/prisma";
// TODO: add metadata
export default async function Dashboard() {
  const user = await currentUser();
  let userCourses: Course[] | undefined;
  if (user) {
    const userData = await prisma.instructor.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        courses: {
          select: {
            id: true,
            title: true,
            status: true,
            price: true,
          },
        },
      },
    });

    // Ensure price defaults to 0 if undefined
    userCourses = userData?.courses.map((course) => ({
      ...course,
      price: course.price ?? 0,
    }));
  }
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
        {userCourses && userCourses.length > 0 ? (
          <CourseTable courses={userCourses} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
