import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import DraftCourse from "./draft-course";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: { id: id },
    include: {
      category: true,
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      instructor: {
        include: {
          courses: {
            select: {
              id: true,
              title: true,
              slug: true,
              isPublished: true,
            },
          },
        },
      },
      attachments: true,
    },
  });

  if (!course) {
    redirect("/not-found");
  }
  return (
    <section className="pt-8 md:pt-10 bg-gradient-to-tr from-indigo-200 via-gray-100 to-indigo-200 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950">
      <DraftCourse course={course} />
    </section>
  );
}
