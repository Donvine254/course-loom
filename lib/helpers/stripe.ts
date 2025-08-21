"use server";
import prisma from "@/prisma/prisma";
import Stripe from "stripe";
import { baseUrl } from "../utils";
import { currentUser } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});
// TODO: Migrate to polar since STRIPE does not support payments in my country
export async function createPaymentSession(courseId: string) {
  const user = await currentUser();

  if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
    throw new Error("Failed to create checkout session, user not found");
  }
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      isPublished: true,
    },
  });
  if (!course) {
    throw new Error("Failed to create checkout session, course not found");
  }
  const price = Math.round(course.price * 100 * 120);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "link"],
    line_items: [
      {
        price_data: {
          currency: "kes",
          product_data: {
            name: course.title,
            description: course.summary!,
            images: [
              "https://res.cloudinary.com/dipkbpinx/image/upload/v1737502381/illustrations/undraw_learning-sketchingsh_ogwmxu.svg",
            ],
          },
          unit_amount: price,
        },

        quantity: 1,
      },
    ],
    phone_number_collection: { enabled: true },
    mode: "payment",
    client_reference_id: user.id,
    success_url: `${baseUrl}/courses/${course.slug}?success=1`,
    cancel_url: `${baseUrl}/courses/${course.slug}?cancel=1`,
    adaptive_pricing: {
      enabled: true,
    },

    metadata: {
      courseId,
      userId: user.id,
    },
  });
  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }
  return session.url;
}
