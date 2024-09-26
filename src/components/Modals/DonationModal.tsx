"use client";

import { useState } from "react";
import Button from "../Button";

type DonationModalProps = {
  isOpen: boolean;
  closeModal?: () => void;
};

const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  closeModal,
}) => {
  if (!isOpen) return null;

  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Regular expression to match numbers with up to 3 decimal places
    const regex = /^(0(\.\d{0,3})?|[1-9]\d*(\.\d{0,3})?)$/;

    // Check if the value is valid (either empty or matches the regex)
    if (regex.test(value) || value === "") {
      setInputValue(value);

      if (parseFloat(value) > 0 || value === "") {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  };

  const preventInvalidInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.currentTarget as HTMLInputElement).value;

    if (e.key === "-" || (value === "0" && e.key === "0")) {
      e.preventDefault();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="relative bg-sky-200 p-6 rounded-md shadow-lg max-w-sm text-center">
        <button
          className="absolute top-2 right-2 text-roTeal font-bold text-xl hover:text-roSeaGreen"
          onClick={closeModal}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-roTeal mb-4">Make a Donation</h2>
        <p className="text-roTeal text-lg mb-4">
          Enter the amount you would like to donate (in ETH):
        </p>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter amount in ETH"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={preventInvalidInput}
            min="0.001"
            step="any"
            className={`w-full px-4 py-2 font-bold border rounded-md text-center focus:outline-none no-arrows ${
              !isValid
                ? "border-2 border-red-500 text-red-500"
                : "text-roTeal focus:ring-2 focus:ring-roSeaGreen"
            }`}
          />
          {!isValid && (
            <p className="text-red-500 text-sm">
              Please enter a value greater than 0.
            </p>
          )}
        </div>

        <Button label="Donate" variant="secondary" />
      </div>
    </div>
  );
};

export default DonationModal;
