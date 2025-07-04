import React, { useRef, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaSave, FaTelegramPlane } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import QuillEditor from "../components/CreateBlogContent";

const EditService = () => {
  // Prefilled mock data for demonstration
  const [formData, setFormData] = useState({
    title: "Web Development",
    category: "Development",
    metaTitle: "Web Development Services",
    metaDescription: "Custom website development services for businesses.",
    focusKeyword: "web development, IT services",
    status: "published",
    publishDate: "2025-01-15",
    coverImage: null,
    content: "We build custom websites tailored to your business needs.",
  });

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e, status = "draft") => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.set("status", status);
    // Replace this with your actual API call
    console.log("Submitting service form with data:", Object.fromEntries(data));
  };

  const coverImage = () => (
    <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4 ">
      <h1 className="text-xl font-semibold text-black">Cover Image</h1>
      <div className="flex flex-col items-center gap-4 border-3 border-dashed border-gray-300 hover:border-[#1447E6] transition-all duration-300 p-8 sm:p-10 md:p-12 rounded-md text-center w-full">
        <FaCloudUploadAlt className="text-5xl text-gray-400" />
        <h2 className="text-black text-xl sm:text-2xl font-semibold">
          Upload Cover Image
        </h2>
        <h3 className="font-semibold text-gray-700 text-sm sm:text-base">
          Click to browse Choose File
        </h3>
        <input
          name="coverImage"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            const maxSize = 5 * 1024 * 1024;
            if (!file.type.startsWith("image/")) {
              alert("Please select a valid image file.");
              return;
            }
            if (file.size > maxSize) {
              alert("File size should be less than 5MB.");
              return;
            }
            setFormData((prevData) => ({
              ...prevData,
              coverImage: file,
            }));
          }}
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="w-full sm:w-auto max-w-xs sm:max-w-none bg-[#1447E6] px-4 py-2 sm:px-6 sm:py-2 text-white text-sm sm:text-base font-semibold rounded-xl cursor-pointer hover:bg-[#0f36a8] transition duration-200"
        >
          Choose file
        </button>
        <p className="font-semibold text-[13px] text-gray-500 mt-2">
          Recommended size: 1200x630px, Max file size: 5MB
        </p>
        {formData.coverImage && (
          <img
            src={URL.createObjectURL(formData.coverImage)}
            alt="Preview"
            className="mt-2 max-h-20 rounded-lg"
          />
        )}
      </div>
    </div>
  );

  return (
    <form className="flex flex-col gap-6 p-4" >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h3 className="text-gray-700 font-semibold flex items-center text-sm">
          <MdOutlineKeyboardArrowRight className="text-xl sm:text-2xl" />
          <span className="ml-1">Edit Service</span>
        </h3>
      </div>
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-semibold">
        Edit Service
      </h1>
      <p className="text-gray-600 font-semibold text-sm md:text-lg">
        Update the details below to edit and publish your service.
      </p>
      {/* Title and Category */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <label className="font-semibold text-gray-700">Title</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <label className="font-semibold text-gray-700">Category</label>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={formData.category}
          onChange={e => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Consulting">Consulting</option>
        </select>
      </div>
      {coverImage()}
      {/* Content/Description */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <h2 className="text-xl font-semibold text-black mb-2">Description</h2>
        <QuillEditor formData={formData} setFormData={setFormData} />
      </div>
      {/* SEO Settings */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <label className="font-semibold text-gray-700">Meta Title</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={formData.metaTitle}
          onChange={e => setFormData({ ...formData, metaTitle: e.target.value })}
        />
        <label className="font-semibold text-gray-700">Meta Description</label>
        <textarea
          className="border border-gray-300 rounded-lg px-3 py-2 min-h-[80px]"
          value={formData.metaDescription}
          onChange={e => setFormData({ ...formData, metaDescription: e.target.value })}
        />
        <label className="font-semibold text-gray-700">Focus Keyword</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={formData.focusKeyword}
          onChange={e => setFormData({ ...formData, focusKeyword: e.target.value })}
        />
      </div>
      {/* Publishing Options */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <label className="font-semibold text-gray-700">Publishing Status</label>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={formData.status}
          onChange={e => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <label className="font-semibold text-gray-700">Publish Date</label>
        <input
          type="date"
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={formData.publishDate}
          onChange={e => setFormData({ ...formData, publishDate: e.target.value })}
        />
      </div>
      {/* Buttons aligned right */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={e => handleSubmit(e, "draft")}
          name="draft"
          className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-white font-semibold text-sm text-gray-600 sm:text-base cursor-pointer"
        >
          <FaSave className="text-sm text-gray-600" />
          Save Draft
        </button>
        <button
          type="button"
          onClick={e => handleSubmit(e, "published")}
          name="publish"
          className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-[#1447E6] font-semibold text-white text-sm sm:text-base cursor-pointer hover:bg-[#0f36a8]"
        >
          <FaTelegramPlane className="text-sm" />
          Publish Service
        </button>
      </div>
    </form>
  );
};

export default EditService; 