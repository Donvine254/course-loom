"use server";
import prisma from "@/prisma/prisma";
import { slugify } from "../utils";
type CourseData = {
  categoryId: string;
  title: string;
  instructorId: string;
};
export async function createCourse(formData: CourseData) {
  try {
    const course = await prisma.course.create({
      data: {
        ...formData,
        slug: slugify(formData.title),
      },
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
