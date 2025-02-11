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
        isFree: true,
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
// Get a single course
export const getCourseData = unstable_cache(
  async (slug: string) => {
    const course = await prisma.course.findUnique({
      relationLoadStrategy: "join",
      where: { slug: slug, isPublished: true, status: "PUBLISHED" },
      include: {
        category: true,
        _count: {
          select: { purchases: true },
        },
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
            title: true,
            position: true,
            videoUrl: true,
            subtitles: true,
            isFree: true,
            duration: true,
            _count: {
              select: {
                attachments: true,
              },
            },
          },
          orderBy: {
            position: "asc",
          },
        },
        instructor: {
          select: {
            id: true,
            username: true,
            image: true,
            specialization: true,
            bio: true,
            expertise: true,
            email: true,
            courses: {
              where: {
                isPublished: true,
                status: "PUBLISHED",
              },
              select: {
                id: true,
                title: true,
                slug: true,
                isPublished: true,
              },
            },
          },
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });

    return course || null;
  },
  [`course`],
  { revalidate: 600, tags: ["course"] }
);
