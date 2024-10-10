"use client";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/contractInfo";
import { useEffect, useState } from "react";
import { BaseError } from "viem";

export function useCreateCampaign() {
  const { data: hash, writeContract, error: writeError } = useWriteContract();
  const [isRejected, setIsRejected] = useState(false);

  useEffect(() => {
    if (writeError && writeError instanceof BaseError) {
      console.log("Full error object:", writeError);

      // Check for user rejection in the error
      if (writeError.shortMessage?.includes("User rejected the request")) {
        console.log("Transaction was rejected by user");
        setIsRejected(true);
      }
    }
  }, [writeError]);

  const createCampaign = async (
    _owner: string,
    _title: string,
    _description: string,
    _target: ethers.BigNumberish,
    _deadline: ethers.BigNumberish,
    _image: string
  ) => {
    if (writeContract) {
      try {
        setIsRejected(false);
        const tx = writeContract({
          address: contractAddress,
          abi: contractABI,
          functionName: "createCampaign",
          args: [_owner, _title, _description, _target, _deadline, _image],
        });
      } catch (err) {
        console.error("Transaction failed:", err);
        setIsRejected(true);
        throw err;
      }
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    createCampaign,
    isConfirming,
    isConfirmed,
    isRejected,
    hash,
  };
}
