import Image from "next/image";
import Button from "./Button";

interface OrgCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const OrgCard: React.FC<OrgCardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="mx-auto bg-transparent border border-2 border-roAquaBlue rounded-lg backdrop-blur w-72 h-[28rem] flex flex-col justify-between">
      <div className="flex flex-col items-center p-4 h-full justify-between">
        <div className="w-60 h-60 mb-4 rounded-t-lg">
          <Image
            className="object-cover"
            src={imageSrc}
            alt={title}
            width={500}
            height={500}
            priority
          />
        </div>

        <h1 className="text-xl font-bold text-roAquaBlue text-center">
          {title}
        </h1>
        <p className="text-roSeaGreen mt-2 text-center">{description}</p>
        <div className="mt-auto">
          <Button label="View more" />
        </div>
      </div>
    </div>
  );
};

export default OrgCard;
