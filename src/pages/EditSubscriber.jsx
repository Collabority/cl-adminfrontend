import React, { useState, useEffect } from "react";

const EditSubscriber = ({ subscriber, onSave, onCancel, isLoading }) => {
  // Helper to split name back into First/Last
  const splitName = (fullName = "") => {
    const parts = fullName.split(" ");
    return {
      first: parts[0] || "",
      last: parts.slice(1).join(" ") || "",
    };
  };

  const { first, last } = splitName(subscriber?.name);

  // 1. Initialize State with Subscriber Data
  const [formData, setFormData] = useState({
    firstName: first,
    lastName: last,
    email: subscriber?.email || "",
    phone: subscriber?.phone || "",
    company: subscriber?.company || "",
    jobTitle: subscriber?.jobTitle || "",
    location: subscriber?.location || "",
  });

  const [subscriptionStatus, setSubscriptionStatus] = useState(
    subscriber?.status?.toLowerCase() || "active"
  );
  
  // Use existing segments or default
  const [segments, setSegments] = useState(subscriber?.allSegments || []); 
  const [source, setSource] = useState(subscriber?.source || "");
  const [tags, setTags] = useState(subscriber?.tags?.join(", ") || "");
  
  const [emailFrequency, setEmailFrequency] = useState(
    subscriber?.preferences?.frequency || "Weekly"
  );
  const [contentInterests, setContentInterests] = useState(
    subscriber?.preferences?.interests || []
  );
  const [notes, setNotes] = useState(subscriber?.notes || "");

  // --- Handlers ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSegmentChange = (segment) => {
    setSegments((prev) =>
      prev.includes(segment)
        ? prev.filter((s) => s !== segment)
        : [...prev, segment]
    );
  };

  const interests = [
    "Blog Posts",
    "Industry Updates",
    "Promotions",
    "Product News",
    "Events",
    "Case Studies",
  ];

  const handleCheckboxChange = (interest) => {
    setContentInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Capitalize status for backend enum
    const formattedStatus = subscriptionStatus.charAt(0).toUpperCase() + subscriptionStatus.slice(1);

    const updatedPayload = {
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      status: formattedStatus,
      // Logic: If segments exist, pick first as primary, else default
      segment: segments.length > 0 ? segments[0] : (subscriber?.segment || "General"),
      allSegments: segments,
      source,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      preferences: {
        frequency: emailFrequency,
        interests: contentInterests,
      },
      notes,
    };

    onSave(subscriber._id, updatedPayload);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 px-2 sm:px-4 pt-6 pb-2">
        <button 
          onClick={onCancel}
          className="flex items-center text-base font-semibold text-gray-700 hover:text-blue-600 transition"
        >
          <span>Newsletter</span>
          <svg className="mx-2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-black font-bold">Edit Subscriber</span>
        </button>
      </div>

      <div className="p-4 flex-col gap-6">
        <h1 className="text-xl font-semibold">Edit Subscriber</h1>
        <p className="font-medium text-base text-gray-500">
          Update details for {formData.email}
        </p>

        <form id="edit-form" onSubmit={handleSubmit} className="mt-10 bg-white border border-gray-200 rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-semibold">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
            </div>
          </div>
        </form>

        <div className="p-4 mt-6 bg-white rounded-md shadow">
          {/* Status */}
          <div className="mb-4">
            <h1 className="font-medium text-xl mb-4">Subscription Settings</h1>
            <p className="font-medium mb-2">Subscription Status</p>
            {["active", "pending", "unsubscribed"].map((status) => (
              <label key={status} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={subscriptionStatus === status}
                  onChange={() => setSubscriptionStatus(status)}
                  className="mr-2"
                />
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </label>
            ))}
          </div>

          {/* Segments */}
          <div className="mb-4">
            <p className="font-medium mb-2">Segments</p>
            {["Customers", "Prospects", "General Newsletter", "Product Updates", "Marketing Campaigns"].map((seg) => (
              <label key={seg} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={seg}
                  checked={segments.includes(seg)}
                  onChange={() => handleSegmentChange(seg)}
                  className="mr-2"
                />
                {seg}
              </label>
            ))}
          </div>

          {/* Source */}
          <div className="mb-4">
            <p className="font-medium mb-2">Subscription Source</p>
            <select value={source} onChange={(e) => setSource(e.target.value)} className="w-full border rounded px-3 py-2">
              <option value="">Select source</option>
              <option value="Website">Website Form</option>
              <option value="Referral">Referral</option>
              <option value="Manual">Manual Entry</option>
              <option value="Event">Event Registration</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <p className="font-medium mb-2">Tags</p>
            <input type="text" placeholder="Enter tags separated by commas..." value={tags} onChange={(e) => setTags(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
        </div>

        {/* Preferences */}
        <div className="p-6 bg-white rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4">Communication Preferences</h2>
          <div className="mb-6">
            <p className="font-medium mb-2">Email Frequency</p>
            {["Daily", "Weekly", "Monthly", "Custom"].map((freq) => (
              <div key={freq} className="flex items-center mb-1">
                <input type="radio" name="frequency" value={freq} checked={emailFrequency === freq} onChange={() => setEmailFrequency(freq)} className="mr-2" />
                <label>{freq}</label>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <p className="font-medium mb-2">Content Interests</p>
            <div className="grid grid-cols-2 gap-y-2">
              {interests.map((interest) => (
                <label key={interest} className="flex items-center space-x-2">
                  <input type="checkbox" value={interest} checked={contentInterests.includes(interest)} onChange={() => handleCheckboxChange(interest)} />
                  <span>{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Notes</p>
            <textarea placeholder="Add any additional notes..." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4} />
          </div>
        </div>

        <div className="p-6 flex gap-6 items-center justify-end bg-white rounded-lg shadow-md">
          <button type="button" onClick={onCancel} className="p-2 border rounded-md border-gray-500 min-w-[100px]">Cancel</button>
          <button type="submit" form="edit-form" disabled={isLoading} className="bg-blue-500 p-2 rounded-md text-white font-medium min-w-[150px] disabled:bg-blue-300">
            {isLoading ? "Updating..." : "Update Subscriber"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSubscriber;