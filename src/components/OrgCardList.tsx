import OrgCard from "./OrgCard";

interface OrgCardListProps {
  cards: {
    title: string;
    description: string;
  }[];
}

const OrgCardList: React.FC<OrgCardListProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cards.map((card, index) => (
        <OrgCard
          key={index}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default OrgCardList;
