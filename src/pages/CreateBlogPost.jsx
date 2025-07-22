import React, { useRef, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaSave, FaTelegramPlane } from "react-icons/fa";
import BasicInfoSection from "../components/BasicInfoSection";
import { FaCloudUploadAlt } from "react-icons/fa";
import CreateBlogContent from "../components/CreateBlogContent";
import SEOSettingsSection from "../components/SEOSettingsSection";
import PublishingOptionsSection from "../components/PublishingOptionsSection";
import { useCreateBlog } from "../hooks/FormHooks/useCreateBlog";
import { useSelector } from "react-redux";

const CreateBlogPost = () => {
  const { createBlog, loading } = useCreateBlog();
  

  // console.log(admin);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    author:"",
    category: "",
    tags: [],
    metaTitle: "",
    metaDescription: "",
    focusKeyword: "",
    status: "draft",
    publishDate: "",
    featured: false,
    allowComments: true,
    coverImage: null,
    content: "",
  });

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleSubmit = async (e, status = "draft") => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "tags") {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    });

    data.set("status", status);

    try {
      await createBlog(data); // ← call your hook's function
      console.log("Blog submitted successfully");
      // Optionally: navigate or show success toast
    } catch (err) {
      console.error("Error submitting blog:", err);
    }
  };

  const coverImage = () => (
    <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4 ">
      <h1 className="text-2xl font-semibold text-black">Cover Image</h1>
      <div className="flex flex-col items-center gap-4 border-3 border-dashed border-gray-300 hover:border-blue-600 transition-all duration-300 p-8 sm:p-10 md:p-12 rounded-md text-center w-full">
        <FaCloudUploadAlt className="text-5xl text-gray-400" />
        <h2 className="text-2xl font-semibold text-black">
          Upload Cover Image
        </h2>
        <h3 className="font-semibold text-base text-gray-700">
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
          className="w-full sm:w-auto max-w-xs sm:max-w-none bg-blue-600 px-4 py-2 sm:px-6 sm:py-2 text-white text-sm sm:text-base font-semibold rounded-xl cursor-pointer hover:bg-blue-700 transition duration-200"
        >
          Choose file
        </button>

        <p className="font-semibold text-base text-gray-500 mt-2">
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
    <form className="flex flex-col gap-6 p-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h3 className="text-base text-gray-700 font-semibold flex items-center">
          <MdOutlineKeyboardArrowRight className="text-xl sm:text-2xl" />
          <span className="ml-1">Create New Post</span>
        </h3>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl font-semibold">Create New Blog Post</h1>
      <p className="text-base text-gray-600 font-semibold">
        Fill in the details below to create and publish your blog post.
      </p>

      {/* Form Sections */}
      <BasicInfoSection formData={formData} setFormData={setFormData} />
      {coverImage()}
      <CreateBlogContent formData={formData} setFormData={setFormData} />
      <SEOSettingsSection formData={formData} setFormData={setFormData} />
      <PublishingOptionsSection formData={formData} setFormData={setFormData} />

      {/* Buttons aligned right */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "draft")}
          name="draft"
          className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-white font-semibold text-sm text-gray-600 sm:text-base cursor-pointer"
        >
          <FaSave className="text-sm text-gray-600" />
          Save Draft
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "published")}
          name="publish"
          className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-blue-600 font-semibold text-white text-sm sm:text-base cursor-pointer"
        >
          <FaTelegramPlane className="text-sm" />
          Publish Post
        </button>
      </div>
    </form>
  );
};

export default CreateBlogPost;
