"use client";
import { createSubscriptionSession } from "@/lib/stripe";
import { cn } from "@/lib/utils";
import React from "react";
import { toast } from "sonner";

export const SubscriptionButton = ({
  className,
  amount,
  plan,
  text,
  variant = "subscription",
  title,
}: {
  className?: string;
  amount: number;
  plan?: string;
  text: string;
  variant?: string;
  title?: string;
}) => {
  const paymentAmount = Number(amount * 120 * 100);
  const name =
    variant === "payment"
      ? `Payment for ${title} course`
      : `Subscribe to Courseloom ${plan || "standard"} monthly plan`;
  const handlePayment = async () => {
    if (plan === "Free") {
      window.location.href = "/courses";
      return;
    }

    const toastId = toast.loading("Processing..", {
      position: "top-center",
    });
    try {
      const sessionUrl = await createSubscriptionSession(paymentAmount, name);
      window.location.href = sessionUrl;
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        "There was an error processing your payment. Please try again.",
        {
          position: "top-right",
        }
      );
    } finally {
      toast.dismiss(toastId);
    }
  };
  return (
    <button
      className={cn(className, "w-full py-3 px-6 font-medium")}
      title="subscribe"
      onClick={handlePayment}>
      {text}
    </button>
  );
};
