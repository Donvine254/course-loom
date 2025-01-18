"use client";
import CourseCard from "./course-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { sampleCourses } from "@/constants";
import Autoplay from "embla-carousel-autoplay";
export function CourseShowCase() {
  return (
    <section className="w-full py-4 p-2 overflow-x-hidden">
      <Carousel
        className="md:max-w-[75%] mx-auto my-4 h-fit "
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 8000,
          }),
        ]}>
        <CarouselContent>
          {sampleCourses.map((course, index) => (
            <CarouselItem
              key={index}
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
