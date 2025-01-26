"use client";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
export const ThemeToggleButton = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-2 xsm:gap-8  border rounded-lg w-fit p-1",
          className
        )}>
        <button
          className="p-1 rounded-full transition-colors duration-300   dark:bg-gray-600"
          type="button"
          title="light theme">
          {" "}
          <Sun className="h-4 w-4  transition-all " />
        </button>
        <button
          className="p-1 rounded-full transition-colors duration-300   dark:bg-gray-600"
          type="button"
          title="system default">
          <Monitor className="h-4 w-4" />
        </button>
        <button
          className="p-1 rounded-full transition-colors duration-300   dark:bg-gray-600"
          type="button"
          title="dark mode">
          <Moon className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center  justify-center gap-2 xsm:gap-8 border rounded-lg w-fit p-1">
      <button
        className={` p-1 rounded-full transition-colors duration-300  ${
          theme === "light" ? "bg-gray-200 dark:bg-gray-600 " : ""
        }`}
        type="button"
        title="light theme"
        onClick={() => setTheme("light")}>
        {" "}
        <Sun className="h-4 w-4  transition-all " />
      </button>
      <button
        className={` p-1 rounded-full transition-colors duration-300  ${
          theme === "system" ? "bg-gray-200 dark:bg-gray-600 " : ""
        }`}
        type="button"
        title="system default"
        onClick={() => setTheme("system")}>
        {" "}
        <Monitor className="h-4 w-4" />
      </button>
      <button
        className={` p-1 rounded-full transition-colors duration-300  ${
          theme === "dark" ? "bg-gray-200 dark:bg-gray-600 " : ""
        }`}
        type="button"
        title="dark mode"
        onClick={() => setTheme("dark")}>
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
};
