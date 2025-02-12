import { Metadata } from "next";
import WishListComponent from "./wishlist";
import { getWishListedCourses } from "@/lib/actions/wishlist";
import { PartialCourse } from "@/types";

export const metadata: Metadata = {
  title: "My Learning - Wishlist | Courseloom",
  description: "An LMS platform that powers the modern mind!",
};

export default async function Page() {
  const courses = (await getWishListedCourses()) as PartialCourse[] | [];
  return (
    <div className="pt-8 md:pt-10 bg-gradient-to-tr from-indigo-100 via-gray-50 to-indigo-100 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950 min-h-screen p-2">
      <WishListComponent courses={courses} />
    </div>
  );
}
