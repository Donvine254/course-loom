"use server";
import prisma from "@/prisma/prisma";

type ChapterData = {
  courseId: string;
  title: string;
};
export async function createCourseChapter(formData: ChapterData) {
  try {
    const chapter = await prisma.chapter.create({
      data: formData,
    });

    return {
      success: true,
      message: "Course chapter created successfully",
      data: chapter,
    };
    // eslint-disable-next-line
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        success: false,
        error: "A chapter with this title already exists.",
      };
    }
    return {
      success: false,
      error: error.message || "An error occurred while creating the chapter.",
    };
  } finally {
    await prisma.$disconnect();
  }
}


export async function updateChapterPositions(
  chapters: { id: string; position: number }[]
) {
  try {
    // Step 1: Temporarily set all positions to negative values to avoid conflicts
    await Promise.all(
      chapters.map((chapter) =>
        prisma.chapter.update({
          where: { id: chapter.id },
          data: { position: -chapter.position },
        })
      )
    );

    // Step 2: Now set correct positions
    await Promise.all(
      chapters.map((chapter) =>
        prisma.chapter.update({
          where: { id: chapter.id },
          data: { position: chapter.position },
        })
      )
    );

    return { success: true, message: "Chapters reordered successfully" };
    // eslint-disable-next-line
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to reorder chapters",
    };
  } finally {
    await prisma.$disconnect();
  }
}

export default async function deleteChapter(chapterId: string) {
  try {
    await prisma.chapter.delete({
      where: {
        id: chapterId,
      },
    });
    return { success: true, message: "Chapters deleted successfully" };
    // eslint-disable-next-line
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to delete chapters",
    };
  } finally {
    await prisma.$disconnect();
  }
}
