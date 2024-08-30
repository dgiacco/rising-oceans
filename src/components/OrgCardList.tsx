"use client";

import { ethers } from "ethers";

import OrgCard from "./OrgCard";
import { useCreateCampaign } from "@/app/hooks/useCreateCampaign";
import { useRouter } from "next/navigation";

interface OrgCardListProps {
  cards: {
    title: string;
    description: string;
    imageSrc: string;
  }[];
}

const OrgCardList: React.FC<OrgCardListProps> = ({ cards }) => {
  const { createCampaign } = useCreateCampaign();
  const router = useRouter();

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
