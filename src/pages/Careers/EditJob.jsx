import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import instance from "../../lib/axios";
import { useSelector } from "react-redux";

// --- Validation Schema (Same as Create) ---
const jobSchema = z.object({
  title: z.string().min(1, "Job Title is required"),
  department: z.string().min(1, "Department is required"),
  jobType: z.string().min(1, "Job Type is required"),
  jobLocation: z.string().min(1, "Location is required"),
  experienceLevel: z.string().min(1, "Experience Level is required"),
  minSalary: z.string().optional(), // Keep as string for input, convert later
  maxSalary: z.string().optional(),
  jobPeriod: z.string().optional(),
  description: z.string().min(1, "Job Summary is required"),
  keyResponsibities: z.string().min(1, "Key Responsibilities are required"),
  jobRequirements: z.string().min(1, "Requirements are required"),
  perks: z.string().optional(),
  hiringManager: z.string().optional(),
  instructions: z.string().optional(),
  status: z.string().optional(),
  expiresAt: z.string().optional(),
});

const EditJob = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(jobSchema),
  });

  // 1. FETCH EXISTING DATA
  useEffect(() => {
    const fetchJob = async () => {
      try {
        // Ensure this matches your Backend GET Single Job route
        const res = await instance.get(`/career/jobs/${id}`);
        
        if (res.data.success) {
          const job = res.data.data;

          // -- DATA POPULATION LOGIC --
          
          // 1. Handle Date (Convert ISO to YYYY-MM-DD for input field)
          const formattedDate = job.expiresAt 
            ? new Date(job.expiresAt).toISOString().split("T")[0] 
            : "";

          // 2. Handle Hiring Manager (If object, extract ID)
          const managerId = typeof job.hiringManager === 'object' 
            ? job.hiringManager?._id 
            : job.hiringManager;

          // 3. Reset form with database values
          reset({
            title: job.title,
            department: job.department,
            jobType: job.jobType,
            jobLocation: job.jobLocation,
            experienceLevel: job.experienceLevel,
            minSalary: String(job.minSalary || ""),
            maxSalary: String(job.maxSalary || ""),
            jobPeriod: job.jobPeriod,
            description: job.description,
            keyResponsibities: job.keyResponsibities,
            jobRequirements: job.jobRequirements,
            perks: job.perks,
            hiringManager: managerId,
            instructions: job.instructions,
            status: job.status,
            expiresAt: formattedDate,
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load job details. The ID might be incorrect.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id, reset]);


  // 2. HANDLE UPDATE (Safer Version)
  const onSubmit = async (data) => {
    try {
      // 1. Sanitize the Date
      let formattedDate = undefined;
      if (data.expiresAt) {
        // Only convert if it's a valid date string
        const dateObj = new Date(data.expiresAt);
        if (!isNaN(dateObj.getTime())) {
            formattedDate = dateObj.toISOString();
        }
      }

      // 2. Sanitize Hiring Manager (Send null if empty string)
      // This prevents the "Cast to ObjectId failed" error if backend validation misses it
      const managerId = (data.hiringManager && data.hiringManager.length > 0) 
        ? data.hiringManager 
        : undefined;

      // 3. Prepare Payload
      const payload = {
        title: data.title,
        department: data.department,
        jobType: data.jobType,
        jobLocation: data.jobLocation,
        experienceLevel: data.experienceLevel,
        minSalary: Number(data.minSalary) || 0,
        maxSalary: Number(data.maxSalary) || 0,
        jobPeriod: data.jobPeriod,
        description: data.description,
        keyResponsibities: data.keyResponsibities,
        jobRequirements: data.jobRequirements,
        perks: data.perks,
        hiringManager: managerId, // ✅ Sends undefined instead of ""
        instructions: data.instructions,
        status: data.status,
        expiresAt: formattedDate,
      };

      console.log("Sending Payload:", payload); // Debug log

      // Call PATCH endpoint
      await instance.patch(`/career/jobs/${id}`, payload);
      
      alert("Job updated successfully!");
      navigate("/careers");
    } catch (err) {
      console.error("Update error:", err);
      // Show the specific error message from the backend if available
      const errMsg = err.response?.data?.message || "Failed to update job.";
      alert(`Error: ${errMsg}`);
    }
  };

  if (loading) return <div className="text-center py-20">Loading job details...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold">Edit Job Opening</h1>
        <button 
          onClick={() => navigate("/careers")}
          className="border px-4 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Same Form UI as CreateJob but populated */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Job Information</h2>
          <div className="mb-4">
            <label className="block text-base font-medium mb-1">Job Title *</label>
            <input type="text" {...register("title")} className="w-full border rounded px-3 py-2 text-sm border-gray-300" />
            {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-base font-medium mb-1">Department *</label>
              <select {...register("department")} className="border rounded px-3 py-2 text-sm w-full border-gray-300">
                <option value="">Select Department</option>
                <option value="cloud">Cloud & DevOps</option>
                <option value="dev">Software Development</option>
                <option value="data">Data & Analytics</option>
                <option value="cyber">Cybersecurity</option>
                <option value="consult">Consulting & Strategy</option>
                <option value="infra">Infrastructure & Ops</option>
                <option value="design">Product Design</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
            <div>
               <label className="block text-base font-medium mb-1">Job Type *</label>
               <select {...register("jobType")} className="border rounded px-3 py-2 text-sm w-full border-gray-300">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>
            <div>
               <label className="block text-base font-medium mb-1">Location *</label>
               <select {...register("jobLocation")} className="border rounded px-3 py-2 text-sm w-full border-gray-300">
                <option value="Remote">Remote</option>
                <option value="On-Site">On-Site</option>
              </select>
            </div>
            <div>
               <label className="block text-base font-medium mb-1">Experience *</label>
               <select {...register("experienceLevel")} className="border rounded px-3 py-2 text-sm w-full border-gray-300">
                <option value="Intern">Intern</option>
                <option value="Junior">Junior</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
            <div>
              <label className="block text-base font-medium mb-1">Min Salary</label>
              <input type="text" {...register("minSalary")} className="border rounded px-3 py-2 text-sm w-full border-gray-300" />
            </div>
            <div>
              <label className="block text-base font-medium mb-1">Max Salary</label>
              <input type="text" {...register("maxSalary")} className="border rounded px-3 py-2 text-sm w-full border-gray-300" />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Description</h2>
          <div className="mb-4">
            <label className="block text-base font-medium mb-1">Summary</label>
            <textarea {...register("description")} rows={3} className="w-full border rounded px-3 py-2 text-sm border-gray-300" />
          </div>
          <div className="mb-4">
            <label className="block text-base font-medium mb-1">Key Responsibilities</label>
            <textarea {...register("keyResponsibities")} rows={5} className="w-full border rounded px-3 py-2 text-sm border-gray-300" />
          </div>
          <div className="mb-4">
            <label className="block text-base font-medium mb-1">Requirements</label>
            <textarea {...register("jobRequirements")} rows={5} className="w-full border rounded px-3 py-2 text-sm border-gray-300" />
          </div>
          <div className="mb-4">
            <label className="block text-base font-medium mb-1">Perks</label>
            <textarea {...register("perks")} rows={5} className="w-full border rounded px-3 py-2 text-sm border-gray-300" />
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white border rounded-lg p-4 sm:p-6 mt-6">
          <h2 className="text-lg font-semibold mb-6">Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-base font-medium mb-1">Deadline</label>
              <input type="date" {...register("expiresAt")} className="w-full border rounded px-3 py-2 text-sm border-gray-300" />
            </div>
            <div>
              <label className="block text-base font-medium mb-1">Hiring Manager ID</label>
              <input type="text" {...register("hiringManager")} className="w-full border rounded px-3 py-2 text-sm border-gray-300" />
            </div>
            <div>
              <label className="block text-base font-medium mb-1">Status</label>
              <select {...register("status")} className="w-full border rounded px-3 py-2 text-sm border-gray-300">
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Paused">Paused</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-blue-700">
            Update Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJob;