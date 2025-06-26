import React, { useRef, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaSave, FaEye } from "react-icons/fa";
import BasicInfoSection from "../components/BasicInfoSection";
import { FaCloudUploadAlt } from "react-icons/fa";

const CreateBlogPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author: "",
    category: "",
    tags: [],
  });

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const coverImage = () => (
    <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4 ">
      <h1 className="text-xl font-semibold text-black">Cover Image</h1>
      <div className="flex flex-col items-center gap-4 border-3 border-dashed border-gray-300 p-8 sm:p-10 md:p-12 rounded-md hover:border-blue-600 transition-all duration-300 text-center w-full">
        <FaCloudUploadAlt className="text-5xl text-gray-400" />
        <h2 className="text-black text-xl sm:text-2xl font-semibold">
          Upload Cover Image
        </h2>
        <h3 className="font-semibold text-gray-700 text-sm sm:text-base">
          Drag and drop an image here, or click to browse Choose File
        </h3>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => console.log(e.target.files[0])} // Optional: handle file
        />

        <button
          type="button"
          onClick={handleButtonClick}
          className="bg-blue-600 rounded text-white text-sm sm:text-base py-2 px-6 font-semibold hover:bg-blue-700 transition cursor-pointer"
        >
          Choose file
        </button>

        <p className="font-semibold text-[13px] text-gray-500 mt-2">
          Recommended size: 1200x630px, Max file size: 5MB
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 p-4 ">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h3 className="text-gray-700 font-semibold flex items-center text-sm">
          <MdOutlineKeyboardArrowRight className="text-xl sm:text-2xl" />
          <span className="ml-1">Create New Post</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-white font-semibold text-sm text-gray-600 sm:text-base">
            <FaSave className="text-sm text-gray-600" />
            Save Draft
          </button>
          <button className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-gray-800 font-semibold text-white text-sm sm:text-base">
            <FaEye className="text-sm" />
            Preview
          </button>
        </div>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-semibold">
        Create New Blog Post
      </h1>
      <p className="text-gray-600 font-semibold text-sm md:text-lg">
        Fill in the details below to create and publish your blog post.
      </p>

      {/* Basic Information Form */}
      <BasicInfoSection formData={formData} setFormData={setFormData} />

      {/* cover image */}
      {coverImage()}
    </div>
  );
};

export default CreateBlogPost;
