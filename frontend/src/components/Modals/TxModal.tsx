import SpinnerLoader from "../SpinnerLoader";

type TxModalProps = {
  isOpen: boolean;
};

import { motion, AnimatePresence } from "framer-motion";

const TxModal: React.FC<TxModalProps> = ({ isOpen }) => {
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
            className="bg-sky-200 p-4 rounded-md shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SpinnerLoader />
            <p className="mt-2 text-center text-roTeal text-lg font-bold">
              Transaction in progress...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TxModal;
