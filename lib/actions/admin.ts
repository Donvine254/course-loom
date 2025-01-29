"use server";
import prisma from "@/prisma/prisma";
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

export type userData = {
  email: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
};
export async function createUser(data: userData) {
  try {
    const user = await prisma.user.create({
      data,
    });
    return { message: "user created successfully", user };
    // eslint-disable-next-line
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}

type InstructorData = {
  clerkId: string;
  bio: string;
  expertise: string;
  specialization: string;
};
export async function createInstructorAccount(data: InstructorData) {}
