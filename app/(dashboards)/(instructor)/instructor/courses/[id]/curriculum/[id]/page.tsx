import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs/server";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await currentUser();
  if (!user) {
    redirect("/instructor");
  }
  const chapter = await prisma.chapter.findUnique({
    where: { id: id },
  });
  if (!chapter || !user) {
    redirect("/instructor");
  }
  return <div>page</div>;
}
