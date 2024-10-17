import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { contractABI, contractAddress } from "../utils/contractInfo";
import { Campaign } from "../types/Campaign";

export function useGetActiveCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { isConnected } = useAccount();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        console.log("NEXT_PUBLIC_RPC_URL:", process.env.NEXT_PUBLIC_RPC_URL);

        let provider;
        if (isConnected && window.ethereum) {
          provider = new ethers.BrowserProvider(window.ethereum);
        } else {
          if (!process.env.NEXT_PUBLIC_RPC_URL) {
            throw new Error("NEXT_PUBLIC_RPC_URL is not set");
          }
          provider = new ethers.JsonRpcProvider(
            process.env.NEXT_PUBLIC_RPC_URL
          );
        }

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          provider
        );

        const data = await contract.getCampaigns();

        const campaignsData = data
          .map((campaign: any, index: number) => ({
            id: index,
            owner: campaign[0],
            title: campaign[1],
            description: campaign[2],
            target: parseInt(campaign[3].toString()), // Convert BigNumber to number
            deadline: parseInt(campaign[4].toString()), // Convert BigNumber to number
            amountCollected: parseInt(campaign[5].toString()), // Convert BigNumber to number
            image: campaign[6],
            donators: campaign[7],
            donations: campaign[8],
            isActive:
              parseInt(campaign[4].toString()) > Math.floor(Date.now() / 1000), // Check if campaign is active
          }))
          .filter((campaign: Campaign) => campaign.isActive);

        setCampaigns(campaignsData as Campaign[]);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [isConnected]);

  return {
    campaigns,
    isLoading,
    isError,
  };
}
