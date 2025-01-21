"use client";
import React, { useState } from "react";
import { studentFAQs, instructorFAQs } from "@/constants/faqs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GraduationCap, Users } from "lucide-react";

const FAQ = () => {
  const [activeTab, setActiveTab] = useState<"students" | "instructors">(
    "students"
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Custom Tab Navigation */}
        <div className="flex mb-8 border-b">
          <button
            onClick={() => setActiveTab("students")}
            className={`px-6 py-3 text-lg font-medium transition-colors flex items-center justify-center gap-2  ${
              activeTab === "students"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}>
            <Users className="h-4 w-4" /> For Students
          </button>
          <button
            onClick={() => setActiveTab("instructors")}
            className={`px-6 py-3 text-lg font-medium transition-colors flex items-center justify-center gap-2  ${
              activeTab === "instructors"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}>
            <GraduationCap className="h-4 w-4" /> For Instructors
          </button>
        </div>

        {/* FAQ Content */}
        <Accordion type="single" collapsible className="space-y-2">
          {(activeTab === "students" ? studentFAQs : instructorFAQs).map(
            (faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-lg p-4 border-b hover:shadow-md dark:shadow-indigo-500 transition-shadow">
                <AccordionTrigger className="text-xl font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2 md:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            )
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
