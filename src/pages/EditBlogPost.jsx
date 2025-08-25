import React, { useRef } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaSave, FaTelegramPlane, FaCloudUploadAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Zod Schema
const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  category: z.string().nonempty("Category is required"),
  status: z.enum(["draft", "published", "scheduled"]),
  publishDate: z.string().nonempty("Publish date is required"),
  desc: z.string().min(10, "Description must be at least 10 characters long"),
  img: z.any().optional(), // File validation is handled separately
});

const EditBlogPost = () => {
  const fileInputRef = useRef(null);

  // ✅ React Hook Form with Zod
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "The Future of Web Development: Trends to Watch in 2025",
      category: "Technology",
      status: "published",
      publishDate: "2025-01-08",
      img: "https://www.kidpid.com/wp-content/uploads/2018/04/pexels-photo-546819.jpeg",
      desc: "Explore the latest trends and technologies shaping the future of web development, from AI integration to progressive web apps.",
    },
  });

  const formData = watch(); // watch values like useState did

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const onSubmit = (data, status = "draft") => {
    const formDataObj = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });
    formDataObj.set("status", status);
    console.log("Submitting service form with data:", Object.fromEntries(formDataObj));
  };

  const coverImage = () => (
    <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4 ">
      <h2 className="text-lg font-semibold text-black">Cover Image</h2>
      <div className="flex flex-col items-center gap-4 border-3 border-dashed border-gray-300 hover:border-[#1447E6] transition-all duration-300 p-8 sm:p-10 md:p-12 rounded-md text-center w-full">
        <FaCloudUploadAlt className="text-5xl text-gray-400" />
        <h2 className="text-lg font-semibold text-black">Upload Cover Image</h2>
        <h3 className="font-semibold text-gray-700 text-base">Click to browse Choose File</h3>
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
            setValue("img", file);
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
            src={typeof formData.img === "string" ? formData.img : URL.createObjectURL(formData.img)}
            alt="Preview"
            className="mt-2 max-h-20 rounded-lg"
          />
        )}
      </div>
    </div>
  );

  return (
    <form className="flex flex-col gap-6 p-4" onSubmit={handleSubmit((data) => onSubmit(data, "published"))}>
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
          {...register("title")}
          className="w-full border px-3 py-2 rounded border-gray-400 font-semibold text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        <label className="font-semibold text-gray-700 text-base">Category</label>
        <select
          {...register("category")}
          className="border border-gray-400 font-semibold text-gray-500 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
          <option value="Technology">Technology</option>
          <option value="Design">Design</option>
          <option value="Business">Business</option>
          <option value="Marketing">Marketing</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      {coverImage()}

      {/* Description Field */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <h2 className="text-xl font-semibold text-black mb-2">Description</h2>
        <textarea
          rows={6}
          {...register("desc")}
          className="rounded-lg min-h-[120px] w-full border px-3 py-2 border-gray-400 font-semibold text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.desc && <p className="text-red-500 text-sm">{errors.desc.message}</p>}
      </div>

      {/* Publishing Options */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <label className="font-semibold text-gray-700 text-base">Publishing Status</label>
        <select
          {...register("status")}
          className="border border-gray-400 rounded-lg px-3 py-2 font-semibold text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="scheduled">Scheduled</option>
        </select>

        <label className="font-semibold text-gray-700 text-base">Publish Date</label>
        <input
          type="date"
          {...register("publishDate")}
          className="border border-gray-400 font-semibold text-gray-500 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.publishDate && <p className="text-red-500 text-sm">{errors.publishDate.message}</p>}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={handleSubmit((data) => onSubmit(data, "draft"))}
          name="draft"
          className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-white font-semibold text-base text-gray-600 cursor-pointer"
        >
          <FaSave className="text-sm text-gray-600" />
          Save Draft
        </button>
        <button
          type="submit"
          name="publish"
          className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-[#1447E6] font-semibold text-white text-base cursor-pointer hover:bg-[#0f36a8]"
        >
          <FaTelegramPlane className="text-sm" />
          Publish Service
        </button>
      </div>
    </form>
  );
};

export default EditBlogPost;
