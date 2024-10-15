import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

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
  const isTurtle = imageSrc === "turtle";

  const handleCardClick = () => {
    router.push(`/${id}`);
  };

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <AnimatePresence>
      <motion.div
        className="mx-auto bg-transparent border border-2 border-roAquaBlue rounded-lg backdrop-blur w-82 h-[24rem] flex flex-col justify-between relative overflow-hidden cursor-pointer"
        style={{ width: "20.5rem" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCardClick}
      >
        <motion.div
          className="flex flex-col items-center p-4 h-full justify-between z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <motion.div
            className={`w-60 h-60 mb-4 rounded-t-lg overflow-hidden ${
              isTurtle ? "flex items-center justify-center" : ""
            }`}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Image
              src={cardImg}
              alt={title}
              width={500}
              height={500}
              priority
              className={`${
                isTurtle ? "object-contain" : "w-full object-cover"
              }`}
            />
          </motion.div>

          <motion.div
            className="mt-auto w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <h1 className="text-xl font-bold text-roAquaBlue text-center">
              {truncateDescription(title, 60)}
            </h1>
            <p className="text-roSeaGreen mt-2 text-center">
              {truncateDescription(description, 60)}
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-roAquaBlue opacity-0"
          whileHover={{ opacity: 0.2 }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 w-20 h-20 bg-roSeaGreen rounded-full opacity-30"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default OrgCard;
