"use server";
import prisma from "@/prisma/prisma";

import { unstable_cache } from "next/cache";

// function to return all courses
export const getAllCourses = unstable_cache(
  async () => {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
        status: "PUBLISHED",
      },
      select: {
        imageUrl: true,
        title: true,
        price: true,
        description: true,
        summary: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            name: true,
            id: true,
          },
        },
        _count: {
          select: {
            chapters: true,
          },
        },
      },
    });
    return courses || [];
  },
  ["courses"],
  { revalidate: 600, tags: ["courses"] }
);
