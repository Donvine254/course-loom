import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/learn(.*)",
  "/instructor(.*)",
  "/profile(.*)",
  "/dashboard(.*)",
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const role = (await auth()).sessionClaims?.metadata?.role;
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (pathname.startsWith("/instructor") && !role) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (pathname === "/dashboard") {
    let targetPath = "/learn";
    switch (role) {
      case "admin":
        targetPath = "/admin";
        break;
      case "instructor":
        targetPath = "/instructor";
        break;
    }
    return NextResponse.redirect(new URL(targetPath, req.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/admin",
    "/dashboard",
    "/profile",
  ],
};
