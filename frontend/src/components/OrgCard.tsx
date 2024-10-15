import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import Button from "./Button";

interface OrgCardProps {
  id: number;
  imageSrc: string;
  title: string;
  description: string;
}

const OrgCard: React.FC<OrgCardProps> = ({
  id,
  imageSrc,
  title,
  description,
}) => {
  const router = useRouter();

  const cardImg = imageSrc === "turtle" ? "/turtle-img.png" : "/coral-img.png";

  const handleViewCampaign = () => {
    router.push(`/${id}`);
  };

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <motion.div
      className="mx-auto bg-transparent border border-2 border-roAquaBlue rounded-lg backdrop-blur w-72 h-[28rem] flex flex-col justify-between relative overflow-hidden"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
    >
      <div className="flex flex-col items-center p-4 h-full justify-between z-10">
        <motion.div
          className="w-60 h-60 mb-4 rounded-t-lg overflow-hidden"
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          <Image
            src={cardImg}
            alt={title}
            width={500}
            height={500}
            priority
            className="w-full object-cover"
          />
        </motion.div>

        <motion.h1
          className="text-xl font-bold text-roAquaBlue text-center"
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          {truncateDescription(title, 60)}
        </motion.h1>
        <motion.p
          className="text-roSeaGreen mt-2 text-center"
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          {truncateDescription(description, 60)}
        </motion.p>
        <div className="mt-auto">
          <Button
            label="View more"
            variant="primary"
            onClick={handleViewCampaign}
          />
        </div>
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-roAquaBlue opacity-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-20 h-20 bg-roSeaGreen rounded-full opacity-30"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};

export default OrgCard;
