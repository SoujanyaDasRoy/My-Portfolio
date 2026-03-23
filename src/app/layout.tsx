import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soujanya Das Roy | Full-Stack Developer",
  description:
    "Full-Stack Developer specializing in React, Next.js, and modern web applications. Building fast, clean, and user-focused digital experiences.",
  keywords: ["developer", "portfolio", "react", "nextjs", "full-stack"],
  authors: [{ name: "Soujanya Das Roy" }],
  openGraph: {
    title: "Soujanya Das Roy | Full-Stack Developer",
    description: "Full-Stack Developer building modern web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
