import Button from "./Button";

interface OrgCardProps {
  //imageSrc: string;
  title: string;
  description: string;
  //pageUrl: string;
}

const OrgCard: React.FC<OrgCardProps> = ({
  //imageSrc,
  title,
  description,
  //pageUrl,
}) => {
  return (
    <div className="max-w-sm mx-auto bg-transparent border border-2 border-roAquaBlue rounded-lg backdrop-blur">
      {/* <img
        className="w-full h-48 object-cover rounded-t-lg"
        src={imageSrc}
        alt={title}
      /> */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
        <Button label="View more" />
      </div>
    </div>
  );
};

export default OrgCard;
