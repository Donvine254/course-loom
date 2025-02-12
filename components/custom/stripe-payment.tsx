"use client";
import { createPaymentSession } from "@/lib/helpers/stripe";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

// TODO: Create a separate subscription and purchase course button
export const SubscriptionButton = ({ className }: { className?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubscription = async () => {
    setIsLoading(true);
    toast.info("Upcoming feature!");
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  return (
    <button
      className={cn(
        className,
        "w-full py-3 px-6 font-medium flex items-center justify-center"
      )}
      title="subscribe"
      disabled={isLoading}
      onClick={handleSubscription}>
      {isLoading ? (
        <span className="flex items-center justify-start gap-2">
          <Loader2 className="h-4 w-4 animate-spin" /> Processing
        </span>
      ) : (
        "Get Started"
      )}
    </button>
  );
};

export function StripePaymentButton({
  courseId,
  className,
}: {
  courseId: string;
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleCoursePurchase() {
    if (!courseId) return;

    setIsLoading(true);
    try {
      const sessionUrl = await createPaymentSession(courseId);
      window.location.assign(sessionUrl);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        "There was an error processing your payment. Please try again.",
        {
          position: "top-right",
        }
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      className={cn(
        className,
        "w-full py-3 px-6 font-medium flex items-center justify-center"
      )}
      title="Buy this course"
      disabled={isLoading}
      onClick={handleCoursePurchase}>
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" /> Processing
        </span>
      ) : (
        "Enroll Now"
      )}
    </button>
  );
}
