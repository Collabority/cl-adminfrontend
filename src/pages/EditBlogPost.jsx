import React, { useRef, useState, useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaSave, FaTelegramPlane, FaCloudUploadAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom"; 
import instance from "../lib/axios";

const EditBlogPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { post } = location.state || {};

  const fileInputRef = useRef(null);

  // 2. Redirect if no post data found (prevents white screen/crash)
  useEffect(() => {
    if (!post) {
      alert("No post data found. Redirecting to dashboard.");
      navigate("/blog"); 
    }
  }, [post, navigate]);

  // 3. Initialize state safely
  const [formData, setFormData] = useState({
    title: post?.title || "",
    category: post?.category || "",
    status: post?.status || "draft",
    publishedDate: post?.publishedDate ? post.publishedDate.split("T")[0] : "",
    coverImage: post?.coverImage || "",
    content: post?.content || "",
    metaTitle: post?.metaTitle || "",
    metaDescription: post?.metaDescription || "",
    focusKeyword: post?.focusKeyword || "",
  });

  useEffect(() => {
    const fetchFullBlogDetails = async () => {
      // Safety check: ensure we have an ID
      const blogId = post?._id || post?.id;
      if (!blogId) return;

      try {
        // Call the backend to get the SPECIFIC blog (which includes SEO tags)
        const response = await instance.get(`/blogs/blog/${blogId}`);
        const fullData = response.data.data; // Access the data from ApiResponse

        // Update the form with the real data from the database
        setFormData((prev) => ({
          ...prev,
          title: fullData.title,
          category: fullData.category,
          status: fullData.status,
          content: fullData.content,
          publishedDate: fullData.publishedDate ? fullData.publishedDate.split("T")[0] : "",
          metaTitle: fullData.metaTitle || "",
          metaDescription: fullData.metaDescription || "",
          focusKeyword: fullData.focusKeyword || "",
          coverImage: fullData.coverImage || prev.coverImage,
        }));
      } catch (error) {
        console.error("Failed to fetch full blog details", error);
      }
    };

    fetchFullBlogDetails();
  }, [post]);

  const [loading, setLoading] = useState(false);

  // If no post, return null while redirecting
  if (!post) return null;

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e, status = "draft") => {
    e.preventDefault();
    setLoading(true);

    // ---------------------------------------------------------
    // 1. NEW VALIDATION BLOCK
    // If trying to PUBLISH, check if SEO fields are filled.
    // The backend WILL throw a 500 error if these are missing.
    // ---------------------------------------------------------
    if (status === "published") {
      if (
        !formData.metaTitle?.trim() ||
        !formData.metaDescription?.trim() ||
        !formData.focusKeyword?.trim()
      ) {
        alert(
          "Validation Failed: To Publish, you MUST fill in the SEO Settings (Meta Title, Description, and Focus Keyword)."
        );
        setLoading(false);
        return; // STOP execution here
      }
    }

    try {
      const data = new FormData();

      // Append standard text fields
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("status", status);
      data.append("content", formData.content);
      
      // Ensure we send strings, even if empty (though validation above catches published case)
      data.append("metaTitle", formData.metaTitle || "");
      data.append("metaDescription", formData.metaDescription || "");
      data.append("focusKeyword", formData.focusKeyword || "");
      data.append("publishedDate", formData.publishedDate);

      // Only append coverImage if it is a NEW file
      if (formData.coverImage instanceof File) {
        data.append("coverImage", formData.coverImage);
      }

      // Explicitly set headers for FormData
      const blogId = post._id || post.id;
      
      await instance.put(`/blogs/update/${blogId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        }, 
      });

      alert(`Blog post ${status === 'published' ? 'published' : 'saved'} successfully!`);
      navigate("/blog"); 
      
    } catch (error) {
      console.error("Error submitting the form:", error);
      const backendMessage = error.response?.data?.message || error.message;
      alert(`Error: ${backendMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const coverImage = () => (
    <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4 ">
      <h2 className="text-lg font-semibold text-black">Cover Image</h2>
      <div className="flex flex-col items-center gap-4 border-3 border-dashed border-gray-300 hover:border-[#1447E6] transition-all duration-300 p-8 sm:p-10 md:p-12 rounded-md text-center w-full">
        <FaCloudUploadAlt className="text-5xl text-gray-400" />
        <h2 className="text-lg font-semibold text-black">Upload Cover Image</h2>
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
        <p className="font-semibold text-base text-gray-500 mt-2">
          Recommended size: 1200x630px, Max file size: 5MB
        </p>
        {formData.coverImage && (
          <img
            src={
              typeof formData.coverImage === "string"
                ? formData.coverImage
                : URL.createObjectURL(formData.coverImage)
            }
            alt="Preview"
            className="mt-2 max-h-20 rounded-lg"
          />
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-b-4 mb-4"></div>
        <span className="text-lg font-semibold text-blue-700">Saving...</span>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-6 p-4">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h3 className="text-gray-700 font-semibold flex items-center text-lg">
          <MdOutlineKeyboardArrowRight className="text-xl sm:text-2xl" />
          <span className="ml-1">Edit Blog Post</span>
        </h3>
      </div>

      <h1 className="text-2xl font-semibold">Edit Blog Post</h1>
      
      {/* TITLE & CATEGORY */}
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
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="Technology">Technology</option>
          <option value="Design">Design</option>
          <option value="Business">Business</option>
          <option value="Marketing">Marketing</option>
          <option value="Tutorials">Tutorials</option>
        </select>
      </div>

      {coverImage()}

      {/* CONTENT */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <h2 className="text-xl font-semibold text-black mb-2">Description</h2>
        <textarea
          rows={6}
          className="rounded-lg min-h-[120px] w-full border px-3 py-2 border-gray-400 font-semibold text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
      </div>

      {/* SEO SETTINGS */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <h2 className="text-xl font-semibold text-black mb-2">SEO Settings</h2>

        <label className="font-semibold text-gray-700 text-base">Meta Title</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded border-gray-400 font-semibold text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.metaTitle}
          onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
        />

        <label className="font-semibold text-gray-700 text-base">Meta Description</label>
        <textarea
          rows={4}
          className="rounded-lg w-full border px-3 py-2 border-gray-400 font-semibold text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.metaDescription}
          onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
        />

        <label className="font-semibold text-gray-700 text-base">Focus Keyword</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded border-gray-400 font-semibold text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.focusKeyword}
          onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
        />
      </div>

      {/* STATUS & DATE */}
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
          value={formData.publishedDate}
          onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
        />
      </div>

      {/* BUTTONS */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "draft")}
          className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-white font-semibold text-base text-gray-600"
          disabled={loading}
        >
          <FaSave className="text-sm text-gray-600" /> Save Draft
        </button>

        <button
          type="button"
          onClick={(e) => handleSubmit(e, "published")}
          className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-[#1447E6] font-semibold text-white text-base hover:bg-[#0f36a8]"
          disabled={loading}
        >
          <FaTelegramPlane className="text-sm" /> Publish Service
        </button>
      </div>
    </form>
  );
};

export default EditBlogPost;