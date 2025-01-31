"use client";
import { Course } from "@prisma/client";
import React from "react";

const REQUIRED_FIELDS: (keyof Course)[] = [
  "title",
  "summary",
  "description",
  "prerequisites",
  "objectives",
  "price",
  "isFree",
];

export default function ProgressIndicator({ course }: { course: Course }) {
  const currentData = REQUIRED_FIELDS.reduce(
    // eslint-disable-next-line
    (acc: Record<string, any>, field) => {
      acc[field] = course[field];
      return acc;
    },
    {}
  );

  // Count the number of non-empty fields
  const filledFields = Object.values(currentData).filter(
    (value) => value !== null && value !== undefined && value !== ""
  ).length;

  const totalFields = REQUIRED_FIELDS.length;
  const progressPercentage = (filledFields / totalFields) * 100;
  return (
    <div className="space-y-2 mb-4 bg-card p-4 rounded-md shadow">
      <p className="font-medium">
        Complete all fields ({filledFields}/{totalFields})
      </p>
      <div className="w-full bg-secondary h-2 rounded-full">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
