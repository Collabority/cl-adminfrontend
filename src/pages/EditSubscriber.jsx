import React, { useState } from "react";

const EditSubscriber = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const [subscriptionStatus, setSubscriptionStatus] = useState("active");
  const [segments, setSegments] = useState([]);
  const [source, setSource] = useState("");
  const [tags, setTags] = useState("");

  const handleSegmentChange = (segment) => {
    setSegments((prev) =>
      prev.includes(segment)
        ? prev.filter((s) => s !== segment)
        : [...prev, segment]
    );
  };

  const [emailFrequency, setEmailFrequency] = useState("Weekly");
  const [contentInterests, setContentInterests] = useState([]);
  const [notes, setNotes] = useState("");

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
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 px-2 sm:px-4 pt-6 pb-2">
        <div className="flex items-center text-base font-semibold text-gray-700">
          <span>Newsletter</span>
          <svg
            className="mx-2 w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="text-black font-bold">Edit Subscriber</span>
        </div>
      </div>
      <div className="p-4 flex-col gap-6">
        <h1 className="text-xl font-semibold">Edit Subscriber</h1>
        <p className="font-medium text-base text-gray-500">
          Edit individual subscribers 
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-10 bg-white border border-gray-200 rounded-xl p-6 space-y-6"
        >
          <h2 className="text-xl font-semibold">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name..."
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name..."
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address..."
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be the primary contact email
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                name="company"
                placeholder="Enter company name..."
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                placeholder="Enter job title..."
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="City, Country"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
        </form>

        <div className="p-4 mt-6 bg-white rounded-md shadow">
          {/* Subscription Status */}
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
                {status === "active"
                  ? "Active"
                  : status === "pending"
                  ? "Pending Confirmation"
                  : "Unsubscribed"}
              </label>
            ))}
          </div>

          {/* Segments */}
          <div className="mb-4">
            <p className="font-medium mb-2">Segments</p>
            {[
              "Customers",
              "Prospects",
              "General Newsletter",
              "Product Updates",
              "Marketing Campaigns",
            ].map((seg) => (
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

          {/* Subscription Source */}
          <div className="mb-4">
            <p className="font-medium mb-2">Subscription Source</p>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select source</option>
              <option value="website">Website Form</option>
              <option value="referral">Referral</option>
              <option value="csv_import">CSV Import</option>
              <option value="manual">Manual Entry</option>
              <option value="event">Event Registration</option>
              <option value="manual">Manual Entry</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <p className="font-medium mb-2">Tags</p>
            <input
              type="text"
              placeholder="Enter tags separated by commas..."
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <p className="text-xs text-gray-500 mt-3 pl-4">
              Use tags to organize and filter subscribers
            </p>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Communication Preferences
          </h2>

          <div className="mb-6">
            <p className="font-medium mb-2">Email Frequency</p>
            {["Daily", "Weekly", "Monthly", "Custom"].map((freq) => (
              <div key={freq} className="flex items-center mb-1">
                <input
                  type="radio"
                  name="frequency"
                  value={freq}
                  checked={emailFrequency === freq}
                  onChange={() => setEmailFrequency(freq)}
                  className="mr-2"
                />
                <label>{freq}</label>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <p className="font-medium mb-2">Content Interests</p>
            <div className="grid grid-cols-2 gap-y-2">
              {interests.map((interest) => (
                <label key={interest} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={interest}
                    checked={contentInterests.includes(interest)}
                    onChange={() => handleCheckboxChange(interest)}
                  />
                  <span>{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Notes</p>
            <textarea
              placeholder="Add any additional notes about this subscriber..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
            />
          </div>
        </div>
        <div className="p-6 flex gap-6 items-center">
              <button className="p-2 border rounded-md border-gray-500">Cancel</button>
              <button className="p-2 border rounded-md border-gray-500">Save As Draft</button>
              <button className="bg-blue-500 p-2 rounded-md text-white font-medium">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default EditSubscriber;
