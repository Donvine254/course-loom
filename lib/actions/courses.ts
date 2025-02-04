"use server";
import prisma from "@/prisma/prisma";
import { slugify } from "../utils";
type CourseData = {
  categoryId: string;
  title: string;
  userId: string;
};
export async function createCourse(formData: CourseData) {
  const data = {
    categoryId: formData.categoryId,
    title: formData.title,
    instructorId: formData.userId,
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
    if (error.code === "P2002") {
      return {
        success: false,
        error: "A course with this title already exists.",
      };
    }
    return {
      success: false,
      error: error.message || "An error occurred while creating the course.",
    };
  } finally {
    await prisma.$disconnect();
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
    if (error.code === "P2002") {
      return {
        success: false,
        error: "A course with this title already exists.",
      };
    }
    return { success: false, error: error.message || "Something went wrong" };
  } finally {
    await prisma.$disconnect();
  }
};
