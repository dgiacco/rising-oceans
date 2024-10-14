"use client";

import OrgCardList from "@/components/OrgCardList";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const goToForm = () => {
    router.push("/create-campaign");
  };

  return (
    <div className="my-5 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-3">
        <h2 className="relative text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-roSeaGreen">
          Active campaigns
        </h2>
        <button
          className="inline-flex items-center justify-center px-4 py-2 rounded-md font-bold bg-roAquaBlue text-roTeal hover:brightness-125"
          onClick={goToForm}
        >
          +
        </button>
      </div>

      <OrgCardList />
    </div>
  );
};

export default HomePage;
