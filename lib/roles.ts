"use server";
import { Roles } from "@/types";
import { auth } from "@clerk/nextjs/server";

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata.role === role;
};
export const getRole = async () => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata.role;
};
