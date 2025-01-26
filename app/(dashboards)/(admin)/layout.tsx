import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { SidebarGroup, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { currentUser, UserJSON } from "@clerk/nextjs/server";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Course Loom",
  description: "An LMS platform that powers the modern mind!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = (await currentUser()) as UserJSON ;
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {/* TODO: fix why this is misbehaving on system */}
          <ClerkProvider afterSignOutUrl="/">
            <GoogleOneTap />
            <Toaster richColors closeButton />
            {/* add sidebars */}
            <SidebarProvider>
              <AppSidebar user={user} />
              <SidebarGroup className="bg-[#F8F9FA] dark:bg-gray-950 transition-colors duration-300 !p-0">
                {/* <Header user={user} /> */}
                <main className="space-y-2 pt-20">{children}</main>
              </SidebarGroup>
            </SidebarProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
