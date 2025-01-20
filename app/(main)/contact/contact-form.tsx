"use client";
import { Input } from "@/components/ui/input";
import { Delete, Send } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
  const [error, setError] = useState<string | null>(null);

  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    if (emailValue.trim() === "") {
      setError(null);
    } else if (!emailValue.match(pattern)) {
      setError("Please enter a valid email address");
    } else {
      setError(null);
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("fullname") as HTMLInputElement)
      ?.value;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      ?.value;
    const toastId = toast.loading("Sending message...", {
      position: "top-center",
    });
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "134e33ca-5eb3-4993-bd97-5a12f68fb77a",
        name,
        email,
        message,
        from_name: "Course Loom",
        subject: "You have a new message at courseloom.vercel.app.",
      }),
    });
    toast.dismiss(toastId);
    const result = await response.json();
    if (result.success) {
      toast.success("Message sent successfully", {
        position: "top-center",
      });
      form.reset();
    } else {
      toast.error("Failed to send message. Please try again.");
    }
  }

  return (
    <form
      id="form"
      onSubmit={handleSubmit}
      className="bg-card p-6 col-span-full md:col-span-2  rounded-lg shadow mb-12">
      <h2 className="text-xl md:text-2xl font-bold text-start md:text-center my-2">
        Need More information?
      </h2>
      <p className="text-muted-foreground xsm:text-sm mb-2">
        Fill up the form below to send us a message and we will get in touch as
        soon as possible.
      </p>
      <input type="checkbox" name="botcheck" id="" className="hidden" />
      <div className="flex flex-col md:flex-row justify-between gap-x-4">
        <div className="space-y-2 w-full">
          <label htmlFor="name">
            Name <span className="text-red-600 font-bold">*</span>
          </label>
          <Input
            id="name"
            type="text"
            name="fullname"
            placeholder="John Doe"
            autoComplete="name"
            pattern="^[a-zA-Z\s]*$"
            title="Numbers and special characters are not allowed"
            maxLength={20}
            minLength={3}
            required
          />
        </div>
        <div className="space-y-2 w-full">
          <label htmlFor="email">
            Email <span className="text-red-600 font-bold">*</span>
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            onInput={handleInput}
            title="Enter a valid email address"
            maxLength={60}
            minLength={3}
            required
          />
          <p
            className={`text-red-500 text-sm  ${
              error ? "visible opacity-100" : "invisible opacity-0"
            }`}>
            {error}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message">
          Your Message<span className="text-red-600 font-bold">*</span>
        </label>
        <textarea
          className="flex min-h-[80px] w-full rounded-md border border-input bg-gray-100 dark:bg-input focus-visible:bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          rows={4}
          id="message"
          name="message"
          maxLength={500}
          minLength={5}
          required
          placeholder="Type your message here..."></textarea>
      </div>
      <div className="flex items-center justify-end gap-4 py-2 md:py-4">
        <button
          type="reset"
          className="border-indigo-500 hover:border-red-500 border px-4 py-1 rounded-lg focus:outline-none focus:ring-2 transition-colors flex items-center justify-start gap-2"
          title="clear form inputs">
          <Delete className="h-4 w-4" /> Clear
        </button>
        <button
          type="submit"
          title="submit form"
          className="bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-start gap-2">
          <Send className="h-4 w-4" /> Send
        </button>
      </div>
    </form>
  );
}
