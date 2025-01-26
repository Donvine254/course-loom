import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
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
            <main>{children}</main>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
