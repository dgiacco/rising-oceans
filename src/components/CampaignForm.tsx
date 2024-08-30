"use client";

import { useRef } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { useCreateCampaign } from "@/app/hooks/useCreateCampaign";

const CampaignForm = () => {
  const { address: owner } = useAccount();
  const { createCampaign } = useCreateCampaign();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const targetRef = useRef<HTMLInputElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const target = targetRef.current?.value;
    const deadline = deadlineRef.current?.value;
    const image = imageRef.current?.value;

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
            ref={titleRef}
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
            ref={descriptionRef}
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
            ref={targetRef}
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
            ref={deadlineRef}
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
            ref={imageRef}
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
