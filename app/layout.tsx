import "./globals.css";

import type { Metadata } from "next";

import { Inter } from "next/font/google";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Critter - The best mobile software for pet care businesses",
  description:
    "The best mobile software for pet care businesses on the go, with tools for scheduling, invoicing, customer management, and communication.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
