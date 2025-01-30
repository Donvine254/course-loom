"use server";
import prisma from "@/prisma/prisma";
import { slugify } from "../utils";
type CourseData = {
  categoryId: string;
  title: string;
  userId: string;
};
export async function createCourse(formData: CourseData) {
  const instructor = await prisma.instructor.findUnique({
    where: {
      clerkId: formData.userId,
    },
    select: {
      id: true,
    },
  });

  if (!instructor) {
    return {
      success: false,
      error: "Only registered instructors can create courses",
    };
  }
  const data = {
    categoryId: formData.categoryId,
    title: formData.title,
    instructorId: instructor?.id,
    slug: slugify(formData.title),
  };

  try {
    const course = await prisma.course.create({
      data,
    });
    return {
      success: true,
      message: "Course created successfully",
      data: course,
    };
    // eslint-disable-next-line
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      error: error.message || "An error occurred while creating the course.",
    };
  }
}
