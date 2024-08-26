"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { redirect } from "../../node_modules/next/navigation";

import ConnectCard from "@/components/ConnectCard";
import WaveLoader from "@/components/WaveLoader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCheckedConnection, setHasCheckedConnection] = useState(false);

  const { isConnected } = useAccount();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasCheckedConnection(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isConnected && hasCheckedConnection) {
      redirect("/home");
    }
  }, [isConnected, hasCheckedConnection]);

  return (
    <main className="flex items-center justify-center min-h-screen">
      {isLoading && !hasCheckedConnection ? <WaveLoader /> : <ConnectCard />}
    </main>
  );
}
