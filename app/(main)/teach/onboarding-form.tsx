"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export default function OnboardingForm({
  className,
  title = "Get Started",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <form>
      <Button size="lg" className={className}>
        {title}
      </Button>
    </form>
  );
}
