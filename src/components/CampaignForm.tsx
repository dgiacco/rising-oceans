"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useCreateCampaign } from "@/app/hooks/useCreateCampaign";
import Button from "./Button";
import TxModal from "./Modals/TxModal";

type NewCampaign = {
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
};

const CampaignForm = () => {
  const { address: owner } = useAccount();
  const { createCampaign, isConfirming, isConfirmed, hash } =
    useCreateCampaign();

  const [newCampaign, setNewCampaign] = useState<NewCampaign>({
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "turtle",
  });

  const [isTxPending, setIsTxPending] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setIsTxPending(isConfirming);
  }, [isConfirming]);

  useEffect(() => {
    setIsButtonDisabled(false);
  }, [isConfirmed]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isButtonDisabled);

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
    } catch (error) {
      console.error("Error creating campaing", error);
    }
  };

  const inputLabel = "text-roSeaGreen mt-2 text-center";
  const formInput =
    "mt-1 p-2 border border-2 border-roSeaGreen rounded-lg w-full text-roTeal font-bold";

  return (
    <>
      <TxModal isOpen={isTxPending} />
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed!</div>}
      <div className="max-w-md mx-auto mt-8 p-4 border border-2 border-roAquaBlue rounded-lg bg-transparent backdrop-blur">
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
          />
        </form>
      </div>
    </>
  );
};

export default CampaignForm;
