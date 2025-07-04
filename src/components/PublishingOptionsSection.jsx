import React from "react";

const PublishingOptionsSection = ({ formData, setFormData }) => {
  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
    
  };

  return (
    <div className="bg-white rounded-lg shadow px-4 py-6 sm:px-6 md:px-8 lg:px-10 flex flex-col gap-6">
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-black">
        Publishing Options
      </h1>

      {/* Status and Publish Date */}
      <div className="flex flex-col md:flex-row gap-5">
        {/* Status */}
        <div className="flex flex-col gap-1 w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={formData.status}
            onChange={handleChange("status")}
            className="w-full border px-3 py-2 rounded border-gray-300 text-gray-700 font-semibold outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>

        {/* Publish Date */}
        <div className="flex flex-col gap-1 w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">
            Publish Date
          </label>
          <input
            type="datetime-local"
            value={formData.publishDate}
            onChange={handleChange("publishDate")}
            className="w-full border px-3 py-2 rounded border-gray-300 text-gray-700 font-semibold outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Featured Post */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <label className="text-sm text-gray-900 font-medium">
            Featured Post
          </label>
          <label className="text-sm text-gray-700 font-medium">
            Display this post prominently on the homepage
          </label>
        </div>
        {/* Toggle */}
        <label className="relative inline-block w-11 h-6">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={handleChange("featured")}
            className="opacity-0 w-0 h-0"
          />
          <span
            className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition duration-300 ${
              formData.featured ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-md transform transition duration-300 ${
                formData.featured ? "translate-x-5" : "translate-x-0"
              }`}
            ></span>
          </span>
        </label>
      </div>

      {/* Allow Comments */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <label className="text-sm text-gray-900 font-medium">
            Allow Comments
          </label>
          <label className="text-sm text-gray-700 font-medium">
            Enable readers to comment on this post
          </label>
        </div>
        {/* Toggle */}
        <label className="relative inline-block w-11 h-6">
          <input
            type="checkbox"
            checked={formData.allowComments}
            onChange={handleChange("allowComments")}
            className="opacity-0 w-0 h-0"
          />
          <span
            className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition duration-300 ${
              formData.allowComments ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-md transform transition duration-300 ${
                formData.allowComments ? "translate-x-5" : "translate-x-0"
              }`}
            ></span>
          </span>
        </label>
      </div>
    </div>
  );
};

export default PublishingOptionsSection;