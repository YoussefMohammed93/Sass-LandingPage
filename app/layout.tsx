import "./globals.css";

import type { Metadata } from "next";

import { Inter, Ovo } from "next/font/google";

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-inter",
});

const ovo = Ovo({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ovo",
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
      <body className={`${inter.variable} ${ovo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
