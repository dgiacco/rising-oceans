import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import dynamic from "next/dynamic";

const Bubbles = dynamic(() => import("@/components/Bubbles"), { ssr: false });

export const metadata: Metadata = {
  title: "Rising Oceans",
  description: "Save the oceans",
};

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} underwater`}>
        <Bubbles />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
