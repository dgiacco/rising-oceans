import OrgCardList from "@/components/OrgCardList";

const HomePage = () => {
  const cards = [
    {
      title: "Save the turtles",
      description: "Donate for cleaning the water from plastic",
      imageSrc: "/turtle-img.png",
    },
    {
      title: "Save the coral reefs",
      description: "We specialize in coral reefs health",
      imageSrc: "/coral-img.png",
    },
  ];
  return (
    <div className="mt-10">
      <OrgCardList cards={cards} />
    </div>
  );
};

export default HomePage;
