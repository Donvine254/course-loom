"use server";

import prisma from "@/prisma/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { unstable_cache } from "next/cache";

export const getInstructorCourses = unstable_cache(
  async () => {
    const user = await currentUser();
    if (!user) return [];
    const courses = await prisma.course.findMany({
      where: {
        instructorId: user.id, // Use the correct instructor ID
      },
      select: {
        id: true,
        title: true,
        status: true,
        price: true,
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return courses || [];
  },
  ["instructor", "courses"],
  {
    revalidate: 600,
    tags: ["instructor", "courses"],
  }
);
