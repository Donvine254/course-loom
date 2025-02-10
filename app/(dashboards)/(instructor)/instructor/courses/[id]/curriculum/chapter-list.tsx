"use client";
import { Chapter } from "@prisma/client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, MoreHorizontal, Pencil } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { CustomOverlay } from "@/components/custom/overlay";
import { toast } from "sonner";
import deleteChapter, { updateChapterPositions } from "@/lib/actions/chapters";
import DeleteButton from "@/components/custom/delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ChapterList({
  items,
  courseId,
}: {
  items: Chapter[];
  courseId: string;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>(items);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
    setChapters(items);
  }, [items]);

  if (!isMounted) {
    return null;
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(chapters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);
    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id) + 1,
    }));
    onReOrder(bulkUpdateData);
  };

  const onReOrder = async (updateData: { id: string; position: number }[]) => {
    setIsLoading(true);
    try {
      await updateChapterPositions(updateData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error updating course chapters");
      setIsLoading(false);
    }
  };
  const handleDeleteChapter = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await deleteChapter(id);
      setIsLoading(false);
      if (res.success) {
        setChapters((prev) => prev.filter((chapter) => chapter.id !== id));
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res.error || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Something went wrong");
    }
  };
  return (
    <section className="p-2 sm:p-4 md:px-6 mx-auto max-w-4xl">
      <div className="border rounded-md bg-card p-4 mb-2 shadow dark:shadow-indigo-500 relative space-y-4">
        {isLoading && <CustomOverlay />}
        <h2 className="font-semibold mb-2 md:mb-4">Course Chapters</h2>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="objectives">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {chapters.map((chapter, index) => (
                  <Draggable
                    key={chapter.id}
                    draggableId={String(chapter.id)}
                    index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex w-full items-center justify-between space-x-2 my-4">
                        <div
                          title="Drag to re-order chapters"
                          className="shrink-0 px-2 py-3 rounded-md h-10  border border-input bg-background inline-flex items-center justify-center hover:text-primary-foreground hover:bg-primary cursor-grab w-10"
                          {...provided.dragHandleProps}>
                          <Grip className="h-4 w-4" />
                        </div>
                        <div className="w-[75%] xsm:max-w-[65%] sm:flex-1 inline-flex flex-wrap items-center justify-between rounded-md border bg-gray-100 dark:bg-input  px-3 py-2   md:text-sm">
                          <p className="truncate xsm:text-xs text-sm">
                            {index + 1}. {chapter.title}
                          </p>
                          <div className=" gap-2 items-center hidden md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:flex lg:flex">
                            {chapter.isFree && (
                              <Badge variant="default">Free</Badge>
                            )}
                            <Badge
                              variant="outline"
                              className={cn(
                                chapter.isPublished
                                  ? "bg-green-500 text-white w-full flex items-center justify-center border border-green-500"
                                  : "bg-indigo-500 text-white w-full flex items-center justify-center border border-indigo-500"
                              )}>
                              {chapter.isPublished ? "Published" : "Draft"}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-40 space-y-2"
                              align="end">
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
                              <DeleteButton
                                onDelete={handleDeleteChapter}
                                id={chapter.id}
                                text="Delete"
                                item="course chapter"
                              />
                              <Separator />
                              <div className="flex flex-col gap-2 items-center md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden  lg:hidden">
                                {chapter.isFree && (
                                  <Badge
                                    variant="default"
                                    className="w-full flex items-center justify-center">
                                    Free
                                  </Badge>
                                )}
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    chapter.isPublished
                                      ? "bg-green-500 text-white w-full flex items-center justify-center border border-green-500"
                                      : "bg-indigo-500 text-white w-full flex items-center justify-center border border-indigo-500"
                                  )}>
                                  {chapter.isPublished ? "Published" : "Draft"}
                                </Badge>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </section>
  );
}
