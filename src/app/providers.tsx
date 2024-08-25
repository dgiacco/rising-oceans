"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode } from "react";

import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
  Theme,
} from "@rainbow-me/rainbowkit";
import merge from "lodash.merge";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
});

const queryClient = new QueryClient();
const myCustomTheme = merge(darkTheme(), {
  colors: {
    modalBackground: "#005e79",
    accentColor: "#6adbd8",
    modalBorder: "#6adbd8",
    closeButton: "white",
    closeButtonBackground: "#34918e",
    accentColorForeground: "#005e79",
  },
  radii: {
    actionButton: "10px",
    connectButton: "12px",
  },
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={myCustomTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
