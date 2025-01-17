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

export default async function Navbar() {
  const user = await currentUser();
  console.log(user);
  return (
    <menu className="w-full py-2">
      <Script
        async
        defer
        src="https://unpkg.com/@themesberg/flowbite@1.1.1/dist/flowbite.bundle.js"></Script>
      <div className="flex flex-wrap items-center justify-between  px-4 w-full">
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
              className="w-6 h-6"
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
        {/* trial */}
        <div className="hidden md:block w-full md:w-auto" id="mobile-menu">
          <ul className="flex-col md:flex-row flex md:items-center md:space-x-8 mt-4 md:mt-0 md:text-lg md:font-medium xsm:text-sm">
            <SignedIn>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 hover:underline underline-offset-2 md:p-0 xsm:hover:bg-indigo-100 xsm:px-2 xsm:rounded-md">
                  Dashboard
                </Link>
              </li>
            </SignedIn>
            <li>
              <Link
                href="/dashboard"
                className="hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 hover:underline underline-offset-2 md:p-0 xsm:hover:bg-indigo-100 xsm:px-2 xsm:rounded-md">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/courses"
                className="hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 hover:underline underline-offset-2 md:p-0 xsm:hover:bg-indigo-100 xsm:px-2 xsm:rounded-md">
                Courses
              </Link>
            </li>
            <li>
              <Link
                href="/testimonials"
                className="hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 hover:underline underline-offset-2 md:p-0 xsm:hover:bg-indigo-100 xsm:px-2 xsm:rounded-md">
                Testimonials
              </Link>
            </li>
            <li className="md:hidden">
              <SignInButton>
                <button className="hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 hover:underline underline-offset-2 md:p-0 xsm:hover:bg-indigo-100 xsm:px-2 xsm:rounded-md">
                  Get Started
                </button>
              </SignInButton>
            </li>
            <li className="hidden md:block">
              <SignedOut>
                <SignInButton>
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors">
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
                  className="hover:bg-gray-50 border-b border-gray-100 md:hover:bg-transparent md:border-0 pl-3 pr-4 py-2 md:p-0 md:font-medium flex items-center justify-between w-full md:w-auto hover:underline underline-offset-2 xsm:hover:bg-indigo-100 xsm:px-2 xsm:rounded-md">
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
                  className="hidden text-base z-10 list-none divide-y divide-gray-200 rounded shadow my-4 w-[84%] md:w-44 shadow-indigo-600 ">
                  <ul
                    className="py-1 px-2"
                    aria-labelledby="dropdownLargeButton">
                    <li className="md:hidden">
                      <a
                        href="/dashboard"
                        className="text-sm hover:bg-indigo-100 text-gray-700 block px-4 py-2 rounded-md">
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="/profile"
                        className="text-sm hover:bg-indigo-100 text-gray-700 block px-4 py-2 rounded-md">
                        My Account
                      </a>
                    </li>
                    <li>
                      <a
                        href="/dashboard/courses"
                        className="text-sm hover:bg-indigo-100 text-gray-700 block px-4 py-2 rounded-md">
                        My Courses
                      </a>
                    </li>
                    <li>
                      <a
                        href="/profile"
                        className="text-sm hover:bg-indigo-100 text-gray-700 block px-4 py-2 rounded-md">
                        Settings
                      </a>
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

        {/* end of trial */}
      </div>
    </menu>
  );
}
