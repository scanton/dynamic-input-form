import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Event Details Demo",
  description: "Dynamic invitation event details form demo"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
