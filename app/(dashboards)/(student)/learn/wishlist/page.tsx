import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Learning - Wishlist | Courseloom",
  description: "An LMS platform that powers the modern mind!",
};

export default async function Page() {
  return (
    <div className="pt-8 md:pt-10 bg-gradient-to-tr from-indigo-100 via-gray-50 to-indigo-100 dark:bg-gradient-to-tr dark:from-indigo-950 dark:via-gray-950 dark:to-indigo-950 min-h-screen p-2">
      <p>You wishlist courses appear here</p>
    </div>
  );
}
