"use server";
import { clerkClient } from "@clerk/nextjs/server";

export async function setRole(id: string, role: string) {
  const client = await clerkClient();
  try {
    const res = await client.users.updateUserMetadata(id, {
      publicMetadata: { role: role },
    });
    // TODO: refresh session token immediately after updating the role
    return { success: true, message: res.publicMetadata };
  } catch (err) {
    return { success: false, message: err };
  }
}

export async function removeRole(id: string) {
  const client = await clerkClient();

  try {
    const res = await client.users.updateUserMetadata(id, {
      publicMetadata: { role: null },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}
