import Script from "next/script";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Search } from "lucide-react";

export default async function Navbar() {
  const user = await currentUser();
  return (
    <menu className="w-full relative ">
      <Script
        async
        defer
        src="https://unpkg.com/@themesberg/flowbite@1.1.1/dist/flowbite.bundle.js"></Script>
      <div className="flex flex-wrap items-center justify-between py-2 px-4 w-full  shadow z-20 fixed top-0 bg-white dark:bg-gray-950 dark:shadow-gray-600 dark:text-white">
        <Link href="/" className="flex items-center gap-1 text-indigo-600">
          <Image
            src="https://res.cloudinary.com/dipkbpinx/image/upload/v1737068784/logos/uxdt5wtwbk0qctgm5qbe.png"
            height={32}
            width={32}
            alt="Course Loom"
            priority
            className="h-8 w-8 xsm:h-6 xsm:w-6 "
          />
          <h1 className="text-2xl xsm:text-lg font-bold">CourseLoom</h1>
        </Link>
        {/* only show in large devices */}
        <form action="/courses" className="max-w-sm hidden flex-1 lg:block">
          <search className="relative block">
            <input
              type="search"
              name="query"
              required
              className="rounded-full px-3 py-2 border border-indigo-500 hover:outline-none bg-indigo-50 dark:bg-gray-800 focus:outline-none flex-1 w-full placeholder:text-muted-foreground focus:bg-card dark:focus:bg-gray-700 pr-12 dark:focus:placeholder-gray-200 focus:transition-colors"
              autoComplete="false"
              placeholder="What are you looking for?"
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-indigo-500 text-white flex items-center justify-center hover:bg-indigo-600 focus:outline-none absolute right-1 top-1/2 transform -translate-y-1/2 disabled:opacity-50">
              <Search className="w-4 h-4" />
            </button>
          </search>
        </form>
        <button
          data-collapse-toggle="mobile-menu"
          type="button"
          className="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none rounded-lg inline-flex items-center justify-center"
          aria-controls="mobile-menu-2"
          aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          {user ? (
            <Image
              src={
                user?.imageUrl ??
                `https://ui-avatars.com/api/?background=007bff&color=fff&name=${user?.firstName}+${user?.lastName}`
              }
              width={32}
              height={32}
              alt="avatar"
              title="open menu"
              className="w-8 h-8 xsm:w-6 xsm:h-6 rounded-full focus:outline-none focus-within:outline-none ring-offset-2 ring-2 ring-blue-600 ring-offset-white"
            />
          ) : (
            <svg
              className="w-6 h-6 dark:text-gray-200"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"></path>
            </svg>
          )}
        </button>
        <div className="hidden md:block w-full md:w-auto" id="mobile-menu">
          <ul className="flex-col md:flex-row flex md:items-center md:space-x-8 mt-4 md:mt-0 md:text-lg md:font-medium xsm:text-sm">
            <SignedIn>
              <li>
                <Link
                  href="/dashboard"
                  prefetch={false}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900 border-b border-input dark:border-gray-800 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 hover:underline underline-offset-2 md:p-0 xsm:hover:bg-indigo-100 dark:xsm:hover:bg-indigo-900 xsm:px-2 xsm:rounded-md">
                  Dashboard
                </Link>
              </li>
            </SignedIn>

            <li>
              <Link
                href="/courses"
                className="hover:bg-gray-50 dark:hover:bg-gray-900 border-b border-input dark:border-gray-800 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 hover:underline underline-offset-2 md:p-0 xsm:hover:bg-indigo-100 dark:xsm:hover:bg-indigo-900 xsm:px-2 xsm:rounded-md">
                Courses
              </Link>
            </li>

            <li>
              <button
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar3"
                className=" hover:bg-gray-50 dark:hover:bg-gray-900 border-b border-gray-100 dark:border-gray-800 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2  md:p-0 font-medium flex items-center justify-between w-full md:w-auto hover:underline underline-offset-2  xsm:hover:bg-indigo-100 dark:xsm:hover:bg-indigo-900 xsm:px-2 xsm:rounded-md">
                Resources{" "}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
              </button>
              {/* Dropdown menu  */}
              <div
                id="dropdownNavbar3"
                className="hidden text-base list-none divide-y divide-gray-200 rounded shadow my-4 w-[84%] md:w-44 shadow-indigo-600 z-20 bg-white text-gray-950">
                <ul className="py-1" aria-labelledby="dropdownLargeButton">
                  <li>
                    <Link
                      href="/pricing"
                      className="text-sm hover:bg-indigo-100 text-gray-700 block px-4 py-2 rounded-md">
                      Pricing
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/contact"
                      className="text-sm hover:bg-indigo-100 text-gray-700 block px-4 py-2 rounded-md">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faqs"
                      className="text-sm hover:bg-indigo-100 text-gray-700 block px-4 py-2 rounded-md">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/testimonials"
                      className="text-sm hover:bg-indigo-100 text-gray-700 block px-4 py-2 rounded-md">
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/teach"
                      className="text-sm hover:bg-indigo-100 text-gray-700 block px-4 py-2 rounded-md">
                      Become an Instructor
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="md:hidden">
              <SignedOut>
                <SignInButton>
                  <button className="hover:bg-gray-50 dark:hover:bg-gray-900 border-b border-input dark:border-gray-800 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 hover:underline underline-offset-2 md:p-0 xsm:hover:bg-indigo-100 dark:xsm:hover:bg-indigo-900 xsm:px-2 xsm:rounded-md w-full text-start">
                    Get Started
                  </button>
                </SignInButton>
              </SignedOut>
            </li>
            <li className="hidden md:block">
              <SignedOut>
                <SignInButton>
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Get Started
                  </button>
                </SignInButton>
              </SignedOut>
            </li>
            {/* Dropdown for account */}
            <SignedIn>
              <li className="relative">
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="hover:bg-gray-50 border-b border-b-input dark:border-b-gray-800 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:p-0 md:font-medium flex items-center justify-between w-full md:w-auto hover:underline underline-offset-2 xsm:hover:bg-indigo-100 xsm:hover:text-black xsm:px-2 xsm:rounded-md">
                  {/* Render user image */}
                  <Image
                    src={
                      user?.imageUrl ??
                      `https://ui-avatars.com/api/?background=007bff&color=fff&name=${user?.firstName}+${user?.lastName}`
                    }
                    width={32}
                    height={32}
                    alt="avatar"
                    title="open menu"
                    className="w-8 h-8 rounded-full focus:outline-none focus-within:outline-none ring-offset-2 ring-2 ring-blue-600 ring-offset-white hidden md:block"
                  />
                  <p className="md:hidden">My Account</p>
                </button>
                {/* Dropdown menu */}
                <div
                  id="dropdownNavbar"
                  className="hidden text-base list-none divide-y divide-gray-200 rounded shadow my-4 w-[84%] md:w-44 shadow-indigo-600 z-20 bg-white ">
                  <ul
                    className="py-1 px-2"
                    aria-labelledby="dropdownLargeButton">
                    <li className="md:hidden">
                      <Link
                        prefetch={false}
                        href="/dashboard"
                        className="text-sm hover:bg-indigo-100 text-gray-700 block px-4 py-2 rounded-md">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        prefetch={false}
                        href="/profile"
                        className="text-sm hover:bg-indigo-100 text-gray-700 block px-4 py-2 rounded-md">
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        prefetch={false}
                        href="/dashboard/courses"
                        className="text-sm hover:bg-indigo-100 text-gray-700 block px-4 py-2 rounded-md">
                        My Courses
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/profile"
                        prefetch={false}
                        className="text-sm hover:bg-indigo-100 text-gray-700 block px-4 py-2 rounded-md">
                        Settings
                      </Link>
                    </li>
                    <SignedIn>
                      <li className="text-sm hover:bg-indigo-100 text-gray-700 block px-4 py-2 rounded-md md:hover:bg-destructive md:hover:text-destructive-foreground">
                        <SignOutButton>Sign Out</SignOutButton>
                      </li>
                    </SignedIn>
                  </ul>
                </div>
              </li>
            </SignedIn>
            {/* end of dropdown */}
          </ul>
        </div>
      </div>
    </menu>
  );
}
