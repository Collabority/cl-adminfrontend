import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useJobPost } from "../../hooks/JobHooks/useJobPost";
import { useSelector } from "react-redux";

const jobSchema = z.object({
  title: z.string().min(1, "Job Title is required"),
  department: z.string().min(1, "Department is required"),
  jobType: z.string().min(1, "Job Type is required"),
  jobLocation: z.string().min(1, "Location is required"),
  experienceLevel: z.string().min(1, "Experience Level is required"),
  minSalary: z.string().optional().refine((val) => !val || !isNaN(Number(val)), {
    message: "Min Salary must be a valid number",
  }),
  maxSalary: z.string().optional().refine((val) => !val || !isNaN(Number(val)), {
    message: "Max Salary must be a valid number",
  }),
  jobPeriod: z.string().optional(),
  description: z.string().min(1, "Job Summary is required"),
  keyResponsibities: z.string().min(1, "Key Responsibilities are required"), // Revert to typo
  jobRequirements: z.string().min(1, "Requirements are required"),
  perks: z.string().optional(),
  hiringManager: z.string().min(1, "Hiring Manager is required"),
  instructions: z.string().optional(),
  status: z.string().optional(),
  expiresAt: z.string().optional().refine(
    (val) => !val || new Date(val) > new Date(),
    { message: "Expiry date must be in the future" }
  ),
}).refine(
  (data) => !data.maxSalary || !data.minSalary || Number(data.maxSalary) >= Number(data.minSalary),
  {
    message: "Max Salary must be greater than or equal to Min Salary",
    path: ["maxSalary"],
  }
);

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
  keyResponsibities: "", // Revert to typo
  jobRequirements: "",
  perks: "",
  hiringManager: "",
  instructions: "",
  status: "",
  expiresAt: "",
};

