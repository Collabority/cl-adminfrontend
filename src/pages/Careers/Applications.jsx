import React, { useState, useEffect, useCallback } from "react";
import {
  FileText,
  PlusCircle,
  Clock,
  Pencil,
  Download,
  Eye,
  XCircle,
  Search,
  Filter,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import instance from "../../lib/axios";
import { FaEyeSlash } from "react-icons/fa";

const DEFAULT_AVATAR =
  "https://res.cloudinary.com/dxo7rbhrl/image/upload/v1756140314/UnknownPerson_ybjokv.jpg";

function transformApiApplication(apiApp) {
  return {
    id: apiApp._id || apiApp.id,
    name: apiApp.name || "",
    email: apiApp.email || "",
    avatar: apiApp.avatar || DEFAULT_AVATAR,
    position: apiApp.position || "",
    department: apiApp.department || "",
    experience: apiApp.experience || "",
    status: apiApp.status || "",
    appliedDate: apiApp.appliedDate
      ? new Date(apiApp.appliedDate).toISOString().split("T")[0]
      : "",
    resume: apiApp.resume || "",
    coverLetter: apiApp.coverLetter || "",
  };
}

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [jobFilter, setJobFilter] = useState("All Jobs");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("");
  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    position: "",
    department: "",
    experience: "",
    status: "",
  });

  // Fetch applications from API
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await instance.get("/career/applications");
      if (res.data.success && Array.isArray(res.data.data)) {
        setApplications(res.data.data.map(transformApiApplication));
      } else {
        setApplications([]);
      }
    } catch (error) {
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = "Applications - CL Admin";
    fetchApplications();
  }, [fetchApplications]);

  // Get unique job titles for filter dropdown
  const jobTitles = [
    ...new Set(applications.map((app) => app.position).filter(Boolean)),
  ];

  // Filtering logic
  const filteredApplications = applications.filter((app) => {
    const matchSearch =
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase());
    const matchJob = jobFilter === "All Jobs" || app.position === jobFilter;
    const matchStatus =
      statusFilter === "All Status" || app.status === statusFilter;
    const matchDate = !dateFilter || app.appliedDate === dateFilter;
    return matchSearch && matchJob && matchStatus && matchDate;
  });

  const getStatusClasses = (status) => {
    switch (status) {
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      case "Shortlisted":
        return "bg-purple-100 text-purple-800";
      case "New":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleView = (app) => {
    alert(
      `Applicant Details:\n\nName: ${app.name}\nEmail: ${app.email}\nPosition: ${app.position}\nExperience: ${app.experience} years\nStatus: ${app.status}`
    );
  };

  const handleEdit = (app) => {
    setEditingReview(app.id);
    setEditForm({
      name: app.name,
      position: app.position,
      department: app.department,
      experience: app.experience,
      status: app.status,
    });
  };

  const handleEditSave = () => {
    setApplications((applications) =>
      applications.map((app) =>
        app.id === editingReview ? { ...app, ...editForm } : app
      )
    );
    setEditingReview(null);
    alert("Application updated successfully!");
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this application? This action cannot be undone."
      )
    ) {
      try {
        const { data } = await instance.delete(`/career/applications/${id}`);
        if (data.success) {
          setApplications((applications) =>
            applications.filter((app) => app.id !== id)
          );
        } else {
          alert("Failed to delete application.");
        }
      } catch (error) {
        alert("Failed to delete application.");
      }
    }
  };

  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Applications</h1>
        <Link to="/careers/create">
          <button className="text-white rounded hover:bg-blue-700 flex gap-2 bg-blue-600 px-4 py-2 justify-center items-center font-bold">
            <Plus className="h-6 w-6 " />
            <span className="text-sm sm:text-base">Create Job</span>
          </button>
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<FileText className="text-blue-600 w-6 h-6" />}
          title="Total Applications"
          value={applications.length}
        />
        <StatCard
          icon={<PlusCircle className="text-green-600 w-6 h-6" />}
          title="New Today"
          value={applications.filter((a) => a.status === "New").length}
        />
        <StatCard
          icon={<Clock className="text-orange-600 w-6 h-6" />}
          title="Under Review"
          value={applications.filter((a) => a.status === "Under Review").length}
        />
        <StatCard
          icon={<Pencil className="text-purple-600 w-6 h-6" />}
          title="Shortlisted"
          value={applications.filter((a) => a.status === "Shortlisted").length}
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-stretch md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search applicant name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full text-gray-600"
              />
            </div>
            <select
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg text-gray-600"
            >
              <option>All Jobs</option>
              {jobTitles.map((title) => (
                <option key={title}>{title}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg text-gray-600"
            >
              <option>All Status</option>
              <option>New</option>
              <option>Under Review</option>
              <option>Shortlisted</option>
              <option>Rejected</option>
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg text-gray-600"
            />
          </div>
          <div className="flex gap-2 justify-end w-full md:w-auto">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4  border-b-4 border-gray-200 mr-4"></div>
            <span className="text-lg text-gray-600">
              Loading applications...
            </span>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-3 text-left">Applicant</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">
                  Position
                </th>
                <th className="px-4 py-3 text-left hidden md:table-cell">
                  Experience
                </th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">
                  Applied Date
                </th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">
                  Resume
                </th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredApplications.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={applicant.avatar}
                      className="w-9 h-9 rounded-full"
                      alt="avatar"
                    />
                    <div>
                      <div className="font-medium">{applicant.name}</div>
                      <div className="text-xs text-gray-500">
                        {applicant.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="text-sm">{applicant.position}</div>
                    <div className="text-xs text-gray-500">
                      {applicant.department}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {applicant.experience} years
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusClasses(
                        applicant.status
                      )}`}
                    >
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-sm">
                    {applicant.appliedDate}
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <a
                      href={applicant.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        className="text-blue-600"
                        onClick={() => handleView(applicant)}
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-green-600"
                        onClick={() => handleEdit(applicant)}
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(applicant.id)}
                        title="Delete"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      {editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit Application</h2>
            <div className="space-y-3">
              <InputField
                label="Name"
                value={editForm.name}
                onChange={(v) => setEditForm((f) => ({ ...f, name: v }))}
              />
              <InputField
                label="Position"
                value={editForm.position}
                onChange={(v) => setEditForm((f) => ({ ...f, position: v }))}
              />
              <InputField
                label="Department"
                value={editForm.department}
                onChange={(v) => setEditForm((f) => ({ ...f, department: v }))}
              />
              <InputField
                label="Experience (years)"
                type="number"
                value={editForm.experience}
                onChange={(v) => setEditForm((f) => ({ ...f, experience: v }))}
              />
              <div>
                <label className="block text-base font-semibold">Status</label>
                <select
                  className="w-full border rounded px-2 py-1"
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm((f) => ({ ...f, status: e.target.value }))
                  }
                >
                  <option value="New">New</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleEditSave}
              >
                Save
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setEditingReview(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

const InputField = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-base font-semibold">{label}</label>
    <input
      type={type}
      className="w-full border rounded px-2 py-1"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-lg p-5 border border-gray-200 flex justify-between items-center">
    <div>
      <p className="text-base text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
    {icon}
  </div>
);

export default Applications;
