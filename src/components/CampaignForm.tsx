"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useCreateCampaign } from "@/app/hooks/useCreateCampaign";

type NewCampaign = {
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
};

const CampaignForm = () => {
  const { address: owner } = useAccount();
  const { createCampaign } = useCreateCampaign();

  const [newCampaign, setNewCampaign] = useState<NewCampaign>({
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "turtle",
  });

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

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Create a New Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="target"
            className="block text-sm font-medium text-gray-700"
          >
            Target (ETH)
          </label>
          <input
            type="number"
            id="target"
            name="target"
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="deadline"
            className="block text-sm font-medium text-gray-700"
          >
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Select Image
          </label>
          <select
            id="image"
            name="image"
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="turtle">Turtle</option>
            <option value="coral">Coral</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
        >
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default CampaignForm;
