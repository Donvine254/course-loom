"use server";
import prisma from "@/prisma/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function isWishListed(courseId: string) {
  const user = await currentUser();
  if (!user) {
    return false;
  }
  const exists = await prisma.courseWishlist.findUnique({
    where: { userId_courseId: { userId: user.id, courseId } },
  });

  return !!exists;
}

export async function whitelistCourse(courseId: string) {
  const user = await currentUser();
  if (!user) {
    return { success: false, error: "No logged in user found" };
  }
  try {
    await prisma.courseWishlist.create({
      data: {
        userId: user.id,
        courseId,
      },
    });
    return { success: true, message: "Course added to whitelist" };
    // eslint-disable-next-line
  } catch (error: any) {
    console.error(error.stack);
    return { success: false, error: error.message || "Something went wrong" };
  }
}
export async function deleteWhitelist(courseId: string) {
  const user = await currentUser();
  if (!user) {
    return { success: false, error: "No logged in user found" };
  }
  try {
    await prisma.courseWishlist.delete({
      where: { userId_courseId: { userId: user.id, courseId } },
    });
    return { success: true, message: "Course removed from whitelist" };
    // eslint-disable-next-line
  } catch (error: any) {
    console.error(error.stack);
    return { success: false, error: error.message || "Something went wrong" };
  }
}

export async function getWishListedCourses() {
  const user = await currentUser();
  if (!user) {
    throw new Error("No logged in user found");
  }

  const wishListedCourses = await prisma.course.findMany({
    where: {
      isPublished: true,
      status: "PUBLISHED",
      wishlists: {
        some: { userId: user.id },
      },
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

  return wishListedCourses;
}
