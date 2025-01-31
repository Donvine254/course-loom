import React from "react";
import prisma from "@/prisma/prisma";
import DragAndDropPage from "./draggable";
export default async function Page() {
  const course = await prisma.course.findFirst();
  if (!course) {
    return null;
  }
  return (
    <div>
      <DragAndDropPage course={course} />
    </div>
  );
}
