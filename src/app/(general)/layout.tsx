"use client";

import { useAccount } from "wagmi";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/Header";

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
    <div>
      <>
        <Header />
        <div>{children}</div>
      </>
    </div>
  );
}
