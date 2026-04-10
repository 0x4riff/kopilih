import type { Metadata } from "next";

import { AppShell } from "@/components/app-shell";
import { DemoStoreProvider } from "@/components/demo-store-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kopilih Enhanced",
  description:
    "Local-first cafe discovery demo with favorites, submissions, and admin approvals.",
  keywords: [
    "coffee shop",
    "Indonesia",
    "cafe finder",
    "Next.js",
    "Vercel",
    "localStorage demo",
  ],
  openGraph: {
    title: "Kopilih Enhanced",
    description:
      "Discover cafes, submit new spots, and test a local-first approval workflow.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full">
        <DemoStoreProvider>
          <AppShell>{children}</AppShell>
        </DemoStoreProvider>
      </body>
    </html>
  );
}
