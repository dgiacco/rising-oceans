import OrgCardList from "@/components/OrgCardList";

const page = () => {
  return (
    <div className="mt-10">
      <OrgCardList cards={[{ title: "title", description: "description" }]} />
    </div>
  );
};

export default page;
