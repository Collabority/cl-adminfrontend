import React, { useState } from "react";

const BasicInfoSection = ({ formData, setFormData }) => {
  const [tagInput, setTagInput] = useState("");

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    setFormData((prev) => ({
      ...prev,
      title,
      slug,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter" || e.key === "," || e.keyCode === 188) {
      e.preventDefault();
      const newTag = tagInput.replace(",", "").trim();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };
  return (
    <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
      <h2 className="text-xl font-semibold text-black">Basic Information</h2>

      {/* Title Input */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">
          Post Title *
        </label>
        <input
          required
          type="text"
          name="title"
          value={formData.title}
          onChange={handleTitleChange}
          placeholder="Enter your blog post title..."
          className="w-full border px-3 py-2 rounded border-gray-400 font-semibold text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* URL Slug Display */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">URL Slug</label>
        <div className="text-gray-600 flex items-center">
          <span className="pr-2 border border-gray-400 py-2 px-2 rounded-l-sm font-semibold">
            yoursite.com/blog/
          </span>
          <input
            type="text"
            readOnly
            className="bg-transparent font-semibold border border-gray-400  text-gray-600 px-2 py-2 w-[100%] rounded-r-sm  outline-none focus:ring-2 focus:ring-blue-500 "
            value={formData.slug}
            placeholder="auto-generated-from-title"
          />
        </div>
      </div>

      {/* Author & Category Dropdowns */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <label className="block font-medium text-gray-700 mb-1">
            Author *
          </label>
          <select
            name="author"
            required
            value={formData.author}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded border-gray-400 font-semibold outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Author</option>
            <option value="Lokeswara Rao">Lokeswara Rao</option>
            <option value="JohnDoe">John Doe</option>
            <option value="JaneSmith">Jane Smith</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            required
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded border-gray-400 font-semibold outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="technology">Technology</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="business">Business</option>
            <option value="tutorials">Tutorials</option>
          </select>
        </div>
      </div>

      {/* Tags Input */}
      <div>
        <label className="block font-medium text-gray-700 mb-1">Tags</label>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleTagInput}
          placeholder="Separate tags with commas (e.g., web development, javascript, react)"
          className="w-full placeholder:text-gray-500 border border-gray-400 font-semibold  px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-500 placeholder:text-gray-500 mt-1 font-semibold">
          Press Enter or comma to add tags
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;
