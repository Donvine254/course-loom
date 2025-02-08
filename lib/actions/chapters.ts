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

export async function PublishChapter(chapterId: string) {
  // TODO: change this to publish and unpublish the chapter
  // Update to check if the required fields are complete
  try {
    await prisma.chapter.update({
      where: {
        id: chapterId,
      },
      data: {
        isPublished: true,
      },
    });
    return { success: true, message: "Chapter published successfully" };
    // eslint-disable-next-line
  } catch (error: any) {
    return { success: false, error: error.message || "Something went wrong" };
  } finally {
    await prisma.$disconnect();
  }
}

// Functions to handle chapter attachments
export async function createChapterAttachment(
  chapterId: string,
  attachment: { name: string; url: string }
) {
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
