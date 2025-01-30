import React from "react";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: { id: id },
  });
  if (!course) {
    redirect("/instructor");
  }
  return <div>page</div>;
}
