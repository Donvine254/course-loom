"use client";
import { Chapter } from "@prisma/client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
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
        const updatedChapters = items.filter((item) => item.id !== courseId);
        setChapters(updatedChapters);
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
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
                        className="flex w-full items-center space-x-2 my-4">
                        <div
                          title="Drag to re-order items"
                          className="shrink-0 px-2 py-3 rounded-md h-10 w-10 border border-input bg-background inline-flex items-center justify-center hover:text-primary-foreground hover:bg-primary cursor-grab"
                          {...provided.dragHandleProps}>
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
                              item="course chapter"
                            />
                          </PopoverContent>
                        </Popover>
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
