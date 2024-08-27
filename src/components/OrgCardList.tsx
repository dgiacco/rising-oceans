import OrgCard from "./OrgCard";

interface OrgCardListProps {
  cards: {
    title: string;
    description: string;
    imageSrc: string;
  }[];
}

const OrgCardList: React.FC<OrgCardListProps> = ({ cards }) => {
  return (
    <>
      <h2 className="relative text-center text-5xl font-bold text-roSeaGreen">
        Active campaigns
      </h2>
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
