import type { Metadata } from "next";
import { Poppins, Quicksand } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Bubbles from "@/components/Bubbles";

export const metadata: Metadata = {
  title: "Rising Oceans",
  description: "Save the oceans",
};

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "700"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} ${quicksand.className} underwater`}
      >
        <Bubbles />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
