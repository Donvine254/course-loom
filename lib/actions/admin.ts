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
export async function createInstructorAccount(data: InstructorData) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerkId: data.clerkId,
      },
    });
    if (!user) {
      console.error("No user with matching id found");
      throw new Error("User not found");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { role: "INSTRUCTOR" },
    });
    await prisma.instructor.create({
      data: {
        userId: user.id,
        email: user.email,
        username: `${user.firstName} ${user.lastName}`,
        bio: data.bio,
        expertise: data.expertise,
        specialization: data.specialization,
      },
    });
    return {
      success: true,
      message: "instructor account created successfully",
    };
  } catch (error) {
    console.error("An error occurred", error);
    throw new Error("Something went wrong");
  }
}
