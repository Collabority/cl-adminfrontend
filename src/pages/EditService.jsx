import React, { useRef, useState, useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaSave, FaTelegramPlane } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import QuillEditor from "../components/CreateBlogContent";
import { useParams, useNavigate } from "react-router-dom"; 
import instance from "../lib/axios";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(true); 

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    metaTitle: "",
    metaDescription: "",
    focusKeyword: "",
    status: "Draft",
    publishDate: "",
    coverImage: "",
    description: "",
    content: "", 
  });

  useEffect(() => {
    async function fetchServiceData() {
      try {
        setLoading(true);
        const response = await instance.get(`/services/${id}`);
        const data = response.data?.data || response.data; 

        if (data) {
          setFormData({
            title: data.title || "",
            category: data.category || "",
            metaTitle: data.metaData?.metaTitle || "",
            metaDescription: data.metaData?.metaDescription || "",
            focusKeyword: data.metaData?.focusKeyword || "",
            status: data.publishStatus || "Draft",
            publishDate: data.publishDate
              ? new Date(data.publishDate).toISOString().split("T")[0]
              : "",
            coverImage: data.coverImage || "",
            content: data.description || "",
            description: data.description || "",
          });
        }
      } catch (error) {
        console.error("Error fetching service data:", error);
        alert("Failed to load service data");
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchServiceData();
  }, [id]);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e, overrideStatus) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    // Send description matching backend expectations
    data.append("description", formData.content); 
    
    data.append("metaTitle", formData.metaTitle);
    data.append("metaDescription", formData.metaDescription);
    data.append("focusKeyword", formData.focusKeyword);
    data.append("publishDate", formData.publishDate);

    const rawStatus = overrideStatus || formData.status || "Draft";
    // Ensure standard formatting for status
    const formattedStatus = String(rawStatus).charAt(0).toUpperCase() + String(rawStatus).slice(1).toLowerCase();
    
    // Send key as "status" (or "publishStatus" if backend update expects that specifically, but "status" is safer usually)
    data.append("status", formattedStatus);

    if (formData.coverImage instanceof File) {
      data.append("coverImage", formData.coverImage);
    }

    try {
      await instance.put(`/services/update/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Update success");
      // Navigate back to Services list
      navigate("/services");
      
    } catch (error) {
      console.error("Error updating service:", error);
      alert(error.response?.data?.message || "Validation failed");
    }
  };

  // (Assuming no changes needed in UI, just logic)
  const coverImage = () => (
    <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4 ">
      <h1 className="text-xl font-semibold text-black">Cover Image</h1>
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

  if (loading) return <div className="p-8 text-center">Loading service data...</div>;

  return (
    <form className="flex flex-col gap-6 p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h3 className="text-gray-700 font-semibold flex items-center text-lg">
          <MdOutlineKeyboardArrowRight className="text-xl sm:text-2xl" />
          <span className="ml-1">Edit Service</span>
        </h3>
      </div>
      <h1 className="text-2xl font-semibold">Edit Service</h1>
      <p className="text-gray-600 font-semibold text-base">
        Update the details below to edit and publish your service.
      </p>
      
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <label className="font-semibold text-gray-700 text-base">Title</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <label className="font-semibold text-gray-700 text-base">
          Category
        </label>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
        >
          <option value="">Select Category</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Consulting">Consulting</option>
        </select>
      </div>
      
      {coverImage()}
      
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <h2 className="text-lg font-semibold text-black mb-2">Description</h2>
        <QuillEditor formData={formData} setFormData={setFormData} />
      </div>
      
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <label className="font-semibold text-gray-700 text-base">Meta Title</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={formData.metaTitle}
          onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
        />
        <label className="font-semibold text-gray-700 text-base">Meta Description</label>
        <textarea
          className="border border-gray-300 rounded-lg px-3 py-2 min-h-[80px]"
          value={formData.metaDescription}
          onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
        />
        <label className="font-semibold text-gray-700 text-base">Focus Keyword</label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={formData.focusKeyword}
          onChange={(e) => setFormData({ ...formData, focusKeyword: e.target.value })}
        />
      </div>
      
      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <label className="font-semibold text-gray-700 text-base">Publishing Status</label>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
        <label className="font-semibold text-gray-700 text-base">Publish Date</label>
        <input
          type="date"
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={formData.publishDate}
          onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
        />
      </div>
      
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
          className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-[#1447E6] font-semibold text-white text-base cursor-pointer hover:bg-[#0f36a8]"
        >
          <FaTelegramPlane className="text-sm" />
          Publish Service
        </button>
      </div>
    </form>
  );
};

export default EditService;