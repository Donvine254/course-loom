"use client";
import { UserProfile } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import React from "react";

export default function Profile() {
  const { theme } = useTheme();
  let isDark = theme === "dark";
  if (theme === "system" && typeof window !== undefined) {
    isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  const colors = {
    background: isDark ? "#030712" : "#f3f4f6",
    color: isDark ? "#fff" : "#000",
    tabTextColor: isDark ? "#4338ca" : "#4338ca",
    tabTextHoverColor: isDark ? "#4338ca" : "#4338ca",
  };
  return (
    <section className="bg-gradient-to-tr from-indigo-200 via-gray-100 to-indigo-200 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950 min-h-screen pt-12">
      <div className="py-2 md:pt-8 flex flex-col items-center justify-center h-fit">
        <UserProfile
          routing="hash"
          appearance={{
            variables: {
              colorPrimary: "#4338ca",
              colorBackground: colors.background,
              colorText: colors.color,
            },
            elements: {
              button: {
                color: colors.tabTextColor, // Default tab text color
                "&:hover": {
                  color: colors.tabTextHoverColor, // Hover text color
                },
              },
            },
          }}
        />
      </div>
    </section>
  );
}
