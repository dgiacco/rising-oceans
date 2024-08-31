import { useReadContract } from "wagmi";

import { contractABI, contractAddress } from "../utils/contractInfo";
import { Campaign } from "../types/Campaign";

export function useGetCampaigns() {
  const {
    data: campaigns,
    isLoading,
    isError,
  } = useReadContract({
    abi: contractABI,
    address: contractAddress,
    functionName: "getCampaigns",
  });

  return {
    campaigns: campaigns as Campaign[] | undefined,
    isLoading,
    isError,
  };
}
