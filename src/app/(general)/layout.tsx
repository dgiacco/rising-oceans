"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const GeneralLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "transparent",
          position: "fixed",
          width: "100%",
          top: 0,
          boxShadow: "0 4px 2px -2px gray",
        }}
      >
        <div className="font-bold text-white">Rising oceans</div>

        <div>
          <ConnectButton />
        </div>
      </nav>

      <div style={{ paddingTop: "80px" }}>{children}</div>
    </>
  );
};

export default GeneralLayout;
