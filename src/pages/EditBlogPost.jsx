import React, { useRef, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaSave, FaTelegramPlane, FaCloudUploadAlt } from "react-icons/fa";

const EditBlogPost = () => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "The Future of Web Development: Trends to Watch in 2025",
    category: "Technology",
    status: "published",
    publishDate: "2025-01-08",
    img: "https://www.kidpid.com/wp-content/uploads/2018/04/pexels-photo-546819.jpeg",
    desc: "Explore the latest trends and technologies shaping the future of web development, from AI integration to progressive web apps.",
  });

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
    console.log("Submitting service form with data:", Object.fromEntries(data));
  };

  const coverImage = () => (
    <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4 ">
      <h2 className="text-lg font-semibold text-black">Cover Image</h2>
      <div className="flex flex-col items-center gap-4 border-3 border-dashed border-gray-300 hover:border-[#1447E6] transition-all duration-300 p-8 sm:p-10 md:p-12 rounded-md text-center w-full">
        <FaCloudUploadAlt className="text-5xl text-gray-400" />
        <h2 className="text-lg font-semibold text-black">
          Upload Cover Image
        </h2>
        <h3 className="font-semibold text-gray-700 text-base">
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
              img: file,
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
        <p className="font-semibold text-base text-gray-500 mt-2">
          Recommended size: 1200x630px, Max file size: 5MB
        </p>
        {formData.img && (
          <img
            src={
              typeof formData.img === "string"
                ? formData.img
                : URL.createObjectURL(formData.img)
            }
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
        <h3 className="text-gray-700 font-semibold flex items-center text-lg">
          <MdOutlineKeyboardArrowRight className="text-xl sm:text-2xl" />
          <span className="ml-1">Edit Blog Post</span>
        </h3>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl font-semibold">Edit Blog Post</h1>
      <p className="text-gray-600 font-semibold text-base">
        Update the details below to edit and publish your service.
      </p>

      {/* Title and Category */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <label className="font-semibold text-gray-700 text-base">Title</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded border-gray-400 font-semibold text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <label className="font-semibold text-gray-700 text-base">Category</label>
        <select
          className="border border-gray-400 font-semibold text-gray-500 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
        >
          <option value="">Select Category</option>
          <option value="Technology">Technology</option>
          <option value="Design">Design</option>
          <option value="Business">Business</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      {coverImage()}

      {/* Description Field */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <h2 className="text-xl font-semibold text-black mb-2">Description</h2>
        <textarea
          rows={6}
          className="rounded-lg  min-h-[120px] w-full border px-3 py-2  border-gray-400 font-semibold text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.desc}
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
        />
      </div>

      {/* Publishing Options */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <label className="font-semibold text-gray-700 text-base">Publishing Status</label>
        <select
          className="border border-gray-400 rounded-lg px-3 py-2 font-semibold text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="scheduled">Scheduled</option>
        </select>
        <label className="font-semibold text-gray-700 text-base">Publish Date</label>
        <input
          type="date"
          className="border border-gray-400 font-semibold text-gray-500 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.publishDate}
          onChange={(e) =>
            setFormData({ ...formData, publishDate: e.target.value })
          }
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "draft")}
          name="draft"
          className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-white font-semibold text-base text-gray-600 cursor-pointer"
        >
          <FaSave className="text-sm text-gray-600" />
          Save Draft
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "published")}
          name="publish"
          className="flex items-center gap-2 border rounded-xl py-2 px-4  border-gray-300 bg-[#1447E6] font-semibold text-white text-base cursor-pointer hover:bg-[#0f36a8]"
        >
          <FaTelegramPlane className="text-sm" />
          Publish Service
        </button>
      </div>
    </form>
  );
};

export default EditBlogPost;