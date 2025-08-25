import React, { useRef } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaSave, FaTelegramPlane, FaCloudUploadAlt } from "react-icons/fa";
import QuillEditor from "../components/CreateBlogContent";
import { useCreateService } from "../hooks/servicesHooks/useCreateService";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Zod schema
const serviceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().max(160, "Meta description max 160 chars").optional(),
  focusKeyword: z.string().optional(),
  status: z.enum(["Draft", "Published"]),
  publishDate: z.string().optional(),
  coverImage: z.any().nullable().optional(),
  content: z.string().min(20, "Content must be at least 20 characters"),
});

const CreateService = () => {
  const { createService, loading } = useCreateService();
  const fileInputRef = useRef(null);

  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      category: "",
      metaTitle: "",
      metaDescription: "",
      focusKeyword: "",
      status: "Draft",
      publishDate: "",
      coverImage: null,
      content: "",
    },
  });

  const coverImage = watch("coverImage");
  const content = watch("content");

  const onSubmit = async (data, status = "draft") => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (key === "status") {
          formData.append(
            "status",
            status.charAt(0).toUpperCase() + status.slice(1)
          );
        } else {
          formData.append(key, value);
        }
      });

      await createService(formData);
      console.log("Service submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  // ✅ Cover Image Section
  const renderCoverImage = () => (
    <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4 ">
      <h2 className="text-lg font-semibold text-black mb-2">Cover Image</h2>
      <div className="flex flex-col items-center gap-4 border-3 border-dashed border-gray-300 hover:border-[#1447E6] transition-all duration-300 p-8 sm:p-10 md:p-12 rounded-md text-center w-full">
        <FaCloudUploadAlt className="text-5xl text-gray-400" />
        <h2 className="text-2xl font-semibold text-black">Upload Cover Image</h2>
        <h3 className="font-semibold text-base text-gray-700">
          Click to browse Choose File
        </h3>
        <input
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
            setValue("coverImage", file);
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="w-full sm:w-auto max-w-xs sm:max-w-none bg-[#1447E6] px-4 py-2 sm:px-6 sm:py-2 text-white text-sm sm:text-base font-semibold rounded-xl cursor-pointer hover:bg-[#0f36a8] transition duration-200"
        >
          Choose file
        </button>
        <p className="font-semibold text-base text-gray-500 mt-2">
          Recommended size: 1200x630px, Max file size: 5MB
        </p>
        {coverImage && (
          <img
            src={URL.createObjectURL(coverImage)}
            alt="Preview"
            className="mt-2 max-h-20 rounded-lg"
          />
        )}
      </div>
    </div>
  );

  return (
    <form className="flex flex-col gap-6 p-4" onSubmit={handleSubmit((data) => onSubmit(data))}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h3 className="text-base text-gray-700 font-semibold flex items-center">
          <MdOutlineKeyboardArrowRight className="text-xl sm:text-2xl" />
          <span className="ml-1">Create New Service</span>
        </h3>
      </div>

      <h1 className="text-2xl font-semibold">Create New Service</h1>
      <p className="text-base text-gray-600 font-semibold">
        Fill in the details below to create and publish your service.
      </p>

      {/* Basic Info */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <h2 className="text-xl font-semibold text-black mb-2">Basic Info</h2>

        <label className="font-semibold text-gray-700">Title</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2"
          {...register("title")}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

        <label className="font-semibold text-gray-700">Category</label>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2"
          {...register("category")}
        >
          <option value="">Select Category</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Consulting">Consulting</option>
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      {/* Cover Image */}
      {renderCoverImage()}

      {/* Description/Content */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <h2 className="text-lg font-semibold text-black mb-2">Description</h2>
        <QuillEditor
          value={content}
          onChange={(val) => setValue("content", val)}
        />
        {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
      </div>

      {/* SEO Settings */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <h2 className="text-lg font-semibold text-black mb-2">SEO Settings</h2>

        <label className="text-base font-semibold text-gray-700">Meta Title</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2"
          {...register("metaTitle")}
        />

        <label className="text-base font-semibold text-gray-700">Meta Description</label>
        <textarea
          className="border border-gray-300 rounded-lg px-3 py-2 min-h-[80px]"
          {...register("metaDescription")}
        />
        {errors.metaDescription && (
          <p className="text-red-500 text-sm">{errors.metaDescription.message}</p>
        )}

        <label className="text-base font-semibold text-gray-700">Focus Keyword</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2"
          {...register("focusKeyword")}
        />
      </div>

      {/* Publishing Options */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <h2 className="text-lg font-semibold text-black mb-2">Publishing Options</h2>

        <label className="text-base font-semibold text-gray-700">Publishing Status</label>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2"
          {...register("status")}
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>

        <label className="text-base font-semibold text-gray-700">Publish Date</label>
        <input
          type="date"
          className="border border-gray-300 rounded-lg px-3 py-2"
          {...register("publishDate")}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={handleSubmit((data) => onSubmit(data, "draft"))}
          className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-white font-semibold text-sm text-gray-600 sm:text-base cursor-pointer"
        >
          <FaSave className="text-sm text-gray-600" />
          Save Draft
        </button>
        <button
          type="button"
          onClick={handleSubmit((data) => onSubmit(data, "published"))}
          className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-[#1447E6] font-semibold text-white text-sm sm:text-base cursor-pointer hover:bg-[#0f36a8]"
        >
          <FaTelegramPlane className="text-sm" />
          Publish Service
        </button>
      </div>
    </form>
  );
};

export default CreateService;
