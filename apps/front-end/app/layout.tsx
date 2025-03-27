import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import AppBar from "@/components/AppBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blink",
  description: "Uptime monitoring platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider afterSignOutUrl="/">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
        >
          <AppBar />
          <div className="overflow-auto h-screen">{children}</div>
        </body>
      </ClerkProvider>
    </html>
  );
}
