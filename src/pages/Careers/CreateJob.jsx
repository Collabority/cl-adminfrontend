// src/pages/CreateJob.jsx
import React, { useState } from 'react';

const CreateJob = () => {
  const [form, setForm] = useState({
    title: '',
    department: '',
    type: '',
    location: '',
    level: '',
    minSalary: '',
    maxSalary: '',
    summary: '',
    responsibilities: '',
    qualifications: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8"> {/* Responsive padding */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"> {/* Stack on small, row on sm+ */}
        <h1 className="text-xl sm:text-2xl font-semibold">Create New Job Opening</h1> {/* Responsive font size */}
        <div className="flex gap-2 w-full sm:w-auto justify-end"> {/* Full width on small, auto on sm+, justify-end */}
          <button className="border px-4 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 w-1/2 sm:w-auto">Save Draft</button> {/* Responsive width */}
          <button className="bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium w-1/2 sm:w-auto">Preview</button> {/* Responsive width */}
        </div>
      </div>

      {/* Job Information Card */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-6"> {/* Responsive padding */}
        <h2 className="text-lg font-semibold mb-4">Job Information</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Job Title *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g., Senior Frontend Developer"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4"> {/* Changed to 1 col on xs, 2 on sm, 3 on lg */}
          <div>
            <label className="block text-sm font-medium mb-1">Department *</label>
            <select name="department" value={form.department} onChange={handleChange} className="border rounded px-3 py-2 text-sm w-full">
              <option>Select Department</option>
              <option>Engineering</option>
              <option>Design</option>
              <option>Marketing</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Job Type *</label>
            <select name="type" value={form.type} onChange={handleChange} className="border rounded px-3 py-2 text-sm w-full">
              <option>Select Type</option>
              <option>Full-time</option>
              <option>Part-time</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location *</label>
            <select name="location" value={form.location} onChange={handleChange} className="border rounded px-3 py-2 text-sm w-full">
              <option>Select Location</option>
              <option>Remote</option>
              <option>Onsite</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Experience Level</label>
            <select name="level" value={form.level} onChange={handleChange} className="border rounded px-3 py-2 text-sm w-full">
              <option>Select Level</option>
              <option>Intern</option>
              <option>Junior</option>
              <option>Mid</option>
              <option>Senior</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Min Salary</label>
            <input
              type="text"
              name="minSalary"
              placeholder="$ 50000"
              value={form.minSalary}
              onChange={handleChange}
              className="border rounded px-3 py-2 text-sm w-full text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Max Salary</label>
            <input
              type="text"
              name="maxSalary"
              placeholder="$ 80000"
              value={form.maxSalary}
              onChange={handleChange}
              className="border rounded px-3 py-2 text-sm w-full text-gray-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Period</label>
          <select className="border rounded px-3 py-2 text-sm w-full">
            <option>Yearly</option>
            <option>Monthly</option>
            <option>Hourly</option>
          </select>
        </div>
      </div>

      {/* Job description */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-6"> {/* Responsive padding */}
        <h2 className="text-lg font-semibold mb-4">Job Description</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Job Summary *</label>
          <textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="Brief overview of the role and what the candidate will be doing..."
            className="w-full border rounded px-3 py-2 text-sm text-gray-500"
            rows={3}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Key Responsibilities *</label>
          <textarea
            name="responsibilities"
            value={form.responsibilities}
            onChange={handleChange}
            placeholder={`• Develop and maintain web applications using modern frameworks\n• Collaborate with design and product teams\n• Write clean, maintainable code\n• Participate in code reviews`}
            className="w-full border rounded px-3 py-2 text-sm whitespace-pre-line text-gray-500"
            rows={5}
          />
          <p className="text-xs text-gray-500 mt-1">Use bullet points for better readability</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Requirements & Qualifications *</label>
          <textarea
            name="qualifications"
            value={form.qualifications}
            onChange={handleChange}
            placeholder={`• Bachelor's degree in Computer Science or related field\n• 3+ years of experience with React/Vue.js\n• Strong knowledge of JavaScript, HTML, CSS\n• Experience with version control (Git)`}
            className="w-full border rounded px-3 py-2 text-sm whitespace-pre-line text-gray-500"
            rows={5}

          />
        </div>
      </div>

    {/* Benefits & Perks */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-6"> {/* Responsive padding */}
        <h2 className="text-lg font-semibold mb-4">Benefits & Perks</h2>

        <div>
          <label className="block text-sm font-medium mb-1">What We offer</label>
          <textarea
            name="qualifications" // Note: This textarea is currently bound to 'qualifications' state. You might want a separate state for 'benefits'.
            value={form.qualifications}
            onChange={handleChange}
            placeholder={`• Competitive salary and equity package\n• Health, Dental, and Vision Insurance\n• Flexible work arrangements\n• Unlimited PTO Policy`}
            className="w-full border rounded px-3 py-2 text-sm whitespace-pre-line text-gray-500"
            rows={5}
          />
        </div>
      </div>

      <div className="bg-white border rounded-lg p-4 sm:p-6 mt-6"> {/* Responsive padding */}
        <h2 className="text-lg font-semibold mb-6">Application Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"> {/* Already responsive grid */}
            {/* Application Deadline */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline *</label>
            <input
                type="date"
                className="w-full border rounded-lg px-4 py-2 text-sm text-gray-900"
                placeholder="dd/mm/yyyy"
            />
            </div>

            {/* Hiring Manager */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Manager</label>
            <select className="w-full border rounded-lg px-4 py-2 text-sm text-gray-900">
                <option>Select Manager</option>
                <option>Jane Doe</option>
                <option>John Smith</option>
            </select>
            </div>
        </div>

        {/* Application Instructions */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Application Instructions</label>
            <textarea
            rows={3}
            className="w-full border rounded-lg px-4 py-2 text-sm text-gray-500"
            placeholder="Please submit your resume, cover letter, and portfolio. Include links to your GitHub and any relevant projects."
            />
        </div>
        </div>

        <div className="bg-white border rounded-lg p-4 sm:p-6 mt-6"> {/* Responsive padding */}
            <h2 className="text-lg font-semibold mb-6">Publishing Options</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"> {/* Already responsive grid */}
                {/* Status */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full border rounded-lg px-4 py-2 text-sm text-gray-900">
                    <option>Draft</option>
                    <option>Active</option>
                    <option>Paused</option>
                    <option>Closed</option>
                </select>
                </div>

                {/* Publish Date */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
                <input
                    type="datetime-local"
                    className="w-full border rounded-lg px-4 py-2 text-sm text-gray-900"
                    placeholder="dd/mm/yyyy"
                />
                </div>
            </div>

            {/* Featured Job Toggle */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <label className="block text-sm font-medium text-gray-900">Featured Job</label>
                <p className="text-sm text-gray-500 mb-2">Display this job prominently on the careers page</p>
            </div>

            {/* External Applications Toggle */}
            <div className="bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-900">External Applications</label>
                <p className="text-sm text-gray-500 mb-2">Allow applications through external job boards</p>
            </div>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end mt-6">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700 w-full sm:w-auto">
                Create Job Opening
            </button>
        </div>
    </div>
  );
};

export default CreateJob;