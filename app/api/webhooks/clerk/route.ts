// clerk webhook

import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
export async function GET() {
  return NextResponse.json({ message: "This is a private route" });
}

export async function POST() {
  const api_key = process.env.CLERK_WEBHOOK_SECRET;
  if (!api_key) {
    return NextResponse.json(
      { message: "Unauthorized request" },
      { status: 401 }
    );
  }
}
