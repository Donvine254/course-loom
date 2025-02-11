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

type UpdateData = {
  title: string;
  description?: string;
  isFree: boolean;
  subtitles?: string;
};
export async function updateChapter(formData: UpdateData, chapterId: string) {
  try {
    await prisma.chapter.update({
      where: {
        id: chapterId,
      },
      data: formData,
    });
    return { success: true, message: "Chapter updated successfully" };
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
type VideoData = {
  videoUrl?: string | null;
  duration?: number;
};
export async function updateChapterVideo(
  formData: VideoData,
  chapterId: string
) {
  try {
    await prisma.chapter.update({
      where: {
        id: chapterId,
      },
      data: formData,
    });
    return { success: true, message: "Chapter video updated successfully" };
    // eslint-disable-next-line
  } catch (error: any) {
    console.error(error.stack);
    return {
      success: false,
      error: error.message || "An error occurred while creating the chapter.",
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function PublishChapter(
  chapterId: string,
  courseId: string,
  isPublished: boolean
) {
  try {
    if (!isPublished) {
      const publishedChapters = await prisma.chapter.findMany({
        where: {
          courseId,
          isPublished: true,
        },
      });
      if (
        publishedChapters.length === 1 &&
        publishedChapters[0].id === chapterId
      ) {
        await prisma.course.update({
          where: { id: courseId },
          data: {
            isPublished: false,
            status: "DRAFT",
          },
        });
      }
    }
    await prisma.chapter.update({
      where: { id: chapterId },
      data: { isPublished },
    });

    return {
      success: true,
      status: isPublished,
      message: isPublished
        ? "Chapter published successfully"
        : "Chapter unpublished successfully",
    };
    // eslint-disable-next-line
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Something went wrong",
      status: isPublished,
    };
  } finally {
    await prisma.$disconnect();
  }
}

// Functions to handle chapter attachments
export async function createChapterAttachment(
  chapterId: string,
  attachment: { name: string; url: string }
) {
  if (attachment.url === "") {
    return { success: false, message: "Provide a valid file url" };
  }
  try {
    await prisma.attachment.create({
      data: {
        chapterId,
        ...attachment,
      },
    });
    return { success: true, message: "Attachment created successfully" };
    // eslint-disable-next-line
  } catch (error: any) {
    console.error(error.stack);
    if (error.code === "P2002") {
      return {
        success: false,
        error: "An file with this name already exists.",
      };
    }
    return {
      success: false,
      error:
        error.message || "An error occurred while creating course attachment.",
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteChapterAttachment(id: string) {
  try {
    await prisma.attachment.delete({
      where: {
        id,
      },
    });
    return { success: true, message: "Attachment deleted successfully" };
    // eslint-disable-next-line
  } catch (error: any) {
    if (error.code === "P2025") {
      return { success: false, message: "Attachment to delete not found" };
    }
    return {
      success: false,
      message: "An error occurred",
      error: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
}
