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

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isTxPending, setIsTxPending] = useState(false);
  const [isTxConfirmed, setIsTxConfirmed] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsTxPending(isConfirming);
  }, [isConfirming]);

  useEffect(() => {
    if (isConfirmed) {
      setIsButtonDisabled(false);
      setIsTxConfirmed(true);
    }
  }, [isConfirmed]);

  useEffect(() => {
    setIsTxConfirmed(isConfirmed);
  }, [isConfirmed]);

  useEffect(() => {
    if (isRejected) {
      setIsButtonDisabled(false);
      setIsTxPending(false);
    }
  }, [isRejected]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setNewCampaign((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setNewCampaign(initialCampaignState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsButtonDisabled(true);

    const title = newCampaign.title;
    const description = newCampaign.description;
    const target = newCampaign.target;
    const deadline = newCampaign.deadline;
    const image = newCampaign.image;

    if (!title || !description || !target || !deadline || !image) {
      console.error("Please fill all fields.");
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
      console.error("Error creating campaing", error);
      setIsButtonDisabled(false);
    }
  };

  const inputLabel = "text-roSeaGreen mt-2 text-center";
  const formInput =
    "mt-1 p-2 border border-2 border-roSeaGreen rounded-lg w-full text-roTeal font-bold";

  const handleCloseModal = () => {
    setIsTxConfirmed(false);
    router.push("/home");
  };

  return (
    <>
      <SuccessModal
        isOpen={isTxConfirmed}
        title="Campaign created!"
        message="Your campaign was created succesfully. You can view the details on Etherscan"
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
              className={formInput}
            />
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
              className={formInput}
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
