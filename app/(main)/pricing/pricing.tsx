"use client";

import { useState } from "react";
import { pricingPlans } from "@/constants/pricing";
import { CheckCircle, InfoIcon } from "lucide-react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { SubscriptionButton } from "@/components/ui/subscription-button";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  );

  return (
    <div className="min-h-screen p-2 md:p-8">
      {/* Billing Toggle */}
      <div className="flex justify-center gap-4 items-center">
        <button
          onClick={() => setBillingPeriod("monthly")}
          className={`px-4 py-2 rounded-full ${
            billingPeriod === "monthly"
              ? "bg-background shadow-sm ring-1 ring-inset ring-gray-300"
              : "text-gray-500"
          }`}>
          Pay monthly
        </button>
        <button
          onClick={() => setBillingPeriod("yearly")}
          className={`px-4 py-2 rounded-full ${
            billingPeriod === "yearly"
              ? "bg-indigo-600 text-indigo-100 shadow-sm ring-1 ring-inset ring-indigo-600"
              : "text-gray-500"
          }`}>
          Pay yearly
        </button>
      </div>
      <div className="flex items-center gap-2 max-w-md px-3 justify-center mx-auto  my-4 text-green-600 bg-green-100 rounded-md py-2">
        <InfoIcon className="h-4 w-4" />
        <p>Save up to 25% with a yearly plan ✨</p>
      </div>

      {/* Pricing Cards */}
      <div className="flex items-start gap-8 max-w-7xl mx-auto overflow-x-auto snap-x pb-2">
        {pricingPlans[billingPeriod].map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-card border rounded-2xl shadow-sm dark:shadow-indigo-500 backdrop-blur-sm hover:shadow-xl min-w-fit xsm:w-full lg:min-w-min h-[680px] mb-2 snap-center ${
              plan.badge === "💪 Most popular"
                ? "border-2 border-indigo-500"
                : plan.name === "Lifetime"
                ? "border-amber-100"
                : ""
            }`}>
            {/* Badge */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              <span
                className={`inline-block px-3 py-1 rounded-b-md text-sm font-medium
                  ${
                    plan.badge === "💪 Most popular"
                      ? "bg-indigo-500 text-white"
                      : plan.badge === "🔥Best Value"
                      ? "bg-amber-100 text-amber-800 "
                      : "bg-gray-100 text-gray-800 dark:bg-gray-500 dark:text-gray-200"
                  }`}>
                {plan.badge}
              </span>
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">
                    {" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "KSH",
                      maximumFractionDigits: 0,
                    }).format(plan.price * 120)}
                  </span>

                  {plan.name !== "Lifetime" && (
                    <span className="text-muted-foreground ml-2">/ month</span>
                  )}
                </div>
                {plan.name !== "Pro" ? (
                  <p className="text-muted-foreground mt-2">{plan.billing}</p>
                ) : (
                  <p className="text-muted-foreground mt-2">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "KSH",
                      maximumFractionDigits: 2,
                    }).format(plan.price * 120 * 12)}{" "}
                    {plan.billing}
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <SignedIn>
                <SubscriptionButton
                  plan={plan.name}
                  amount={plan.price}
                  text="Get Started"
                  className={`font-medium mb-4 rounded-lg ${
                    plan.badge !== "😍 No credit card required"
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                />
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <button
                    className={`w-full py-3 px-6 rounded-lg font-medium mb-4
                    ${
                      plan.badge !== "😍 No credit card required"
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}>
                    Get Started
                  </button>
                </SignInButton>
              </SignedOut>
              {/* Features */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Key features</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center justify-start">
                      <CheckCircle className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
