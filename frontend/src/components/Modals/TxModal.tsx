import SpinnerLoader from "../SpinnerLoader";

type TxModalProps = {
  isOpen: boolean;
};

const TxModal: React.FC<TxModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-sky-200 p-4 rounded-md shadow-lg">
        <SpinnerLoader />
        <p className="mt-2 text-center text-roTeal text-lg font-bold">
          Transaction in progress...
        </p>
      </div>
    </div>
  );
};

export default TxModal;
