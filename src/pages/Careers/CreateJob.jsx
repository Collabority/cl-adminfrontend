import { useForm } from 'react-hook-form';

const CreateJob = () => {
  // Initialize useForm with default values and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
      benefits: '',
      applicationDeadline: '',
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // Replace with your API call or submission logic
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold">Create New Job Opening</h1>
          <div className="flex gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              className="border px-4 py-2 rounded text-sm font-medium text-gray-700 hover:bg-gray-100 w-1/2 sm:w-auto"
            >
              Save Draft
            </button>
            <button
              type="button"
              className="bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium w-1/2 sm:w-auto"
            >
              Preview
            </button>
          </div>
        </div>

        {/* Job Information Card */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Job Information</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Job Title *</label>
            <input
              type="text"
              {...register('title', { required: 'Job Title is required' })}
              placeholder="e.g., Senior Frontend Developer"
              className="w-full border rounded px-3 py-2 text-sm"
            />
            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Department *</label>
              <select
                {...register('department', { required: 'Department is required' })}
                className="border rounded px-3 py-2 text-sm w-full"
              >
                <option value="">Select Department</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
              {errors.department && (
                <p className="text-sm text-red-500 mt-1">{errors.department.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Job Type *</label>
              <select
                {...register('type', { required: 'Job Type is required' })}
                className="border rounded px-3 py-2 text-sm w-full"
              >
                <option value="">Select Type</option>
                <option>Full-time</option>
                <option>Part-time</option>
              </select>
              {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location *</label>
              <select
                {...register('location', { required: 'Location is required' })}
                className="border rounded px-3 py-2 text-sm w-full"
              >
                <option value="">Select Location</option>
                <option>Remote</option>
                <option>Onsite</option>
              </select>
              {errors.location && (
                <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Experience Level</label>
              <select {...register('level')} className="border rounded px-3 py-2 text-sm w-full">
                <option value="">Select Level</option>
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
                {...register('minSalary')}
                placeholder="$ 50000"
                className="border rounded px-3 py-2 text-sm w-full text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Max Salary</label>
              <input
                type="text"
                {...register('maxSalary')}
                placeholder="$ 80000"
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

        {/* Job Description */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Job Description</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Job Summary *</label>
            <textarea
              {...register('summary', { required: 'Job Summary is required' })}
              placeholder="Brief overview of the role and what the candidate will be doing..."
              className="w-full border rounded px-3 py-2 text-sm text-gray-500"
              rows={3}
            />
            {errors.summary && (
              <p className="text-sm text-red-500 mt-1">{errors.summary.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Key Responsibilities *</label>
            <textarea
              {...register('responsibilities', { required: 'Key Responsibilities are required' })}
              placeholder={`• Develop and maintain web applications using modern frameworks\n• Collaborate with design and product teams\n• Write clean, maintainable code\n• Participate in code reviews`}
              className="w-full border rounded px-3 py-2 text-sm whitespace-pre-line text-gray-500"
              rows={5}
            />
            {errors.responsibilities && (
              <p className="text-sm text-red-500 mt-1">{errors.responsibilities.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">Use bullet points for better readability</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Requirements & Qualifications *</label>
            <textarea
              {...register('qualifications', {
                required: 'Requirements & Qualifications are required',
              })}
              placeholder={`• Bachelor's degree in Computer Science or related field\n• 3+ years of experience with React/Vue.js\n• Strong knowledge of JavaScript, HTML, CSS\n• Experience with version control (Git)`}
              className="w-full border rounded px-3 py-2 text-sm whitespace-pre-line text-gray-500"
              rows={5}
            />
            {errors.qualifications && (
              <p className="text-sm text-red-500 mt-1">{errors.qualifications.message}</p>
            )}
          </div>
        </div>

        {/* Benefits & Perks */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Benefits & Perks</h2>

          <div>
            <label className="block text-sm font-medium mb-1">What We Offer</label>
            <textarea
              {...register('benefits')}
              placeholder={`• Competitive salary and equity package\n• Health, Dental, and Vision Insurance\n• Flexible work arrangements\n• Unlimited PTO Policy`}
              className="w-full border rounded px-3 py-2 text-sm whitespace-pre-line text-gray-500"
              rows={5}
            />
          </div>
        </div>

        {/* Application Settings */}
        <div className="bg-white border rounded-lg p-4 sm:p-6 mt-6">
          <h2 className="text-lg font-semibold mb-6">Application Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Application Deadline *
              </label>
              <input
                type="date"
                {...register('applicationDeadline', { required: 'Application Deadline is required' })}
                className="w-full border rounded-lg px-4 py-2 text-sm text-gray-900"
                placeholder="dd/mm/yyyy"
              />
              {errors.applicationDeadline && (
                <p className="text-sm text-red-500 mt-1">{errors.applicationDeadline.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hiring Manager</label>
              <select className="w-full border rounded-lg px-4 py-2 text-sm text-gray-900">
                <option>Select Manager</option>
                <option>Jane Doe</option>
                <option>John Smith</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Application Instructions
            </label>
            <textarea
              rows={3}
              className="w-full border rounded-lg px-4 py-2 text-sm text-gray-500"
              placeholder="Please submit your resume, cover letter, and portfolio. Include links to your GitHub and any relevant projects."
            />
          </div>
        </div>

        {/* Publishing Options */}
        <div className="bg-white border rounded-lg p-4 sm:p-6 mt-6">
          <h2 className="text-lg font-semibold mb-6">Publishing Options</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select className="w-full border rounded-lg px-4 py-2 text-sm text-gray-900">
                <option>Draft</option>
                <option>Active</option>
                <option>Paused</option>
                <option>Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
              <input
                type="datetime-local"
                className="w-full border rounded-lg px-4 py-2 text-sm text-gray-900"
                placeholder="dd/mm/yyyy"
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <label className="block text-sm font-medium text-gray-900">Featured Job</label>
            <p className="text-sm text-gray-500 mb-2">
              Display this job prominently on the careers page
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-900">External Applications</label>
            <p className="text-sm text-gray-500 mb-2">
              Allow applications through external job boards
            </p>
          </div>
        </div>

        {/* Submit Button */}
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