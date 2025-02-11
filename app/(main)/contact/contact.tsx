"use client";
import { Clock, MapPin, Phone } from "lucide-react";
import React from "react";
import ContactForm from "./contact-form";

export const Contact = () => {
  return (
    <section className="pt-4">
      <div className="bg-opacity-20 bg-inherit border-b">
        <div className="px-6 py-10 md:py-20 flex flex-col items-center justify-center dark:bg-grid-indigo-800 bg-grid-indigo-100 bg-opacity-20">
          <h1 className="text-3xl md:text-4xl text-center font-semibold my-2 capitalize dark:text-white md:py-4">
            Contact Us
          </h1>
          <p className="text-center text-muted-foreground">
            We&apos;re always eager to hear from you!
          </p>
        </div>
      </div>
      {/* section for cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 sm:gap-6 xsm:p-2 max-w-5xl mx-auto overflow-x-clip">
        {/* first card */}
        <div className="flex items-start gap-2 p-6 md:p-2 lg:p-6">
          <button className="bg-indigo-500 dark:bg-indigo-950 rounded-full p-2 flex items-center justify-center h-10 w-10">
            <MapPin className="text-white dark:text-indigo-500" />
          </button>

          <div className="space-y-4">
            <h2 className="font-bold text-base sm:text-xl lg:text-2xl">
              Address
            </h2>
            <p className="text-muted-foreground xsm:text-xs">
              123 Main Street,
            </p>
            <p className="text-muted-foreground xsm:text-xs">Nairobi, Kenya.</p>
          </div>
        </div>
        {/* second card */}
        <div className="flex items-start gap-2 p-6 md:p-2 lg:p-6">
          <button className="bg-indigo-500 dark:bg-indigo-950 rounded-full p-2 flex items-center justify-center h-10 w-10">
            <Phone className="text-white dark:text-indigo-500" />
          </button>
          <div className="space-y-4">
            <h2 className="font-bold text-base sm:text-xl lg:text-2xl">
              Contact
            </h2>
            <p className="text-muted-foreground xsm:text-xs whitespace-nowrap">
              Mobile/SMS: {""}
              <a
                href="tel:+254712345678"
                target="_blank"
                referrerPolicy="no-referrer"
                className="font-semibold hover:underline hover:text-indigo-500 ">
                +254712345678
              </a>
            </p>
            <p className="text-muted-foreground xsm:text-xs whitespace-nowrap">
              Hotline: {""}
              <span className="font-semibold">1800 - 1102</span>
            </p>
            <p className="text-muted-foreground xsm:text-xs whitespace-nowrap">
              Email: {""}
              <a
                href="mailto:info@courseloom.app"
                target="_blank"
                referrerPolicy="no-referrer"
                className="font-semibold hover:underline hover:text-indigo-500">
                info@courseloom.app
              </a>
            </p>
          </div>
        </div>
        {/* third card */}
        <div className="flex items-start gap-2 p-6 md:p-2 lg:p-6">
          <button className="bg-indigo-500 dark:bg-indigo-950 rounded-full p-2 flex items-center justify-center h-10 w-10">
            <Clock className="text-white dark:text-indigo-500" />
          </button>
          <div className="space-y-4">
            <h2 className="font-bold text-base sm:text-xl lg:text-2xl whitespace-nowrap ">
              Hours of Operation
            </h2>
            <p className="text-muted-foreground xsm:text-xs">
              Monday - Friday: 09:00 - 20:00
            </p>
            <p className="text-muted-foreground xsm:text-xs">
              Sunday & Saturday: 10:30 - 22:00
            </p>
          </div>
        </div>
      </div>
      {/* section for map */}
      <div className="max-w-5xl mx-auto p-2 md:p-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.816904682195!2d36.820169974118414!3d-1.2837407987040481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d67ee2d70b%3A0x2a9f5a7ddd13c4bd!2s123%20Kimathi%20St%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1737410103068!5m2!1sen!2ske"
          width="100%"
          height="450"
          allowFullScreen
          className="w-full rounded-md"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      {/* section for contact form */}
      <div className="max-w-5xl mx-auto p-2 md:p-4">
        <ContactForm />
      </div>
    </section>
  );
};
