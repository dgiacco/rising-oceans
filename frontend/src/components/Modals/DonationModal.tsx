"use client";

import { ethers } from "ethers";
import { useState } from "react";

import { contractABI, contractAddress } from "@/app/utils/contractInfo";
import Button from "../Button";
import TxModal from "./TxModal";
import SuccessModal from "./SuccessModal";

type DonationModalProps = {
  isOpen: boolean;
  closeModal?: () => void;
  id: string | string[];
};

const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  closeModal,
  id,
}) => {
  const campaignId = Number(id);

  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isTxPending, setIsTxPending] = useState(false);
  const [isTxSuccessful, setIsTxSuccessful] = useState(false);
  const [currentHash, setCurrentHash] = useState("");

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Regular expression to match numbers with up to 3 decimal places
    const regex = /^(0(\.\d{0,3})?|[1-9]\d*(\.\d{0,3})?)$/;

    // Check if the value is valid (either empty or matches the regex)
    if (regex.test(value) || value === "") {
      setInputValue(value);

      if (parseFloat(value) > 0) {
        setIsValid(true);
        setIsButtonDisabled(false);
      } else {
        setIsValid(false);
        setIsButtonDisabled(true);
      }
    }
  };

  const preventInvalidInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const value = (e.currentTarget as HTMLInputElement).value;

    if (e.key === "-" || (value === "0" && e.key === "0")) {
      e.preventDefault();
    }
  };

  const handleDonate = async (campaignId: number) => {
    setIsButtonDisabled(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const amountInEther = ethers.parseEther(inputValue);

      const tx = await contract.donateToCampaign(campaignId, {
        value: amountInEther,
      });

      setIsTxPending(true);

      await tx.wait();
      const hash = tx.hash;
      setCurrentHash(hash);
      setIsButtonDisabled(false);
      setIsTxSuccessful(true);
    } catch (error) {
      console.error("Error donating:", error);
    } finally {
      setIsButtonDisabled(false);
      setIsTxPending(false);
    }
  };

  const handleCloseModal = () => {
    setIsTxSuccessful(false);
    if (closeModal) {
      closeModal();
    }
    location.reload();
  };

  return (
    <>
      <TxModal isOpen={isTxPending} />
      <SuccessModal
        isOpen={isTxSuccessful}
        title="Donation sent!"
        message="Your donation was sent succesfully. You can view the details on Etherscan"
        txHash={currentHash}
        closeModal={() => handleCloseModal()}
      />
      {!isTxPending && !isTxSuccessful && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="relative bg-sky-200 p-6 rounded-md shadow-lg max-w-sm text-center">
            <button
              className="absolute top-2 right-2 text-roTeal font-bold text-xl hover:text-roSeaGreen"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-roTeal mb-4">
              Make a Donation
            </h2>
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
                  !isValid && inputValue !== ""
                    ? "border-2 border-red-500 text-red-500"
                    : "text-roTeal focus:ring-2 focus:ring-roSeaGreen"
                }`}
              />
              {!isValid && inputValue !== "" && (
                <p className="text-red-500 text-sm">
                  Please enter a value greater than 0.
                </p>
              )}
            </div>

            <Button
              label="Donate"
              variant="secondary"
              onClick={() => handleDonate(campaignId)}
              disabled={isButtonDisabled}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DonationModal;
