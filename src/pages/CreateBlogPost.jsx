import React, { useRef } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaSave, FaTelegramPlane, FaCloudUploadAlt } from "react-icons/fa";
import BasicInfoSection from "../components/BasicInfoSection";
import CreateBlogContent from "../components/CreateBlogContent";
import SEOSettingsSection from "../components/SEOSettingsSection";
import PublishingOptionsSection from "../components/PublishingOptionsSection";
import { useCreateBlog } from "../hooks/FormHooks/useCreateBlog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Zod schema
const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().max(160, "Meta description max 160 chars").optional(),
  focusKeyword: z.string().optional(),
  status: z.enum(["draft", "published"]),
  publishDate: z.string().optional(),
  featured: z.boolean().optional(),
  allowComments: z.boolean().optional(),
  coverImage: z.any().nullable().optional(),
  content: z.string().min(20, "Content must be at least 20 characters"),
});

const CreateBlogPost = () => {
  const { createBlog, loading } = useCreateBlog();
  const fileInputRef = useRef(null);

  // ✅ hook-form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      slug: "",
      author: "",
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
    },
  });

  const coverImage = watch("coverImage");

  const onSubmit = async (data, status = "draft") => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "tags") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    formData.set("status", status);

    try {
      await createBlog(formData);
      console.log("Blog submitted successfully");
    } catch (err) {
      console.error("Error submitting blog:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-6 p-4"
      onSubmit={handleSubmit((data) => onSubmit(data))}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h3 className="text-base text-gray-700 font-semibold flex items-center">
          <MdOutlineKeyboardArrowRight className="text-xl sm:text-2xl" />
          <span className="ml-1">Create New Post</span>
        </h3>
      </div>

      <h1 className="text-2xl font-semibold">Create New Blog Post</h1>
      <p className="text-base text-gray-600 font-semibold">
        Fill in the details below to create and publish your blog post.
      </p>

      {/* Pass register, setValue, errors into child components */}
      <BasicInfoSection register={register} errors={errors} />
      {/* Cover Image */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4 ">
        <h1 className="text-2xl font-semibold text-black">Cover Image</h1>
        <div className="flex flex-col items-center gap-4 border-3 border-dashed border-gray-300 hover:border-blue-600 transition-all duration-300 p-8 sm:p-10 md:p-12 rounded-md text-center w-full">
          <FaCloudUploadAlt className="text-5xl text-gray-400" />
          <h2 className="text-2xl font-semibold text-black">Upload Cover Image</h2>
          <h3 className="font-semibold text-base text-gray-700">Click to browse Choose File</h3>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              if (!file.type.startsWith("image/")) {
                alert("Please select a valid image file.");
                return;
              }
              if (file.size > 5 * 1024 * 1024) {
                alert("File size should be less than 5MB.");
                return;
              }
              setValue("coverImage", file);
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="w-full sm:w-auto max-w-xs sm:max-w-none bg-blue-600 px-4 py-2 sm:px-6 sm:py-2 text-white text-sm sm:text-base font-semibold rounded-xl cursor-pointer hover:bg-blue-700 transition duration-200"
          >
            Choose file
          </button>
          {coverImage && (
            <img
              src={URL.createObjectURL(coverImage)}
              alt="Preview"
              className="mt-2 max-h-20 rounded-lg"
            />
          )}
        </div>
      </div>

      <CreateBlogContent register={register} errors={errors} />
      <SEOSettingsSection register={register} errors={errors} />
      <PublishingOptionsSection register={register} setValue={setValue} errors={errors} />

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
