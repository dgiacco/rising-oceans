"use client";

import { useAccount } from "wagmi";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isConnected } = useAccount();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isConnected) {
      redirect("/");
    } else {
      setLoading(false);
    }
  }, [isConnected]);

  if (loading) {
    return <></>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
