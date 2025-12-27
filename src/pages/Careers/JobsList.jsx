import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Briefcase, Plus, Search, Filter, 
  MapPin, DollarSign, Users 
} from "lucide-react";
import instance from "../../lib/axios";

// Mapping backend codes to readable text
const DEPARTMENT_LABELS = {
  "cloud": "Cloud & DevOps",
  "dev": "Software Development",
  "data": "Data & Analytics",
  "cyber": "Cybersecurity",
  "consult": "Consulting & Strategy",
  "infra": "Infrastructure & Ops",
  "design": "Product Design",
  "marketing": "Marketing"
};

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // 1. Fetch Jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await instance.get("/career/get-jobs");
        if (res.data.success) {
          setJobs(res.data.data.jobs);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // ✅ 2. DELETE FUNCTION
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job post? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await instance.delete(`/career/delete-job/${id}`);

      if (res.data.success) {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
        alert("Job deleted successfully");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete job. Please try again.");
    }
  };

  // Filter Logic
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Openings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your active job posts</p>
        </div>
        
        <div className="flex gap-3">
          {/* ✅ FIXED: Header button shows ALL applicants (removed 'job.title') */}
          <Link 
            to="/careers/applications" 
            className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            View All Applicants
          </Link>

          <Link to="/careers/create">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm">
              <Plus className="w-5 h-5" />
              Create New Job
            </button>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 font-medium">
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Loading & Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading jobs...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div 
                key={job._id} 
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                {/* Left: Info */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                      job.status === 'Active' ? 'bg-green-100 text-green-700' : 
                      job.status === 'Draft' ? 'bg-gray-100 text-gray-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {DEPARTMENT_LABELS[job.department] || job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.jobLocation} ({job.jobType})
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {/* Safe Salary Display */}
                      ${(job.minSalary || 0).toLocaleString()} - ${(job.maxSalary || 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                   <Link to={`/careers/edit/${job._id}`} className="text-gray-600 hover:text-blue-600 font-medium text-sm">
                     Edit
                   </Link>
                   
                   <button 
                     onClick={() => handleDelete(job._id)}
                     className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors"
                   >
                     Delete
                   </button>

                   {/* Button INSIDE the loop passes the filter */}
                   <Link 
                     to="/careers/applications" 
                     state={{ filterByJob: job.title }}
                     className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                   >
                     Applicants
                   </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">No active job openings found.</p>
              <Link to="/careers/create" className="text-blue-600 font-medium mt-2 inline-block">
                Create your first job
              </Link>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default JobsList;