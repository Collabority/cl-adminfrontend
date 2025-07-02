import React from 'react';

const SEOSettingsSection = ({ formData, setFormData }) => {
  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div className="bg-white rounded-lg shadow flex flex-col gap-6 p-4">
      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-black">
        SEO Settings
      </h1>

      {/* Meta Title */}
      <div className="flex flex-col gap-1">
        <label className="block text-sm sm:text-base font-medium text-gray-700">
          Meta Title
        </label>
        <input
          type="text"
          value={formData.metaTitle}
          maxLength={60}
          onChange={handleChange('metaTitle')}
          className="w-full border px-3 py-2 rounded border-gray-300 font-semibold text-gray-700 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="SEO optimized title (60 characters max)"
        />
        <div className="text-xs sm:text-sm text-gray-500 font-medium text-right">
          {formData.metaTitle.length}/60 characters
        </div>
      </div>

      {/* Meta Description */}
      <div className="flex flex-col gap-1">
        <label className="block text-sm sm:text-base font-medium text-gray-700">
          Meta Description
        </label>
        <textarea
          value={formData.metaDescription}
          maxLength={160}
          onChange={handleChange('metaDescription')}
          className="w-full border px-3 py-2 rounded border-gray-300 font-semibold text-gray-700 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Brief description for search engines (160 characters max)"
          rows={3}
        />
        <div className="text-xs sm:text-sm text-gray-500 font-medium text-right">
          {formData.metaDescription.length}/160 characters
        </div>
      </div>

      {/* Focus Keyword */}
      <div className="flex flex-col gap-1">
        <label className="block text-sm sm:text-base font-medium text-gray-700">
          Focus Keyword
        </label>
        <input
          type="text"
          value={formData.focusKeyword}
          onChange={handleChange('focusKeyword')}
          className="w-full border px-3 py-2 rounded border-gray-300 font-semibold text-gray-700 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Primary keyword for this post"
        />
      </div>
    </div>
  );
};

export default SEOSettingsSection;
