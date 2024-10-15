import Button from "../Button";

type SuccessModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  txHash?: string;
  closeModal?: () => void;
};

import { motion, AnimatePresence } from "framer-motion";

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  title,
  message,
  txHash,
  closeModal,
}) => {
  const handleEtherscanRedirect = (hash: string) => {
    window.open(`https://sepolia.etherscan.io/tx/${hash}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative bg-sky-200 p-6 rounded-md shadow-lg max-w-sm text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-2 right-2 text-roTeal font-bold text-xl hover:text-roSeaGreen"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-roTeal mb-4">{title}</h2>
            <p className="text-roTeal text-lg mb-6">{message}</p>
            <Button
              label="View on Etherscan"
              variant="secondary"
              onClick={() => handleEtherscanRedirect(txHash ?? "")}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
