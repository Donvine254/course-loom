import React from "react";
import {
  BookOpen,
  Users,
  Award,
  Clock,
  Lock,
  Download,
  Share2,
  BookmarkPlus,
  Mail,
  Info,
  Globe,
  PlayIcon,
  CirclePlay,
  EyeIcon,
  Check,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
type Props = {
  // eslint-disable-next-line
  course: {} | any;
};
type Chapter = { title: string; lessons: number; duration: string };
type Review = {
  name: string;
  rating: number;
  date: string;
  image: string;
  comment: string;
};
export default function CoursePage({ course }: Props) {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1.5em"
        height="1.5em"
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
        }`}>
        <path
          fill="currentColor"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z"></path>
      </svg>
    ));
  };
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="xsm:text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold mb-4 leading-relaxed tracking-tight">
                {course.title}
              </h1>
              <p className="text-sm text-gray-200 my-2">
                {course.short_description}
              </p>
              <div className="flex items-center flex-wrap gap-4 mb-4">
                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderStars(Math.floor(course.rating))}
                  </div>
                  <span className="ml-1">{course.rating}</span>
                  <span className="ml-1">({course.reviews} ratings)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-5 h-5" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Info className="w-5 h-5" />
                  <span>Last updated on {course.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-5 h-5" />
                  <span>English</span>
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
                <Button variant="secondary" className="justify-start gap-2">
                  <PlayIcon className="h-4 w-4" /> Enroll Now
                </Button>
                <Button variant="ghost" className="border justify-start gap-2">
                  <EyeIcon className="h-4 w-4" /> Preview Course
                </Button>
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
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Course Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="flex flex-col items-center p-4 bg-card rounded-lg shadow">
                  <Clock className="w-6 h-6 text-indigo-600 mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Duration
                  </span>
                  <span className="font-semibold">{course.duration}</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-card shadow rounded-lg">
                  <BookOpen className="w-6 h-6 text-indigo-600 mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Chapters
                  </span>
                  <span className="font-semibold">{course.totalChapters}</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-card shadow rounded-lg">
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
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
                <ul className="space-y-2">
                  {course.prerequisites.map((pre: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-center text-muted-foreground">
                      <Check className="w-5 h-5 text-indigo-500 mr-2" />
                      {pre}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  What You&apos;ll Learn
                </h3>
                <ul className="space-y-2">
                  {course.learningObjectives.map(
                    (objective: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-center text-muted-foreground">
                        <Check className="w-5 h-5 text-indigo-500 mr-2" />
                        {objective}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
            {/* Instructor Profile */}
            <div className="bg-inherit p-2 sm:p-4">
              <h2 className="text-2xl font-bold mb-3">Meet Your Instructor</h2>
              <div className="flex gap-6">
                <Image
                  height={96}
                  width={96}
                  src={course.instructor.image}
                  alt={course.instructor.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold capitalize">
                    {course.instructor.name}
                  </h3>
                  <p className="text-muted-foreground text-sm text-indigo-500">
                    {course.instructor.role}
                  </p>
                  <p className="text-muted-foreground">
                    {course.instructor.bio}
                  </p>
                  <div className="inline-flex items-center text-muted-foreground">
                    <Mail className="w-5 h-5 mr-2 text-indigo-500" />
                    {course.instructor.email}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {course.instructor.expertise.map(
                    (skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-indigo-50 bg-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 rounded-full text-sm">
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
                        <CirclePlay className="w-4 h-4 text-indigo-600 mr-2" />
                        {otherCourse}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-inherit p-2 sm:p-4">
              <h2 className="text-2xl font-bold mb-4">Course Content</h2>
              <div className="space-y-4">
                {course.chapters.map((chapter: Chapter, index: number) => (
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
            </div>

            {/* Student Reviews */}
            <hr className="my-2" />
            <div className="p-2 sm:p-4 bg-card rounded-xl shadow">
              <h2 className="text-2xl font-bold mb-6">Student Feedback</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2 md:gap-6 mb-4">
                  <div className="bg-gray-100 dark:bg-indigo-950 space-y-2 p-6 border shadow">
                    <h2 className="text-5xl font-bold text-center">
                      {course.rating}
                    </h2>
                    <div className="flex justify-center">
                      {renderStars(Math.floor(course.rating))}
                    </div>
                    <p className="text-center text-muted-foreground">
                      {course.studentReviews.length} Reviews
                    </p>
                  </div>
                  <div className="space-y-2 flex-1">
                    {Object.entries(course.ratingBreakdown)
                      .reverse()
                      .map(([rating, percentage]) => (
                        <div key={rating} className="flex items-center gap-2">
                          <div className="flex items-center w-[20%]">
                            {renderStars(parseInt(rating))}
                          </div>
                          <div className="w-[70%] h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${percentage}%` }}></div>
                          </div>
                          <div className="w-[10%] text-right text-muted-foreground">
                            {percentage as number}%
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <h2 className="text-lg font-semibold my-6">
                  Reviews ({course.studentReviews.length})
                </h2>
                <div className="space-y-6">
                  {course.studentReviews.map(
                    (review: Review, index: number) => (
                      <div
                        key={index}
                        className="border-b border-input pb-4 last:border-0">
                        <div className="flex items-start gap-4">
                          <Image
                            width={48}
                            height={48}
                            src={review.image}
                            alt={review.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold">{review.name}</h4>
                            <span className="text-muted-foreground text-sm">
                              {review.date}
                            </span>
                            <div className="flex my-2">
                              {renderStars(review.rating)}
                            </div>
                            <p className="text-muted-foreground">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-card border shadow dark:shadow-indigo-500 rounded-xl p-6 md:sticky top-8 md:top-16">
              <div className="text-3xl font-bold mb-4">${course.price}</div>
              <Button
                variant="outline"
                className="bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors w-full ">
                <PlayIcon className="h-4 w-4" /> Enroll Now
              </Button>
              <div className="text-muted-foreground text-sm w-full my-2 inline-flex items-center gap-1 justify-center">
                <Lock className="h-4 w-4" />{" "}
                <span>30-Day Money-Back Guarantee</span>
              </div>
              <Separator className="mb-2" />
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3" />
                  <span>Lifetime Access</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-3" />
                  <span>{course.totalChapters} chapters</span>
                </div>
                <div className="flex items-center">
                  <Download className="w-5 h-5 mr-3" />
                  <span>Downloadable resources</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-3" />
                  <span>Certificate of completion</span>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button
                  variant="outline"
                  className="flex-1 border bg-gray-100 dark:bg-indigo-950 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-700 transition-colors">
                  <Share2 className="w-5 h-5 mx-auto" />
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1 border  rounded-lg transition-colors">
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
