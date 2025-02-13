"use server";
import prisma from "@/prisma/prisma";
import { auth } from "@clerk/nextjs/server";

export const getInstructorCourses = async () => {
  const { userId } = await auth();
  if (!userId) return [];
  const courses = await prisma.course.findMany({
    where: {
      instructorId: userId,
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

  return courses;
};
