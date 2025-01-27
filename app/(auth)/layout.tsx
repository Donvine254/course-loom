import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <ClerkProvider
          appearance={{
            layout: {
              socialButtonsPlacement: "bottom",
            },
          }}>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}>
            <main>{children}</main>
          </body>
        </ClerkProvider>
      </ThemeProvider>
    </html>
  );
}
