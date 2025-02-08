"use server";
import prisma from "@/prisma/prisma";
import { slugify } from "../utils";
import { CourseStatus } from "@prisma/client";
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

export async function PublishCourse(courseId: string, isPublished: boolean) {
  try {
    // If publishing, check if at least one chapter is published
    if (isPublished) {
      const publishedChapters = await prisma.chapter.findMany({
        where: {
          courseId,
          isPublished: true,
        },
      });

      if (publishedChapters.length === 0) {
        return {
          success: false,
          error:
            "At least one chapter must be published before publishing the course.",
        };
      }
    }

    // Update course status
    const data = {
      isPublished,
      status: isPublished ? CourseStatus.PUBLISHED : CourseStatus.DRAFT,
    };

    await prisma.course.update({
      where: { id: courseId },
      data,
    });

    return {
      success: true,
      message: isPublished
        ? "Course published successfully"
        : "Course unpublished successfully",
      status: isPublished,
    };
    // eslint-disable-next-line
  } catch (error: any) {
    return { success: false, error: error.message || "Something went wrong" };
  } finally {
    await prisma.$disconnect();
  }
}

// function to delete course
export default async function deleteCourse(courseId: string) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        purchases: true,
      },
    });
    if (!course) {
      return {
        success: false,
        error: "Record to delete not found!",
      };
    }
    if (course.purchases.length > 0) {
      return {
        success: false,
        error:
          "This course cannot be deleted as it has already been purchased by a student.",
      };
    }
    await prisma.course.delete({
      where: {
        id: courseId,
      },
    });
    return { success: true, message: "Course deleted successfully" };
    // eslint-disable-next-line
  } catch (error: any) {
    return {
      success: false,
      error:
        error.message ||
        "Failed to delete course due to existing relationships",
    };
  } finally {
    await prisma.$disconnect();
  }
}
