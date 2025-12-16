import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TiptapEditor from "../components/EmailEditor";
import instance from "../lib/axios";


const CreateCampaign = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 1. Initialize State correctly
  const [formData, setFormData] = useState({
    campaignName: "",
    subjectLine: "",
    previewText: "",
    fromName: "Company Name",
    fromEmail: "newsletter@company.com",
    replyToEmail: "",
  });

  // State to hold HTML from the editor
  const [editorContent, setEditorContent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2. Callback function passed to child component
  const handleEditorChange = (html) => {
    setEditorContent(html);
  };

  const handleSubmit = async () => {
    if (!formData.campaignName || !formData.subjectLine || !editorContent) {
      alert("Please fill in Campaign Name, Subject Line, and Email Content.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        content: editorContent, // Send the HTML content
      };

      await instance.post("/campaigns/create", payload);
      alert("Campaign Created Successfully!");
      navigate("/newsletter");
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Failed to create campaign.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 px-2 sm:px-4 pt-6 pb-2">
        <div className="flex items-center text-base font-semibold text-gray-700">
          <span>Create Campaign</span>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 bg-white rounded-lg text-gray-700 hover:bg-gray-50">
            Save as Draft
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Campaign Details</h2>

          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">Campaign Name</label>
            <input
              type="text"
              name="campaignName"
              value={formData.campaignName}
              onChange={handleChange}
              placeholder="Enter campaign name..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">Subject Line</label>
            <input
              type="text"
              name="subjectLine"
              value={formData.subjectLine}
              onChange={handleChange}
              placeholder="Enter email subject..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">Preview Text</label>
            <input
              type="text"
              name="previewText"
              value={formData.previewText}
              onChange={handleChange}
              placeholder="Enter preview text..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">From Name</label>
              <input
                type="text"
                name="fromName"
                value={formData.fromName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">From Email</label>
              <input
                type="email"
                name="fromEmail"
                value={formData.fromEmail}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">Reply-To Email</label>
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

        {/* 3. Pass the prop to TiptapEditor */}
        <TiptapEditor onContentChange={handleEditorChange} />
      </div>
    </div>
  );
};

export default CreateCampaign;