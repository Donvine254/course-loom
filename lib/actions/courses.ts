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

interface UpdateCourseData {
  title?: string;
  description?: string;
  imageUrl?: string;
  objectives?: string;
  prerequisites?: string;
  summary?: string;
  price?: number;
  isFree?: boolean;
  slug?: string;
  categoryId?: string;
}
export const updateCourse = async (
  courseId: string,
  data: UpdateCourseData
) => {
  try {
    const updatedData = { ...data };
    if (data.title) {
      updatedData.slug = slugify(data.title);
    }

    await prisma.course.update({
      where: { id: courseId },
      data: updatedData,
    });

    return { success: true, message: "Course updated successfully" };
    // eslint-disable-next-line
  } catch (error: any) {
    console.error("Error updating course:", error);
    return { success: false, error: error.message || "Something went wrong" };
  }
};
