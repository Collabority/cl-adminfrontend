import React, { useState } from "react";
import TiptapEditor from "../components/EmailEditor";

const CreateCampaign = () => {
  const [formData, setFormData] = useState({
    campaignName: "",
    subjectLine: "",
    previewText: "",
    fromName: "Company Name",
    fromEmail: "newsletter@company.com",
    replyToEmail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 px-2 sm:px-4 pt-6 pb-2">
        <div className="flex items-center text-base font-semibold text-gray-700">
          <span>Create Campaign</span>
        </div>
      </div>
      <div className="flex-col gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Campaign Details
          </h2>

          {/* Campaign Name */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">
              Campaign Name
            </label>
            <input
              type="text"
              name="campaignName"
              value={formData.campaignName}
              onChange={handleChange}
              placeholder="Enter campaign name..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Subject Line */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">
              Subject Line
            </label>
            <input
              type="text"
              name="subjectLine"
              value={formData.subjectLine}
              onChange={handleChange}
              placeholder="Enter email subject..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Keep it under 50 characters for better open rates
            </p>
          </div>

          {/* Preview Text */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">
              Preview Text
            </label>
            <input
              type="text"
              name="previewText"
              value={formData.previewText}
              onChange={handleChange}
              placeholder="Enter preview text..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              This appears in email clients as a preview
            </p>
          </div>

          {/* From Name & From Email */}
          <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                From Name
              </label>
              <input
                type="text"
                name="fromName"
                value={formData.fromName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                From Email
              </label>
              <input
                type="email"
                name="fromEmail"
                value={formData.fromEmail}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Reply-To Email */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">
              Reply-To Email
            </label>
            <input
              type="email"
              name="replyToEmail"
              value={formData.replyToEmail}
              onChange={handleChange}
              placeholder="Enter reply-to email..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <TiptapEditor/>
      </div>
    </div>
  );
};

export default CreateCampaign;
