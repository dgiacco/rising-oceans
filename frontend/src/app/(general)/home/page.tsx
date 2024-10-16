"use client";

import Button from "@/components/Button";
import OrgCardList from "@/components/OrgCardList";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const goToForm = () => {
    router.push("/create-campaign");
  };

  return (
    <div className="my-5 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-3">
        <div className="sm:hidden mb-3">
          <Button
            label="Start a campaign"
            variant="primary"
            onClick={goToForm}
          />
        </div>
        <h2 className="relative text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-roSeaGreen brightness-125 mb-3 sm:mb-0 order-2 sm:order-1">
          <span className="text-4xl lg:text-5xl">Active campaigns</span>
        </h2>
        <div className="hidden sm:block order-1 sm:order-2">
          <Button
            label="Start a campaign"
            variant="primary"
            onClick={goToForm}
          />
        </div>
      </div>

      <OrgCardList />
    </div>
  );
};

export default HomePage;
