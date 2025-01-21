"use server";
import Stripe from "stripe";

const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://courseloom.vercel.app";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function createSubscriptionSession(amount: number, plan: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "link"],
    line_items: [
      {
        price_data: {
          currency: "kes",
          product_data: {
            name: `Courseloom ${plan} Subscription`,
            images: [
              "https://res.cloudinary.com/dipkbpinx/image/upload/v1737502381/illustrations/undraw_learning-sketchingsh_ogwmxu.svg",
            ],
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    phone_number_collection: { enabled: true },
    mode: "payment",
    success_url: `${baseUrl}/courses`,
    cancel_url: `${baseUrl}/pricing`,
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }
  return session.url;
}
