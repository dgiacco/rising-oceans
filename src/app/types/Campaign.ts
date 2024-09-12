import { ethers } from "ethers";

export type Campaign = {
  owner: string;
  title: string;
  description: string;
  target: ethers.BigNumberish;
  deadline: number;
  amountCollected: ethers.BigNumberish;
  image: string;
  donators: string[];
  donations: ethers.BigNumberish[];
  isActive?: boolean;
};
