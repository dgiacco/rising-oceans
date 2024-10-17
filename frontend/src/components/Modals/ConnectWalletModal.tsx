import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion, AnimatePresence } from "framer-motion";
import { Connector, useAccount } from "wagmi";
import { useEffect } from "react";

type ConnectWalletModalProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      closeModal();
    }
  }, [isConnected, closeModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 px-4 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative bg-roTeal p-6 rounded-md shadow-lg max-w-sm text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-2 right-2 text-roAquaBlue font-bold text-xl hover:text-roAquaBlue hover:brightness-125"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-roAquaBlue mt-2 mb-4">
              Please connect your wallet to continue
            </h2>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConnectWalletModal;
