import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaSave, FaTelegramPlane, FaCloudUploadAlt } from "react-icons/fa";
import QuillEditor from "../components/CreateBlogContent";

// Dummy data to simulate backend or context (replace with API/context in real app)
const mockServices = [
  {
    id: 1,
    title: "Web Development",
    category: "Development",
    metaTitle: "Web Development Services",
    metaDescription: "Custom website development services for businesses.",
    focusKeyword: "web development, IT services",
    status: "published",
    publishDate: "2025-01-15",
    coverImage:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    content: "We build custom websites tailored to your business needs.",
  },
  {
    id: 2,
    title: "Mobile App Development",
    category: "Development",
    metaTitle: "Mobile App Services",
    metaDescription: "iOS and Android app development services.",
    focusKeyword: "app development, mobile services",
    status: "published",
    publishDate: "2025-01-12",
    coverImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    content: "We create cross-platform mobile apps for your business.",
  },
  {
    id: 3,
    title: "Business Consulting",
    description: "Strategic business consultation",
    category: "Consulting",
    status: "Draft",
    date: "Jan 10, 2025",
    coverImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "UI/UX Design",
    description: "User interface and experience design",
    category: "Design",
    status: "Published",
    date: "Jan 8, 2025",
    coverImage:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
];

const EditService = () => {
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const service = mockServices.find((s) => s.id === parseInt(id));
    if (service) {
      setFormData({
        title: service.title,
        category: service.category,
        metaTitle: service.metaTitle,
        metaDescription: service.metaDescription,
        focusKeyword: service.focusKeyword,
        status: service.status,
        publishDate: service.publishDate,
        coverImage: service.coverImage,
        content: service.content,
      });
    }
  }, [id]);

  const handleButtonClick = () => fileInputRef.current.click();
  const navigate = useNavigate();

  const handleSubmit = (e, status = "draft") => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.set("status", status);

    console.log("Submitting service form with data:", Object.fromEntries(data));

    // TODO: Replace with actual API call to update the service
    // Simulating update and redirect
    setTimeout(() => {
      alert("Service updated successfully!");
      navigate("/services"); // Redirect back to services page
    }, 500);
  };

  const coverImage = () => (
    <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
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
            setFormData((prev) => ({
              ...prev,
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
        {formData?.coverImage && typeof formData.coverImage === "string" && (
          <img
            src={formData.coverImage}
            alt="Preview"
            className="mt-2 max-h-20 rounded-lg"
          />
        )}
        {formData?.coverImage instanceof File && (
          <img
            src={URL.createObjectURL(formData.coverImage)}
            alt="Preview"
            className="mt-2 max-h-20 rounded-lg"
          />
        )}
      </div>
    </div>
  );

  if (!formData)
    return (
      <div className="p-4 text-center font-semibold">Loading service...</div>
    );

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
        <label className="font-semibold text-gray-700 text-base">
          Meta Title
        </label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={formData.metaTitle}
          onChange={(e) =>
            setFormData({ ...formData, metaTitle: e.target.value })
          }
        />
        <label className="font-semibold text-gray-700 text-base">
          Meta Description
        </label>
        <textarea
          className="border border-gray-300 rounded-lg px-3 py-2 min-h-[80px]"
          value={formData.metaDescription}
          onChange={(e) =>
            setFormData({ ...formData, metaDescription: e.target.value })
          }
        />
        <label className="font-semibold text-gray-700 text-base">
          Focus Keyword
        </label>
        <input
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={formData.focusKeyword}
          onChange={(e) =>
            setFormData({ ...formData, focusKeyword: e.target.value })
          }
        />
      </div>

      <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
        <label className="font-semibold text-gray-700 text-base">
          Publishing Status
        </label>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <label className="font-semibold text-gray-700 text-base">
          Publish Date
        </label>
        <input
          type="date"
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={formData.publishDate}
          onChange={(e) =>
            setFormData({ ...formData, publishDate: e.target.value })
          }
        />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "draft")}
          className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-white font-semibold text-base text-gray-600"
        >
          <FaSave className="text-sm" />
          Save Draft
        </button>
        <button type="button" className="bg-blue-600 text-white p-2 rounded-md cursor-pointer" onClick={(e) => handleSubmit(e, "draft")}>
          Save Draft
        </button>

        <button type="button" className="bg-blue-600 text-white p-2 rounded-md cursor-pointer" onClick={(e) => handleSubmit(e, "published")}>
          Publish Service
        </button>
      </div>
    </form>
  );
};

export default EditService;
