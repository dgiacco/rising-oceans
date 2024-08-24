import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Bubbles from "@/components/Bubbles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rising Oceans",
  description: "Save the oceans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="underwater" style={{ overflow: "hidden" }}>
        <Bubbles />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
