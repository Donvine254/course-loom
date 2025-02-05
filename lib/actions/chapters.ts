"use server";
import prisma from "@/prisma/prisma";

type ChapterData = {
  courseId: string;
  title: string;
  position: number;
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
    // await Promise.all(
    //   chapters.map((chapter) =>
    //     prisma.chapter.update({
    //       where: { id: chapter.id },
    //       data: { position: chapter.position },
    //     })
    //   )
    // );
    for (const chapter of chapters) {
      await prisma.chapter.update({
        where: { id: chapter.id },
        data: { position: chapter.position },
      });
    }
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
