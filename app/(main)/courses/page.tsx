import { Metadata } from "next";
// import CoursesPage from "./courses-page";
import Loading from "./loading";
export const metadata: Metadata = {
  title: "Course Loom | Explore our courses",
  description: "An LMS platform that powers the modern mind!",
};

export default async function Courses() {
  return (
    <section className="py-2 pt-8 md:pt-10 bg-gradient-to-tr from-indigo-200 via-gray-100 to-indigo-200 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950">
      <Loading />
    </section>
  );
}
