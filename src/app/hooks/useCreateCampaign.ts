import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/contractInfo";

export function useCreateCampaign() {
  const { data: hash, writeContract } = useWriteContract();

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
        const tx = writeContract({
          address: contractAddress,
          abi: contractABI,
          functionName: "createCampaign",
          args: [_owner, _title, _description, _target, _deadline, _image],
        });
      } catch (err) {
        console.error("Transaction failed:", err);
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
  };
}
