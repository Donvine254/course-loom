"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React, { useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type TabContentProps = {
  description: string;
  help: string;
  image: string;
};

export default function GetStarted() {
  const [activeTab, setActiveTab] = useState<"plan" | "record" | "publish">(
    "plan"
  );

  const tabContent = {
    plan: {
      description:
        "You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool. The way that you teach — what you bring to it — is up to you.",
      help: "We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized",
      image:
        "https://res.cloudinary.com/dipkbpinx/image/upload/v1737676405/illustrations/tzprcm3kqudzljpnytl2.png",
    },
    record: {
      description:
        "Use basic tools like a smartphone or DSLR camera. Add a good microphone and you're ready to start. If you don't like being on camera, just capture your screen.",
      help: "Our support team is here to help you through the process and review your test video.",
      image:
        "https://res.cloudinary.com/dipkbpinx/image/upload/v1737676502/illustrations/tyfo95npzurad8tporhb.png",
    },
    publish: {
      description:
        "Gather your first ratings and reviews by promoting your course through your network. Your course will be discoverable in our marketplace where you can earn money from each paid enrollment.",
      help: "We help you market your course and find your first students.",
      image:
        "https://res.cloudinary.com/dipkbpinx/image/upload/v1737676572/illustrations/iz8yvwni08x32fydaqej.png",
    },
  };

  const renderTabContent = ({ description, help, image }: TabContentProps) => (
    <div className="grid md:grid-cols-2 mx-auto max-w-4xl gap-12 items-center mt-4 h-[450px] animate-fade-in ease-in-out">
      {/* Text Section */}
      <div className="flex flex-col justify-start gap-6 h-full">
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>
        <div className="bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-50 p-6 rounded-lg border shadow dark:shadow-indigo-500">
          <h4 className="font-semibold mb-2">How we help you</h4>
          <p className="text-muted-foreground">{help}</p>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative h-full rounded-md overflow-hidden">
        <Image
          src={image}
          alt="illustration"
          priority
          quality={100}
          fill
          className="object-contain object-center w-full h-full rounded-md"
        />
      </div>
    </div>
  );

  return (
    <div className="py-4 bg-background">
      <div className="mx-auto p-2 sm:p-4 md:p-6">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">
          How to begin
        </h2>
        {/* Tabs for larger devices */}
        <div className="hidden md:block">
          <ScrollArea className="w-full mb-8">
            <div className="flex items-start justify-center mb-2 border-b border-gray-500 w-fit mx-auto space-x-4 md:space-x-8 lg:space-x-12">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setActiveTab(tab as "plan" | "record" | "publish")
                  }
                  className={`py-3 text-lg font-medium transition-colors ease-in-out whitespace-nowrap ${
                    activeTab === tab
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}>
                  {tab === "plan"
                    ? "Plan your curriculum"
                    : tab === "record"
                    ? "Record your video"
                    : "Publish your course"}
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {renderTabContent(tabContent[activeTab])}
        </div>

        {/* Accordion for small devices */}
        <div className="block md:hidden p-2">
          <Accordion type="single" collapsible>
            {Object.entries(tabContent).map(([tab, content]) => (
              <AccordionItem key={tab} value={tab}>
                <AccordionTrigger className="text-lg font-medium">
                  {tab === "plan"
                    ? "Plan your curriculum"
                    : tab === "record"
                    ? "Record your video"
                    : "Publish your course"}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-full aspect-video rounded-md overflow-hidden">
                      <Image
                        src={content.image}
                        alt="illustration"
                        priority
                        quality={100}
                        fill
                        className="object-contain object-center rounded-md"
                      />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {content.description}
                    </p>
                    <div className="bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-50 p-6 rounded-lg border shadow-sm">
                      <h4 className="font-semibold mb-2">How we help you</h4>
                      <p className="text-muted-foreground">{content.help}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
