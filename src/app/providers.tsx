"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode } from "react";

import colors from "./styles/colors";

import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
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
    modalBackground: colors.roTeal,
    accentColor: colors.roAquaBlue,
    modalBorder: colors.roAquaBlue,
    closeButton: "white",
    closeButtonBackground: colors.roSeaGreen,
    accentColorForeground: colors.roTeal,
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
