"use client";

import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Course } from "@prisma/client";
import { Grip } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Objective {
  value: string;
}

export default function DragAndDropPage({ course }: { course: Course }) {
  // Define state for objectives
  const [objectives, setObjectives] = useState<Objective[]>(
    course?.objectives
      ? course.objectives.split(";").map((obj) => ({ value: obj.trim() }))
      : [{ value: "" }, { value: "" }, { value: "" }, { value: "" }]
  );

  // Log objectives whenever they change
  useEffect(() => {
    console.log("Updated objectives:", objectives);
  }, [objectives]);

  // Handle drag-and-drop logic
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newObjectives = reorder(
      objectives,
      result.source.index,
      result.destination.index
    );
    setObjectives(newObjectives);

    console.log("Objectives after reordering:", newObjectives);
  };

  // Reordering function
  const reorder = (
    list: Objective[],
    startIndex: number,
    endIndex: number
  ): Objective[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // Handle input change
  const handleInputChange = (index: number, value: string) => {
    const updatedObjectives = [...objectives];
    updatedObjectives[index].value = value;
    setObjectives(updatedObjectives);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-lg bg-white shadow-md p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-4">Course Objectives</h2>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2">
                {objectives.map((item, index) => (
                  <Draggable
                    key={index}
                    draggableId={String(index)}
                    index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center bg-gray-100 p-2 rounded-md">
                        <Input
                          type="text"
                          value={item.value}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          className="flex-1 p-2 border rounded-md"
                        />
                        <div
                          title="drag to re-order items"
                          className="shrink-0 cursor-grab ml-2 px-2 py-3 rounded-md h-10 w-10 border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 "
                          {...provided.dragHandleProps}>
                          <Grip className="h-4 w-4 " />
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
    </div>
  );
}
