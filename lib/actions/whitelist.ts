"use server";
import prisma from "@/prisma/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function isWhiteListed(courseId: string) {
  const user = await currentUser();
  if (!user) {
    return false;
  }
  const exists = await prisma.courseWhitelist.findUnique({
    where: { userId_courseId: { userId: user.id, courseId } },
  });

  return !!exists;
}
