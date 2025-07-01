import React, { useState } from "react";
import * as Icons from "react-icons/fa6";

const iconOptions = [
  "FaCode",
  "FaMobileAlt",
  "FaBriefcase",
  "FaPaintBrush",
  "FaBullhorn",
  "FaChartLine",
  "FaRegLightbulb",
  "FaRegStar",
];

const categoryOptions = ["Development", "Design", "Consulting", "Marketing"];
const statusOptions = ["Published", "Draft"];

const ServiceForm = ({ onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState(
    initialData || {
      icon: iconOptions[0],
      title: "",
      description: "",
      category: categoryOptions[0],
      status: statusOptions[0],
    }
  );
  const [error, setError] = useState("");
  const IconPreview = Icons[form.icon] || Icons.FaRegQuestionCircle;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      setError("Title and Description are required.");
      return;
    }
    setError("");
    onSubmit({ ...form, id: initialData?.id || undefined });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">{initialData ? "Edit Service" : "Add New Service"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Icon</label>
            <div className="flex items-center gap-2">
              <select
                name="icon"
                value={form.icon}
                onChange={handleChange}
                className="border rounded px-2 py-1"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F8F6F3]">
                <IconPreview className="text-2xl text-[#008080]" />
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border rounded px-2 py-1 w-full"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-[#008080] text-white hover:bg-gray-900"
            >
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm; 