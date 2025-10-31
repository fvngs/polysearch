import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Polysearch",
  description: "Discover Polymarket opportunities with advanced filters"
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#030712] text-emerald-100">
        <div className="min-h-screen bg-[#030712] pb-12">
          {children}
        </div>
      </body>
    </html>
  );
}
