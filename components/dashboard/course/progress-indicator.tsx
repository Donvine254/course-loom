"use client";
import React from "react";

export default function ProgressIndicator({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  const progress = total - current;
  const progressPercentage = (progress / total) * 100;
  return (
    <div className="mb-4 space-y-2 p-2 sm:p-4 md:px-6 mx-auto max-w-4xl">
      <p className="font-medium">
        Complete all fields ({progress}/{total})
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
