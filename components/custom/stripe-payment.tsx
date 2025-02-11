"use client";
import { createPaymentSession, createSubscriptionSession } from "@/lib/stripe";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

// TODO: Create a separate subscription and purchase course button
export const SubscriptionButton = ({
  className,
  amount,
  plan,
  text,
  courseId,
  variant = "subscription",
  title,
}: {
  className?: string;
  amount: number;
  plan?: string;
  text: string;
  variant?: string;
  title?: string;
  courseId: string;
}) => {
  const paymentAmount = Number(amount * 120 * 100);
  const [isLoading, setIsLoading] = useState(false);
  const name =
    variant === "payment"
      ? `${title}`
      : `Subscribe to Courseloom ${plan || "standard"} monthly plan`;
  const handlePayment = async () => {
    if (plan === "Free") {
      return;
    }
    setIsLoading(true);
    try {
      const sessionUrl = await createSubscriptionSession(
        paymentAmount,
        name,
        courseId
      );
      setIsLoading(false);
      window.location.assign(sessionUrl);
    } catch (error) {
      console.error("Payment error:", error);
      setIsLoading(false);
      toast.error(
        "There was an error processing your payment. Please try again.",
        {
          position: "top-right",
        }
      );
    }
  };
  return (
    <button
      className={cn(
        className,
        "w-full py-3 px-6 font-medium flex items-center justify-center"
      )}
      title="subscribe"
      disabled={isLoading}
      onClick={handlePayment}>
      {isLoading ? (
        <span className="flex items-center justify-start gap-2">
          <Loader2 className="h-4 w-4 animate-spin" /> Processing
        </span>
      ) : (
        text
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
