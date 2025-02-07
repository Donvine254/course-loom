import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { ChapterHeader } from "./chapter-header";
import EditChapterForm from "@/components/dashboard/chapter/edit-chapter-form";
import Script from "next/script";
export default async function Page({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) {
  const { chapterId } = await params;
  const user = await currentUser();
  if (!user) {
    redirect("/instructor/courses");
  }
  const chapter = await prisma.chapter.findUnique({
    where: { id: chapterId },
  });
  if (!chapter || !user) {
    redirect("/instructor/courses");
  }
  return (
    <section>
      <Script
        async
        defer
        src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
      <ChapterHeader chapter={chapter} />
      <EditChapterForm initialData={chapter} />
    </section>
  );
}
