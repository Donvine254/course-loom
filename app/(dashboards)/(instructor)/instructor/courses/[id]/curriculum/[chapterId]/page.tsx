import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs/server";
import { ChapterHeader } from "./chapter-header";
import EditChapterForm from "@/components/dashboard/chapter/edit-chapter-form";
export default async function Page({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) {
  const { chapterId } = await params;
  const user = await currentUser();
  if (!user) {
    redirect("/instructor");
  }
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
  });
  if (!chapter || !user) {
    redirect("/instructor");
  }
  return (
    <section>
      <ChapterHeader chapter={chapter} />
      <EditChapterForm initialData={chapter} />
    </section>
  );
}
