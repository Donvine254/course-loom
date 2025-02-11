// clerk webhook
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, userData, updateUser } from "@/lib/actions/admin";
export async function GET() {
  return NextResponse.json({ message: "This is a private route" });
}

export async function POST(req: NextRequest) {
  const api_key = process.env.CLERK_WEBHOOK_SECRET;
  if (!api_key) {
    return NextResponse.json(
      { message: "Unauthorized request" },
      { status: 401 }
    );
  }
  // Create new Svix instance with secret
  const wh = new Webhook(api_key);
  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);
  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    if (!id || !email_addresses) {
      return new Response("Error occurred -- missing data", {
        status: 400,
      });
    }

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      firstName: first_name,
      lastName: last_name,
      profileImage: image_url,
    };

    await createUser(user as userData);
  }
  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    if (!id || !email_addresses) {
      return new Response("Error occurred -- missing data", {
        status: 400,
      });
    }

    const user = {
      email: email_addresses[0].email_address,
      firstName: first_name,
      lastName: last_name,
      profileImage: image_url,
    };

    await updateUser(user as userData, id);
  }
  return new Response("Event processed successfully", { status: 200 });
}

// add update and delete user
