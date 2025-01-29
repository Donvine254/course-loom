"use client";
import ComboBox from "@/components/custom/combobox";
import { Input } from "@/components/ui/input";
import { Category } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import React, { useState } from "react";

export const CourseForm = ({ categories }: { categories: Category[] }) => {
  const [category, setCategory] = useState("");
  // create a zod form type here for category and title so i can have it in state
  return (
    <form className="min-w-[400px] space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="font-semibold flex items-center gap-2 text-muted-foreground">
          Course Title
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent
                className="max-w-72 text-sm"
                side="bottom"
                data-state="delayed-open">
                <p>
                  Choose a clear and compelling title. Keep it within 100
                  characters. It&apos;s ok if you can&apos;t think of a good
                  title now. You can change it later.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <Input placeholder="Enter course title" />
        <small></small>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="font-semibold flex items-center gap-2 text-muted-foreground">
          Category
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent
                className="max-w-72 text-sm"
                side="bottom"
                data-state="delayed-open">
                <p>
                  What category best fits the knowledge you&apos;ll share?.
                  It&apos;s ok if you can&apos;t think of a correct category
                  now. You can change it later.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </label>
        <ComboBox
          categories={categories}
          value={category}
          onChange={setCategory}
        />
        <small>
          If you&apos;re not sure about the right category, you can change it
          later
        </small>
      </div>
    </form>
  );
};
