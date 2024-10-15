"use client";

import { useGetActiveCampaigns } from "@/app/hooks/useGetActiveCampaigns";
import OrgCard from "./OrgCard";
import { Campaign } from "@/app/types/Campaign";
import SpinnerLoader from "./SpinnerLoader";
import { useEffect } from "react";
import { useState } from "react";

type Card = {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
};

const acceptedImages = ["turtle", "coral"]; //temporary fix for the campaign created without the form

const OrgCardList = () => {
  const { campaigns, isLoading, isError } = useGetActiveCampaigns();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading && !isError && campaigns) {
      const imageUrls = acceptedImages.map((img) =>
        img === "turtle" ? "/turtle-img.png" : "/coral-img.png"
      );
      const imagePromises = imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = url;
        });
      });

      Promise.all(imagePromises)
        .then(() => setImagesLoaded(true))
        .catch((error) => console.error("Error loading images:", error));
    }
  }, [campaigns, isLoading, isError]);

  if (isLoading || !imagesLoaded)
    return (
      <div className="pt-16">
        <SpinnerLoader />
      </div>
    );

  if (isError) return <div>Error loading campaigns.</div>;

  //temporary fix for the campaign created without the form
  const validCampaigns = campaigns?.filter((campaign: Campaign) =>
    acceptedImages.includes(campaign.image)
  );

  const activeCampaigns = validCampaigns?.map((campaign: Campaign) => ({
    ...campaign,
    isActive: campaign.deadline > Math.floor(Date.now() / 1000),
  }));

  const cards: Card[] =
    activeCampaigns?.map((campaign: Campaign) => ({
      id: campaign.id,
      title: campaign.title,
      description: campaign.description,
      imageSrc: campaign.image,
    })) || [];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {cards.map((card) => (
          <OrgCard
            key={card.id}
            id={card.id}
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
