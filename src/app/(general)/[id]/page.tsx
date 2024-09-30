"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { ethers } from "ethers";
import { useState } from "react";

import { useGetActiveCampaigns } from "@/app/hooks/useGetActiveCampaigns";
import Button from "@/components/Button";
import SpinnerLoader from "@/components/SpinnerLoader";
import DonationModal from "@/components/Modals/DonationModal";

const CampaignPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();

  const { campaigns, isLoading, isError } = useGetActiveCampaigns();

  if (isLoading) return <SpinnerLoader />;

  if (isError) return <div>Error loading campaign.</div>;

  const campaign = campaigns?.find((c) => c.id === Number(id));

  const campaignImg =
    campaign?.image === "turtle" ? "/turtle-img.png" : "/coral-img.png";

  const weiTargetAmount = campaign?.target?.toString() ?? "0";
  const weiCollectedAmount = campaign?.amountCollected?.toString() ?? "0";

  const ethTargetAmount = ethers.formatEther(weiTargetAmount);
  const ethCollectedAmount = ethers.formatEther(weiCollectedAmount);

  const hanldeModal = () => {
    setIsModalOpen(true);
  };

  if (!campaign) return <></>;

  return (
    <>
      <DonationModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        id={id}
      />
      <div className="max-w-5xl mx-auto p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden">
            <Image
              src={campaignImg}
              alt={campaign.title}
              width={500}
              height={300}
              layout="responsive"
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-roAquaBlue">
              {campaign.title}
            </h1>
            <p className="text-lg mt-2">{campaign.description}</p>

            <div className="mt-4">
              <h2 className="text-lg font-bold">Target Amount</h2>
              <p>{ethTargetAmount} ETH</p>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-bold">Amount Collected</h2>
              <p>{ethCollectedAmount} ETH</p>
            </div>

            <div className="my-4">
              <h2 className="text-lg font-bold">Deadline</h2>
              <p>{new Date(campaign.deadline * 1000).toLocaleDateString()}</p>
            </div>
            <Button
              label="Donate Now"
              variant="primary"
              onClick={hanldeModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignPage;
