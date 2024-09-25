"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

import { useGetActiveCampaigns } from "@/app/hooks/useGetActiveCampaigns";
import Button from "@/components/Button";

const CampaignPage = () => {
  const { id } = useParams();

  const { campaigns, isLoading, isError } = useGetActiveCampaigns();

  const campaign = campaigns?.find((c) => c.id === Number(id));

  const campaignImg =
    campaign?.image === "turtle" ? "/turtle-img.png" : "/coral-img.png";

  if (!campaign) return <div className="text-white">Campaign not found.</div>;

  return (
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
          <h1 className="text-3xl font-bold text-roAquaBlue">
            {campaign.title}
          </h1>
          <p className="text-lg mt-2">{campaign.description}</p>

          <div className="mt-4">
            <h2 className="text-lg font-bold">Target Amount</h2>
            <p>{campaign.target} ETH</p>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-bold">Amount Collected</h2>
            <p>{campaign.amountCollected} ETH</p>
          </div>

          <div className="my-4">
            <h2 className="text-lg font-bold">Deadline</h2>
            <p>{new Date(campaign.deadline * 1000).toLocaleDateString()}</p>
          </div>
          <Button label="Donate Now" variant="primary" />
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
