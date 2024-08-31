"use client";

import OrgCard from "./OrgCard";
import { useRouter } from "next/navigation";
import { useGetCampaigns } from "@/app/hooks/useGetCampaigns";
import { Campaign } from "@/app/types/Campaign";

type Card = {
  title: string;
  description: string;
  imageSrc: string;
};

const acceptedImages = ["turtle", "coral"]; //temporary fix for the campaign created without the form

const OrgCardList = () => {
  const { campaigns, isLoading, isError } = useGetCampaigns();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading campaigns.</div>;

  //temporary fix for the campaign created without the form
  const validCampaigns = campaigns?.filter((campaign: Campaign) =>
    acceptedImages.includes(campaign.image)
  );

  console.log(validCampaigns);

  const cards: Card[] =
    validCampaigns?.map((campaign: Campaign) => ({
      title: campaign.title,
      description: campaign.description,
      imageSrc: campaign.image,
    })) || [];

  const goToForm = () => {
    router.push("/create-campaign");
  };

  return (
    <>
      <h2 className="relative text-center text-5xl font-bold text-roSeaGreen">
        Active campaigns
      </h2>
      <button
        className="inline-flex items-center justify-center px-4 py-2 rounded-md font-bold bg-roAquaBlue text-roTeal"
        onClick={goToForm}
      >
        +
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {cards.map((card, index) => (
          <OrgCard
            key={index}
            imageSrc={card.imageSrc}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </>
  );
};

export default OrgCardList;
