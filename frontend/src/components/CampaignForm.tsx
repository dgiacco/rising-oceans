"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";

import { useCreateCampaign } from "@/app/hooks/useCreateCampaign";
import Button from "./Button";
import TxModal from "./Modals/TxModal";
import SuccessModal from "./Modals/SuccessModal";

type NewCampaign = {
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
};

const CampaignForm = () => {
  const { address: owner } = useAccount();
  const { createCampaign, isConfirming, isConfirmed, isRejected, hash } =
    useCreateCampaign();

  const initialCampaignState = {
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "turtle",
  };

  const [newCampaign, setNewCampaign] =
    useState<NewCampaign>(initialCampaignState);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isTxPending, setIsTxPending] = useState(false);
  const [isTxConfirmed, setIsTxConfirmed] = useState(false);
  const [isTargetValid, setIsTargetValid] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setIsTxPending(isConfirming);
  }, [isConfirming]);

  useEffect(() => {
    if (isConfirmed) {
      setIsButtonDisabled(true);
      setIsTxConfirmed(true);
    }
  }, [isConfirmed]);

  useEffect(() => {
    setIsTxConfirmed(isConfirmed);
  }, [isConfirmed]);

  useEffect(() => {
    if (isRejected) {
      setIsButtonDisabled(true);
      setIsTxPending(false);
    }
  }, [isRejected]);

  useEffect(() => {
    const isFormValid =
      newCampaign.title.trim() !== "" &&
      newCampaign.description.trim() !== "" &&
      newCampaign.target.trim() !== "" &&
      parseFloat(newCampaign.target) > 0 &&
      newCampaign.deadline.trim() !== "" &&
      new Date(newCampaign.deadline) > new Date() &&
      newCampaign.image.trim() !== "";

    setIsButtonDisabled(!isFormValid);
  }, [newCampaign]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "target") {
      // Limit to 3 decimal places
      const regex = /^\d*\.?\d{0,3}$/;
      if (regex.test(value)) {
        setNewCampaign((prev) => ({ ...prev, [name]: value }));
        setIsTargetValid(parseFloat(value) > 0);
      }
    } else {
      setNewCampaign((prev) => ({
        ...prev,
        [name]:
          name === "title" || name === "description"
            ? value.charAt(0).toUpperCase() + value.slice(1)
            : value,
      }));
    }
  };

  const resetForm = () => {
    setNewCampaign(initialCampaignState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsButtonDisabled(true);

    const { title, description, target, deadline, image } = newCampaign;

    if (!title || !description || !target || !deadline || !image) {
      console.error("Please fill all fields.");
      setIsButtonDisabled(false);
      return;
    }

    // Convert ETH target to Wei
    const targetInWei = ethers.parseEther(target);

    // Convert deadline to timestamp
    const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);

    try {
      if (owner) {
        await createCampaign(
          owner,
          title,
          description,
          targetInWei,
          deadlineTimestamp,
          image
        );
      }
      resetForm();
    } catch (error) {
      console.error("Error creating campaign", error);
      setIsButtonDisabled(false);
    }
  };

  const inputLabel = "text-roSeaGreen mt-2 text-center";
  const formInput =
    "mt-1 p-2 bg-roAquaBlue/20 border border-2 border-roSeaGreen rounded-lg w-full text-roAquaBlue font-bold min-h-[40px]";
  const targetInput =
    "mt-1 p-2 bg-roAquaBlue/20 border border-2 rounded-lg w-full font-bold min-h-[40px]";

  const handleCloseModal = () => {
    setIsTxConfirmed(false);
    router.push("/home");
  };

  return (
    <>
      <SuccessModal
        isOpen={isTxConfirmed}
        title="Campaign created!"
        message="Your campaign was created successfully. You can view the details on Etherscan"
        txHash={hash}
        closeModal={() => handleCloseModal()}
      />
      <TxModal isOpen={isTxPending} />
      <div className="max-w-md mx-auto my-8 p-4 border border-2 border-roAquaBlue rounded-lg bg-transparent backdrop-blur">
        <h2 className="text-xl font-bold text-roAquaBlue text-center">
          Create a New Campaign
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className={inputLabel}>
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newCampaign.title}
              onChange={handleChange}
              required
              className={formInput}
              maxLength={25}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className={inputLabel}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newCampaign.description}
              onChange={handleChange}
              required
              className={formInput}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="target" className={inputLabel}>
              Target (ETH)
            </label>
            <input
              type="number"
              id="target"
              name="target"
              value={newCampaign.target}
              onChange={handleChange}
              required
              className={`${targetInput} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none focus:outline-none [&::-webkit-inner-spin-button]:appearance-none ${
                !isTargetValid && newCampaign.target !== ""
                  ? "border-2 border-red-500 text-red-500"
                  : "border-roSeaGreen text-roAquaBlue"
              }`}
              min="0.001"
              step="0.001"
            />
            {!isTargetValid && newCampaign.target !== "" && (
              <p className="text-red-500 text-sm">
                Please enter a value greater than 0.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="deadline" className={inputLabel}>
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={newCampaign.deadline}
              onChange={handleChange}
              required
              className={`${formInput} [&::-webkit-calendar-picker-indicator]:bg-roSeaGreen [&::-webkit-calendar-picker-indicator]:rounded-lg [&::-webkit-calendar-picker-indicator]:p-1 [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
              min={new Date().toISOString().split("T")[0]}
              style={{
                colorScheme: "dark",
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className={inputLabel}>
              Select Image
            </label>
            <select
              id="image"
              name="image"
              value={newCampaign.image}
              onChange={handleChange}
              required
              className={formInput}
            >
              <option value="turtle">Turtle</option>
              <option value="coral">Coral</option>
            </select>
          </div>
          <Button
            label="Create Campaign"
            type="submit"
            disabled={isButtonDisabled}
            variant="primary"
          />
        </form>
      </div>
    </>
  );
};

export default CampaignForm;
