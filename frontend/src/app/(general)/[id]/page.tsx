"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";

import { useGetActiveCampaigns } from "@/app/hooks/useGetActiveCampaigns";
import Button from "@/components/Button";
import SpinnerLoader from "@/components/SpinnerLoader";
import DonationModal from "@/components/Modals/DonationModal";
import ConnectWalletModal from "@/components/Modals/ConnectWalletModal";

const CampaignPage = () => {
  const { address: owner, isConnected } = useAccount();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false);

  const { id } = useParams();

  const { campaigns, isLoading, isError } = useGetActiveCampaigns();

  useEffect(() => {
    if (isConnected) {
      setShowConnectWalletModal(false);
    }
  }, [isConnected]);

  const campaign = campaigns?.find((c) => c.id === Number(id));
  const campaignImg =
    campaign?.image === "turtle" ? "/turtle-img.png" : "/coral-img.png";

  if (isLoading || isError || !campaign)
    return (
      <div className="pt-16">
        <SpinnerLoader />
      </div>
    );

  const weiTargetAmount = campaign.target?.toString() ?? "0";
  const weiCollectedAmount = campaign.amountCollected?.toString() ?? "0";

  const ethTargetAmount = ethers.formatEther(weiTargetAmount);
  const ethCollectedAmount = ethers.formatEther(weiCollectedAmount);

  const handleModal = async () => {
    setIsButtonDisabled(true);
    if (!isConnected) {
      setShowConnectWalletModal(true);
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      if (signer) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleConnectWalletModal = () => {
    setShowConnectWalletModal(false);
    setIsButtonDisabled(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.3, ease: "easeOut" },
    },
  };

  return (
    <>
      <DonationModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        id={id}
      />
      <ConnectWalletModal
        isOpen={showConnectWalletModal}
        closeModal={handleConnectWalletModal}
      />
      {!isPageLoaded && (
        <div className="pt-16">
          <SpinnerLoader />
        </div>
      )}
      <motion.div
        className={`max-w-5xl mx-auto p-6 text-white ${
          isPageLoaded ? "" : "hidden"
        }`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden">
            <Image
              src={campaignImg}
              alt={campaign.title}
              width={500}
              height={500}
              priority
              className={`${
                campaign.image === "turtle"
                  ? "object-contain"
                  : "w-full object-cover"
              }`}
              onLoad={() => setIsPageLoaded(true)}
            />
          </div>
          <motion.div variants={contentVariants}>
            <motion.h1
              className="text-4xl font-bold text-roAquaBlue"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {campaign.title}
            </motion.h1>
            <motion.p
              className="text-lg mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {campaign.description}
            </motion.p>

            <motion.div
              className="mt-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <h2 className="text-lg font-bold">Target Amount</h2>
              <p>{ethTargetAmount} ETH</p>
            </motion.div>

            <motion.div
              className="mt-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <h2 className="text-lg font-bold">Amount Collected</h2>
              <p>{ethCollectedAmount} ETH</p>
            </motion.div>

            <motion.div
              className="my-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <h2 className="text-lg font-bold">Deadline</h2>
              <p>{new Date(campaign.deadline * 1000).toLocaleDateString()}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <Button
                label="Donate Now"
                variant="primary"
                onClick={handleModal}
                disabled={isButtonDisabled}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default CampaignPage;
