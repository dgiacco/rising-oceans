"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import ConnectCard from "@/components/ConnectCard";
import WaveLoader from "@/components/WaveLoader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [proceedAsGuest, setProceedAsGuest] = useState(false);
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (isConnected || proceedAsGuest) {
        router.push("/home");
      }
    }
  }, [isLoading, isConnected, proceedAsGuest, router]);

  const handleProceedAsGuest = () => {
    setProceedAsGuest(true);
  };

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <WaveLoader />
      </main>
    );
  }

  if (!isConnected && !proceedAsGuest) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <ConnectCard onContinue={handleProceedAsGuest} />
      </main>
    );
  }

  return null;
}
