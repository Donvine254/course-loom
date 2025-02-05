"use client";
import { Chapter } from "@prisma/client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Grip, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
export default function ChapterList({
  items,
  courseId,
}: {
  items: Chapter[];
  courseId: string;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>(items);

  useEffect(() => {
    setIsMounted(true);
    setChapters(items);
  }, [items]);
  if (!isMounted) {
    return null;
  }
  return (
    <section className="p-2  sm:p-4 md:px-6 mx-auto max-w-4xl">
      <div className="border rounded-md bg-card p-4 mb-2 shadow dark:shadow-indigo-500 relative space-y-4">
        <h2 className="font-semibold mb-2 md:mb-4">Course Chapters</h2>
        {chapters &&
          chapters.length > 0 &&
          chapters.map((chapter: Chapter) => {
            return (
              <div
                key={chapter.id}
                className="flex items-center justify-between gap-x-2 mb-2 md:mb-4 text-sm">
                <div
                  title="drag to re-order items"
                  className="shrink-0 px-2 py-3 rounded-md h-10 w-10 border border-input bg-background inline-flex items-center justify-center hover:text-primary-foreground hover:bg-primary cursor-grab">
                  <Grip className="h-4 w-4" />
                </div>
                <Input
                  defaultValue={chapter.title}
                  disabled
                  className="w-full flex-1 truncate xsm:text-xs"
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 space-y-2" align="end">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      asChild></Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      asChild>
                      <Link
                        href={`/instructor/courses/${courseId}/curriculum/${chapter.id}`}>
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-100">
                      <Trash2 className=" h-4 w-4" />
                      Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            );
          })}
      </div>
    </section>
  );
}
