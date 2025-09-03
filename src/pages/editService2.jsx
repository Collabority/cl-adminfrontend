import React, { useRef, useState, useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaSave, FaTelegramPlane, FaCloudUploadAlt } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import instance from "../lib/axios";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    metaTitle: "",
    metaDescription: "",
    focusKeyword: "",
    status: "Draft",
    publishDate: new Date().toISOString().split("T")[0],
    coverImage: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;

    async function fetchServiceData() {
      setLoading(true);
      try {
        const resp = await instance.get(`/services/${id}`);
        const data = resp?.data?.data || {};
        if (!mounted) return;

        setFormData((prev) => ({
          ...prev,
          title: data.title || prev.title,
          category: data.category || prev.category,
          metaTitle: data.metaData.metaTitle || prev.metaTitle,
          metaDescription:
            data.metaData.metaDescription || prev.metaDescription,
          focusKeyword: data.metaData.focusKeyword || prev.focusKeyword,
          status:
            data.status && typeof data.status === "string"
              ? capitalizeStatus(data.status)
              : prev.status,
          publishDate: data.publishDate
            ? formatDateForInput(data.publishDate)
            : prev.publishDate,
          coverImage:
            data.coverImage || data.img || data.image || prev.coverImage,
          content: data.content || data.description || prev.content,
        }));
      } catch (err) {
        console.error("Error fetching service data:", err);
        if (mounted) setError("Failed to load service data.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchServiceData();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleButtonClick = () => fileInputRef.current?.click();

  function capitalizeStatus(s) {
    if (!s) return "Draft";
    const low = s.toLowerCase();
    if (low === "published" || low === "publish") return "Published";
    return "Draft";
  }

  function formatDateForInput(d) {
    try {
      return new Date(d).toISOString().split("T")[0];
    } catch {
      return new Date().toISOString().split("T")[0];
    }
  }

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
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
    setFormData((prev) => ({ ...prev, coverImage: file }));
  };

  // --- added: drag & drop handlers for nicer picker (previous style) ---
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      if (!file.type.startsWith("image/")) {
        alert("Please drop a valid image file.");
        return;
      }
      if (file.size > maxSize) {
        alert("File size should be less than 5MB.");
        return;
      }
      setFormData((prev) => ({ ...prev, coverImage: file }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  // --- end added ---

  const handleSubmit = async (e, targetStatus = null) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = new FormData();
      // append fields - ensure strings for non-files
      payload.append("title", formData.title || "");
      payload.append("category", formData.category || "");
      payload.append("metaTitle", formData.metaTitle || "");
      payload.append("metaDescription", formData.metaDescription || "");
      payload.append("focusKeyword", formData.focusKeyword || "");
      payload.append("status", targetStatus ? targetStatus : formData.status);
      payload.append("publishDate", formData.publishDate || "");
      payload.append("content", formData.content || "");

      if (formData.coverImage instanceof File) {
        payload.append("coverImage", formData.coverImage);
      } else if (
        typeof formData.coverImage === "string" &&
        formData.coverImage
      ) {
        // some backends accept a url field
        payload.append("coverImageUrl", formData.coverImage);
      }

      const resp = await instance.put(`/services/${id}`, payload);

      if (resp?.data?.success === false) {
        throw new Error(resp?.data?.message || "Save failed");
      }

      navigate("/services", { replace: true });
    } catch (err) {
      console.error("Error submitting service:", err);
      setError(err?.message || "Failed to save service.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-b-4 border-gray-200 mr-4" />
        <div>
          <div className="text-lg font-semibold">Loading service...</div>
          {error && <div className="text-sm text-red-600 mt-1">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-6 p-4" onSubmit={(e) => handleSubmit(e)}>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h3 className="text-gray-700 font-semibold flex items-center text-lg">
          <MdOutlineKeyboardArrowRight className="text-xl sm:text-2xl" />
          <span className="ml-1">Edit Service</span>
        </h3>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl font-semibold">Edit Service</h1>
      <p className="text-gray-600 font-semibold text-base">
        Update the details below to edit and publish your service.
      </p>

      {/* Title and Category */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-4 p-4">
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

      {/* Cover Image */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-4 p-4">
        <h2 className="text-lg font-semibold text-black">Cover Image</h2>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full max-w-2xl mx-auto border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center gap-4 bg-gray-50 hover:border-blue-400 transition"
        >
          <div className="flex flex-col items-center gap-3">
            <FaCloudUploadAlt className="text-5xl text-gray-400" />
            <div className="text-lg font-semibold text-gray-800">
              Click or drag image to upload
            </div>
            <div className="text-sm text-gray-500">
              Recommended: 1200×630px · JPG/PNG · Max 5MB
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
          />

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleButtonClick}
              className="inline-flex items-center gap-2 bg-[#1447E6] text-white px-4 py-2 rounded-md hover:bg-[#0f36a8]"
            >
              Choose file
            </button>
            {formData.coverImage && (
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, coverImage: "" }))
                }
                className="inline-flex items-center gap-2 border px-3 py-2 rounded-md text-sm"
              >
                Remove
              </button>
            )}
          </div>

          {formData.coverImage && (
            <div className="w-full flex justify-center mt-4">
              <img
                src={
                  typeof formData.coverImage === "string"
                    ? formData.coverImage
                    : URL.createObjectURL(formData.coverImage)
                }
                alt="Preview"
                className="max-h-48 rounded-lg shadow object-cover"
                style={{ width: "100%", maxWidth: 720 }}
              />
            </div>
          )}

          {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
        </div>
      </div>

      {/* Content / Description (simple textarea instead of rich editor) */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-4 p-4">
        <h2 className="text-lg font-semibold text-black mb-2">Description</h2>
        <textarea
          className="border border-gray-300 rounded-lg px-3 py-2 min-h-[140px]"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          placeholder="Enter service description..."
          required
        />
      </div>

      {/* SEO Settings */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-4 p-4">
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

      {/* Publishing Options */}
      <div className="bg-white rounded-lg shadow flex flex-col gap-4 p-4">
        <label className="font-semibold text-gray-700 text-base">
          Publishing Status
        </label>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
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

      {/* Buttons aligned right */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "Draft")}
          name="draft"
          disabled={saving}
          className="flex items-center gap-2 border rounded-xl py-2 px-4 border-gray-300 bg-white font-semibold text-base text-gray-600 cursor-pointer"
        >
          <FaSave className="text-sm text-gray-600" />
          Save Draft
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "Published")}
          name="publish"
          disabled={saving}
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
