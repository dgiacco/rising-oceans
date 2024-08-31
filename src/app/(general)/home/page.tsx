import OrgCardList from "@/components/OrgCardList";
import { useGetCampaigns } from "@/app/hooks/useGetCampaigns";

const HomePage = () => {
  return (
    <div className="mt-10">
      <OrgCardList />
    </div>
  );
};

export default HomePage;
