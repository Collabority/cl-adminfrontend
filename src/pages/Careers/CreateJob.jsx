import React, { useState, useEffect } from "react";
import { useJobPost } from "../../hooks/JobHooks/useJopPost";
import { useSelector } from "react-redux";

const initialForm = {
  title: "",
  department: "",
  jobType: "",
  jobLocation: "",
  experienceLevel: "",
  minSalary: "",
  maxSalary: "",
  jobPeriod: "",
  description: "",
  keyResponsibities: "",
  jobRequirements: "",
  perks: "",
  hiringManager: "",
  instructions: "",
  status: "",
  expiresAt: "",
  featured: false,
  externalApplication: false,
};

const CreateJob = () => {
  const [form, setForm] = useState(initialForm);
  const { postJob, loading } = useJobPost();
  const { admin } = useSelector((state) => state.auth.user);

  // Set hiringManager to current user _id on mount
  useEffect(() => {
    if (admin && admin._id) {
      setForm((prev) => ({
        ...prev,
        hiringManager: admin._id,
      }));
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToggle = (field) => {
    setForm((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postJob(form);
  };

  if (loading) {
    return <div className="text-center text-gray-500">Posting job...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold">Create New Job Opening</h1>
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <button className="border px-4 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 w-1/2 sm:w-auto">
            Save Draft
          </button>
          <button className="bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium w-1/2 sm:w-auto">
            Preview
          </button>
        </div>
      </div>
      {/* Job Information Card */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Job Information</h2>
        <div className="mb-4">
          <label className="block text-base font-medium mb-1">
            Job Title *
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g., Senior Frontend Developer"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-base font-medium mb-1">
              Department *
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="border rounded px-3 py-2 text-sm w-full"
            >
              <option value="">Select Department</option>

              <option value="cloud">Cloud & DevOps</option>
              <option value="dev">Software Development</option>
              <option value="data">Data & Analytics</option>
              <option value="cyber">Cybersecurity</option>
              <option value="consult">Consulting & Strategy</option>
              <option value="infra">Infrastructure & Ops</option>
            </select>
          </div>
          <div>
            <label className="block text-base font-medium mb-1">
              Job Type *
            </label>
            <select
              name="jobType"
              value={form.jobType}
              onChange={handleChange}
              className="border rounded px-3 py-2 text-sm w-full"
            >
              <option value="">Select Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>
          <div>
            <label className="block text-base font-medium mb-1">
              Location *
            </label>
            <select
              name="jobLocation"
              value={form.jobLocation}
              onChange={handleChange}
              className="border rounded px-3 py-2 text-sm w-full"
            >
              <option value="">Select Location</option>
              <option value="Remote">Remote</option>
              <option value="Onsite">Onsite</option>
            </select>
          </div>
          <div>
            <label className="block text-base font-medium mb-1">
              Experience Level
            </label>
            <select
              name="experienceLevel"
              value={form.experienceLevel}
              onChange={handleChange}
              className="border rounded px-3 py-2 text-sm w-full"
            >
              <option value="">Select Level</option>
              <option value="Intern">Intern</option>
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
          <div>
            <label className="block text-base font-medium mb-1">
              Min Salary
            </label>
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
            <label className="block text-base font-medium mb-1">
              Max Salary
            </label>
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
          <label className="block text-base font-medium mb-1">Period</label>
          <select
            name="jobPeriod"
            value={form.jobPeriod}
            onChange={handleChange}
            className="border rounded px-3 py-2 text-sm w-full"
          >
            <option value="">Select Period</option>
            <option value="Yearly">Yearly</option>
            <option value="Monthly">Monthly</option>
            <option value="Hourly">Hourly</option>
          </select>
        </div>
      </div>
      {/* Job description */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Job Description</h2>
        <div className="mb-6">
          <label className="block text-base font-medium mb-1">
            Job Summary *
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Brief overview of the role and what the candidate will be doing..."
            className="w-full border rounded px-3 py-2 text-sm text-gray-500"
            rows={3}
          />
        </div>
        <div className="mb-6">
          <label className="block text-base font-medium mb-1">
            Key Responsibilities *
          </label>
          <textarea
            name="keyResponsibities"
            value={form.keyResponsibities}
            onChange={handleChange}
            placeholder={`• Develop and maintain web applications using modern frameworks\n• Collaborate with design and product teams\n• Write clean, maintainable code\n• Participate in code reviews`}
            className="w-full border rounded px-3 py-2 text-sm whitespace-pre-line text-gray-500"
            rows={5}
          />
          <p className="text-xs text-gray-500 mt-1">
            Use bullet points for better readability
          </p>
        </div>
        <div>
          <label className="block text-base font-medium mb-1">
            Requirements & Qualifications *
          </label>
          <textarea
            name="jobRequirements"
            value={form.jobRequirements}
            onChange={handleChange}
            placeholder={`• Bachelor's degree in Computer Science or related field\n• 3+ years of experience with React/Vue.js\n• Strong knowledge of JavaScript, HTML, CSS\n• Experience with version control (Git)`}
            className="w-full border rounded px-3 py-2 text-sm whitespace-pre-line text-gray-500"
            rows={5}
          />
        </div>
      </div>
      {/* Benefits & Perks */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Benefits & Perks</h2>
        <div>
          <label className="block text-base font-medium mb-1">
            What We Offer
          </label>
          <textarea
            name="perks"
            value={form.perks}
            onChange={handleChange}
            placeholder={`• Competitive salary and equity package\n• Health, Dental, and Vision Insurance\n• Flexible work arrangements\n• Unlimited PTO Policy`}
            className="w-full border rounded px-3 py-2 text-sm whitespace-pre-line text-gray-500"
            rows={5}
          />
        </div>
      </div>
      <div className="bg-white border rounded-lg p-4 sm:p-6 mt-6">
        <h2 className="text-lg font-semibold mb-6">Application Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Application Deadline */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Application Deadline *
            </label>
            <input
              type="date"
              name="expiresAt"
              value={form.expiresAt}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 text-sm text-gray-900"
              placeholder="dd/mm/yyyy"
            />
          </div>
          {/* Hiring Manager (blocked to current user) */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Hiring Manager
            </label>
            <input
              type="text"
              name="hiringManager"
              value={admin && admin.name ? admin.name : ""}
              readOnly
              className="w-full border rounded-lg px-4 py-2 text-sm text-gray-500 bg-gray-100"
              placeholder="Current User"
            />
            {/* Hidden field for _id */}
            <input
              type="hidden"
              name="hiringManager"
              value={form.hiringManager}
            />
          </div>
        </div>
        {/* Application Instructions */}
        <div>
          <label className="block text-base font-medium text-gray-700 mb-1">
            Application Instructions
          </label>
          <textarea
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg px-4 py-2 text-sm text-gray-500"
            placeholder="Please submit your resume, cover letter, and portfolio. Include links to your GitHub and any relevant projects."
          />
        </div>
      </div>
      <div className="bg-white border rounded-lg p-4 sm:p-6 mt-6">
        <h2 className="text-lg font-semibold mb-6">Publishing Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Status */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 text-sm text-gray-900"
            >
              <option value="">Select Status</option>
              <option value="Draft">Draft</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          {/* Publish Date */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Publish Date
            </label>
            <input
              type="datetime-local"
              className="w-full border rounded-lg px-4 py-2 text-sm text-gray-900"
              placeholder="dd/mm/yyyy"
            />
          </div>
        </div>
        {/* Featured Job Toggle */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 flex items-center justify-between">
          <div>
            <label className="block text-base font-medium text-gray-900">
              Featured Job
            </label>
            <p className="text-base text-gray-500 mb-2">
              Display this job prominently on the careers page
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleToggle("featured")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              form.featured
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {form.featured ? "Enabled" : "Disabled"}
          </button>
        </div>
        {/* External Applications Toggle */}
        <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
          <div>
            <label className="block text-base font-medium text-gray-900">
              External Applications
            </label>
            <p className="text-base text-gray-500 mb-2">
              Allow applications through external job boards
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleToggle("externalApplication")}
            className={`px-4 py-2 rounded-lg font-semibold ${
              form.externalApplication
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {form.externalApplication ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>
      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700 w-full sm:w-auto"
        >
          Create Job Opening
        </button>
      </div>
    </div>
  );
};

export default CreateJob;
