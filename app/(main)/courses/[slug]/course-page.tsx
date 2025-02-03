import {
  BookOpen,
  Users,
  Clock,
  Lock,
  Download,
  Share2,
  BookmarkPlus,
  Globe,
  CirclePlay,
  Check,
  BadgeInfo,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SubscriptionButton } from "@/components/custom/subscription-button";
import { VideoPreviewModal } from "./preview-modal";
import { slugify } from "@/lib/utils";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import StudentFeedback from "./review-items";
import { renderStars } from "@/lib/render-stars";
type Props = {
  // eslint-disable-next-line
  course: {} | any;
};
type Chapter = { title: string; lessons: number; duration: string };

export default function CoursePage({ course }: Props) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-6 xsm:gap-2 md:gap-8 items-center ">
            <div>
              <div className="flex items-center gap-2 my-2 lg:mb-4">
                <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-sm  ">
                  40% Off
                </span>
                <span className="text-sm font-medium truncate">
                  {course.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                {course.title}
              </h1>
              <p className="text-sm text-gray-200 my-2">
                {course.short_description}
              </p>
              <div className="flex items-center flex-wrap gap-4 mb-4 text-sm md:text-base">
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderStars(Math.floor(course.rating))}
                  </div>
                  <span className="ml-1">{course.rating}</span>
                  <span className="ml-1">({course.reviews} ratings)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>
                    {Number(course.students).toLocaleString()} students
                  </span>
                </div>
                <div className="flex items-center flex-wrap gap-4 mb-2 text-sm md:text-base">
                  <div className="flex items-center gap-1">
                    <BadgeInfo className="w-4 h-4 rotate-180" />
                    <span>Last updated on {course.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <span>English</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <Image
                  src={course.instructor.image}
                  height={32}
                  width={32}
                  alt={course.instructor.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{course.instructor.name}</p>
                  <p className="text-sm text-gray-200">
                    {course.instructor.role}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Link href="#enroll" passHref scroll>
                  <Button variant="secondary" className="justify-start gap-2">
                    <GraduationCap className="h-5 w-5" /> Enroll Now
                  </Button>
                </Link>
                <VideoPreviewModal
                  title={course.title}
                  videoUrl="https://www.youtube.com/embed/FJDVKeh7RJI"
                />
              </div>
            </div>
            <div className="relative">
              <video
                src={course.previewVideo}
                poster={course.coverImage}
                className="w-full h-full object-cover rounded-md"
                controls
              />
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="mx-auto p-2 sm:p-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Course Overview */}
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-6">Course Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="flex flex-col items-center p-4 bg-card rounded-lg shadow border">
                  <Clock className="w-6 h-6 text-indigo-600 mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Duration
                  </span>
                  <span className="font-semibold">{course.duration}</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-card border shadow rounded-lg">
                  <BookOpen className="w-6 h-6 text-indigo-600 mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Chapters
                  </span>
                  <span className="font-semibold">{course.totalChapters}</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-card border shadow rounded-lg">
                  <Globe className="w-6 h-6 text-indigo-600 mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Language
                  </span>
                  <span className="font-semibold">English</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-card shadow rounded-lg border">
                  <Download className="w-6 h-6 text-indigo-600 mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Resources
                  </span>
                  <span className="font-semibold">15 files</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {course.long_description}
              </p>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
                <ul className="space-y-2 md:grid md:grid-cols-2">
                  {course.prerequisites.map((pre: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-center text-muted-foreground">
                      <Check className="w-5 h-5 text-indigo-600 mr-2" />
                      {pre}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  What You&apos;ll Learn
                </h3>
                <ul className="space-y-2 md:grid md:grid-cols-2">
                  {course.learningObjectives.map(
                    (objective: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-center text-muted-foreground">
                        <Check className="w-5 h-5 text-indigo-600 mr-2" />
                        {objective}
                      </li>
                    )
                  )}
                </ul>
              </div>
              {/* Course Content */}
              <div className="bg-inherit my-2">
                <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                <div className="space-y-4">
                  {course.chapters
                    .slice(0, 2)
                    .map((chapter: Chapter, index: number) => (
                      <div
                        key={index}
                        className="border border-indigo-500 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{chapter.title}</h3>
                            <div className="text-sm text-muted-foreground mt-1">
                              {chapter.lessons} lessons • {chapter.duration}
                            </div>
                          </div>
                          <Lock className="w-4 h-4 text-indigo-600" />
                        </div>
                      </div>
                    ))}
                </div>
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="all-chapters">
                    <AccordionTrigger className="font-semibold text-indigo-600">
                      Show all chapters
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {course.chapters
                          .slice(2)
                          .map((chapter: Chapter, index: number) => (
                            <div
                              key={index}
                              className="border border-indigo-500 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold">
                                    {chapter.title}
                                  </h3>
                                  <div className="text-sm text-muted-foreground mt-1">
                                    {chapter.lessons} lessons •{" "}
                                    {chapter.duration}
                                  </div>
                                </div>
                                <Lock className="w-4 h-4 text-indigo-600" />
                              </div>
                            </div>
                          ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <Separator className="my-2 bg-gray-400" />
            {/* Instructor Profile */}
            <div className="bg-inherit p-2 sm:p-4">
              <h2 className="text-2xl font-bold mb-3">Meet Your Instructor</h2>
              <div className="flex gap-4">
                <Image
                  height={96}
                  width={96}
                  src={course.instructor.image}
                  alt={course.instructor.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold capitalize">
                    {course.instructor.name}
                  </h3>
                  <p className="text-sm text-indigo-500">
                    {course.instructor.role}
                  </p>
                  <a
                    href={`mailto:${course.instructor.email}`}
                    target="_blank"
                    className="hover:underline text-blue-500 truncate break-words text-sm">
                    {course.instructor.email}
                  </a>
                  <p className="text-sm text-muted-foreground">
                    {course.instructor.courses.length + 1} Courses
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm my-2 leading-relaxed">
                {course.instructor.bio}
              </p>

              <div className="mt-3">
                <h4 className="font-semibold mb-3">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2 xsm:gap-x-4 xsm:text-xs text-sm">
                  {course.instructor.expertise.map(
                    (skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-indigo-50 bg-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 rounded-full ">
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold mb-3">
                  Other Courses by {course.instructor.name}
                </h4>
                <ul className="space-y-2">
                  {course.instructor.courses.map(
                    (otherCourse: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-center text-muted-foreground">
                        <CirclePlay className="w-4 h-4 text-blue-600 mr-2" />
                        <Link
                          href={`/courses/${slugify(otherCourse)}`}
                          className="underline text-blue-500">
                          {otherCourse}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Student Reviews */}
            <Separator className="my-2 bg-gray-400" />
            <StudentFeedback course={course} />
          </div>
          {/* Sidebar */}
          <div
            className="md:col-span-1 xsm:w-full sm:max-w-sm sm:mx-auto"
            id="enroll">
            <div className="bg-card border shadow dark:shadow-indigo-500 rounded-xl p-6 md:sticky top-8 md:top-16">
              <p className="text-lg font-medium">
                Subscribe to Courseloom pro membership plan
              </p>
              <p className="text-sm text-muted-foreground">
                Get this course plus 5,000+ of our top-rated courses with a pro
                membership plan.{" "}
                <Link href="/pricing" className="text-blue-500 underline">
                  Learn More
                </Link>
              </p>{" "}
              <SubscriptionButton
                className="bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 hover:text-white transition-colors my-2"
                plan="Pro"
                variant="subscription"
                amount={24.99}
                text="Try Pro Now"
              />
              <p className="text-xs text-center w-full text-muted-foreground mb-1">
                Starting at KSH 2,999 per month
              </p>
              <p className="text-xs text-center w-full text-muted-foreground">
                Cancel anytime
              </p>
              <div className="flex items-center gap-2 w-full py-2 ">
                <hr className="border border-gray-200 w-full" />
                <div className="text-sm flex-1 w-fit whitespace-nowrap">Or</div>
                <hr className="border border-gray-200 w-full" />
              </div>
              <div className="text-3xl font-bold mb-4">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "KSH",
                  maximumFractionDigits: 0,
                }).format(course.price * 120)}
              </div>
              <SubscriptionButton
                className="bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 hover:text-white transition-colors my-2"
                variant="payment"
                title={course.title}
                amount={course.price}
                text="Buy this Course"
              />
              <div className="text-muted-foreground text-xs w-full my-2 inline-flex items-center gap-1 justify-center">
                <Lock className="h-3 w-3" />{" "}
                <span>30-Day Money-Back Guarantee</span>
              </div>
              <p className="text-muted-foreground text-xs text-center">
                Full Lifetime Access & Offline download
              </p>
              <div className="flex gap-2 mt-6">
                <Button
                  variant="outline"
                  className="flex-1 border bg-gray-100 dark:bg-indigo-950 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-700 transition-colors">
                  <Share2 className="w-5 h-5 mx-auto" />
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border bg-gray-100 dark:bg-indigo-950 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-700 transition-colors">
                  <BookmarkPlus className="w-5 h-5 mx-auto" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
