"use client";
import CourseCard from "./course-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PartialCourse } from "@/types";
import Autoplay from "embla-carousel-autoplay";
export function CourseShowCase({ courses }: { courses: PartialCourse[] }) {
  return (
    <section className="w-full py-4 p-2 overflow-x-hidden">
      {/* TODO:fix this to ensure it looks nice in sm devices */}
      <Carousel
        className="md:max-w-[75%] lg:max-w-[80%] mx-auto h-fit "
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {courses.map((course, id) => (
            <CarouselItem
              key={id}
              className="xsm:w-full md:basis-1/2 lg:basis-1/3 px-2">
              <CourseCard course={course} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