const CreateJob = () => {
  const { postJob, loading } = useJobPost();
  const { admin } = useSelector((state) => state.auth.user);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const { register, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: initialForm,
  });

  useEffect(() => {
    console.log("Admin ID:", admin?._id); // Log for debugging
    if (admin && admin._id) {
      setValue("hiringManager", admin._id);
    }
  }, [admin, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      minSalary: data.minSalary ? Number(data.minSalary) : undefined,
      maxSalary: data.maxSalary ? Number(data.maxSalary) : undefined,
      expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : undefined,
    };
    try {
      await postJob(payload);
      setSuccessMessage("Job created successfully!");
      setErrorMessage(null);
      reset(initialForm);
    } catch (error) {
      console.error("Error posting job:", error);
      const errorMsg = error.response?.data?.message ||
                       error.response?.data?.errors?.[Object.keys(error.response?.data?.errors || {})[0]] ||
                       "Failed to create job. Please check the form and try again.";
      setErrorMessage(errorMsg);
      setSuccessMessage(null);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Posting job...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Job Information</h2>
          <div className="mb-4">
            <label className="block text-base font-medium mb-1">
              Job Title *
            </label>
            <input
              type="text"
              {...register("title")}
              placeholder="e.g., Senior Frontend Developer"
              className={`w-full border rounded px-3 py-2 text-sm ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-base font-medium mb-1">
                Department *
              </label>
              <select
                {...register("department")}
                className={`border rounded px-3 py-2 text-sm w-full ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Department</option>
                <option value="cloud">Cloud & DevOps</option>
                <option value="dev">Software Development</option>
                <option value="data">Data & Analytics</option>
                <option value="cyber">Cybersecurity</option>
                <option value="consult">Consulting & Strategy</option>
                <option value="infra">Infrastructure & Ops</option>
              </select>
              {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>}
            </div>
            <div>
              <label className="block text-base font-medium mb-1">
                Job Type *
              </label>
              <select
                {...register("jobType")}
                className={`border rounded px-3 py-2 text-sm w-full ${errors.jobType ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
              {errors.jobType && <p className="mt-1 text-sm text-red-600">{errors.jobType.message}</p>}
            </div>
            <div>
              <label className="block text-base font-medium mb-1">
                Location *
              </label>
              <select
                {...register("jobLocation")}
                className={`border rounded px-3 py-2 text-sm w-full ${errors.jobLocation ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Location</option>
                <option value="Remote">Remote</option>
                <option value="On-Site">On-Site</option>
              </select>
              {errors.jobLocation && <p className="mt-1 text-sm text-red-600">{errors.jobLocation.message}</p>}
            </div>
            <div>
              <label className="block text-base font-medium mb-1">
                Experience Level
              </label>
              <select
                {...register("experienceLevel")}
                className={`border rounded px-3 py-2 text-sm w-full ${errors.experienceLevel ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Level</option>
                <option value="Intern">Intern</option>
                <option value="Junior">Junior</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
              </select>
              {errors.experienceLevel && <p className="mt-1 text-sm text-red-600">{errors.experienceLevel.message}</p>}
            </div>
            <div>
              <label className="block text-base font-medium mb-1">
                Min Salary
              </label>
              <input
                type="text"
                {...register("minSalary")}
                placeholder="$ 50000"
                className="border rounded px-3 py-2 text-sm w-full text-gray-500"
              />
              {errors.minSalary && <p className="mt-1 text-sm text-red-600">{errors.minSalary.message}</p>}
            </div>
            <div>
              <label className="block text-base font-medium mb-1">
                Max Salary
              </label>
              <input
                type="text"
                {...register("maxSalary")}
                placeholder="$ 80000"
                className="border rounded px-3 py-2 text-sm w-full text-gray-500"
              />
              {errors.maxSalary && <p className="mt-1 text-sm text-red-600">{errors.maxSalary.message}</p>}
            </div>
          </div>
          <div>
            <label className="block text-base font-medium mb-1">Period</label>
            <select
              {...register("jobPeriod")}
              className="border rounded px-3 py-2 text-sm w-full"
            >
              <option value="">Select Period</option>
              <option value="Yearly">Yearly</option>
              <option value="Monthly">Monthly</option>
              <option value="Hourly">Hourly</option>
            </select>
            {errors.jobPeriod && <p className="mt-1 text-sm text-red-600">{errors.jobPeriod.message}</p>}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Job Description</h2>
          <div className="mb-6">
            <label className="block text-base font-medium mb-1">
              Job Summary *
            </label>
            <textarea
              {...register("description")}
              placeholder="Brief overview of the role and what the candidate will be doing..."
              className={`w-full border rounded px-3 py-2 text-sm text-gray-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              rows={3}
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-base font-medium mb-1">
              Key Responsibilities *
            </label>
            <textarea
              {...register("keyResponsibities")}
              placeholder={`• Develop and maintain web applications using modern frameworks\n• Collaborate with design and product teams\n• Write clean, scalable, and reusable code\n• Participate in code reviews`}
              className={`w-full border rounded px-3 py-2 text-sm whitespace-pre-line text-gray-500 ${errors.keyResponsibities ? 'border-red-500' : 'border-gray-300'}`}
              rows={5}
            />
            {errors.keyResponsibities && <p className="mt-1 text-sm text-red-600">{errors.keyResponsibities.message}</p>}
            <p className="text-xs text-gray-500 mt-1">
              Use bullet points for better readability
            </p>
          </div>
          <div>
            <label className="block text-base font-medium mb-1">
              Requirements & Qualifications *
            </label>
            <textarea
              {...register("jobRequirements")}
              placeholder={`• Bachelor's degree in Computer Science or related field\n• 3+ years of experience with React/Vue.js\n• Strong knowledge of JavaScript, HTML, CSS\n• Experience with version control (Git)`}
              className={`w-full border rounded px-3 py-2 text-sm whitespace-pre-line text-gray-500 ${errors.jobRequirements ? 'border-red-500' : 'border-gray-300'}`}
              rows={5}
            />
            {errors.jobRequirements && <p className="mt-1 text-sm text-red-600">{errors.jobRequirements.message}</p>}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Benefits & Perks</h2>
          <div>
            <label className="block text-base font-medium mb-1">
              What We Offer
            </label>
            <textarea
              {...register("perks")}
              placeholder={`• Competitive salary and equity package\n• Health, Dental, and Vision Insurance\n• Flexible work arrangements\n• Unlimited PTO Policy`}
              className="w-full border rounded px-3 py-2 text-sm whitespace-pre-line text-gray-500"
              rows={5}
            />
            {errors.perks && <p className="mt-1 text-sm text-red-600">{errors.perks.message}</p>}
          </div>
        </div>
        <div className="bg-white border rounded-lg p-4 sm:p-6 mt-6">
          <h2 className="text-lg font-semibold mb-6">Application Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">
                Application Deadline *
              </label>
              <input
                type="date"
                {...register("expiresAt")}
                min={new Date().toISOString().split("T")[0]} // Prevent past dates
                className={`w-full border rounded-lg px-4 py-2 text-sm text-gray-900 ${errors.expiresAt ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="dd/mm/yyyy"
              />
              {errors.expiresAt && <p className="mt-1 text-sm text-red-600">{errors.expiresAt.message}</p>}
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">
                Hiring Manager
              </label>
              <input
                type="text"
                value={admin && admin.name ? admin.name : ""}
                readOnly
                className="w-full border rounded-lg px-4 py-2 text-sm text-gray-500 bg-gray-100"
                placeholder="Current User"
              />
              <input type="hidden" {...register("hiringManager")} />
            </div>
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Application Instructions
            </label>
            <textarea
              {...register("instructions")}
              rows={3}
              className="w-full border rounded-lg px-4 py-2 text-sm text-gray-500"
              placeholder="Please submit your resume, cover letter, and portfolio. Include links to your GitHub and any relevant projects."
            />
            {errors.instructions && <p className="mt-1 text-sm text-red-600">{errors.instructions.message}</p>}
          </div>
        </div>
        <div className="bg-white border rounded-lg p-4 sm:p-6 mt-6">
          <h2 className="text-lg font-semibold mb-6">Publishing Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-base font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                {...register("status")}
                className={`w-full border rounded-lg px-4 py-2 text-sm text-gray-900 ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Status</option>
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
                <option value="Closed">Closed</option>
              </select>
              {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
            </div>
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
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700 w-full sm:w-auto"
          >
            Create Job Opening
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJob;