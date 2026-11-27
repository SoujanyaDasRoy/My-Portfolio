import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display" });
const hand = Caveat({ subsets: ["latin"], weight: "700", variable: "--font-hand" });

const title = "Soujanya Das Roy | Full Stack Developer";
const description =
  "Full stack developer building fast, clean websites with React, Next.js and Node.js. Open to full-time, remote and freelance work.";

export const metadata: Metadata = {
  metadataBase: new URL("https://soujanyadasroy-portfolio.vercel.app"),
  title,
  description,
  authors: [{ name: "Soujanya Das Roy" }],
  openGraph: { title, description, type: "website" },
};

export const viewport: Viewport = { themeColor: "#15110e" };

// Runs before the first paint, so a saved choice never flashes the other theme.
const applySavedTheme = `try{if(localStorage.getItem("theme")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${display.variable} ${hand.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: applySavedTheme }} />
      </head>
      <body>
        {/* without JavaScript nothing can reveal itself, so show it all */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}[data-theme-toggle]{display:none!important}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
