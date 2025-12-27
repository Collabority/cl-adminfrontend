import React, { useState, useEffect, useCallback } from "react";
import {
  FileText,
  PlusCircle,
  Clock,
  Pencil,
  Eye,
  XCircle,
  Search,
  Filter,
  RefreshCcw,
} from "lucide-react";
import instance from "../../lib/axios"; 
import { JobApplicantDetailsView } from "../../components/JobApplicantDetailsView";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [jobFilter, setJobFilter] = useState(location.state?.filterByJob || "All Jobs");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("");
  
  
  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    status: "", // We typically only edit status, but kept structure flexible
  });

  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // Fetch applications
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
      console.error("Fetch Error:", error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = "Applications - CL Admin";
    fetchApplications();
  }, [fetchApplications]);

  // Handle Edit Click
  const handleEdit = (app) => {
    setEditingId(app.id);
    setEditForm({
      status: app.status,
    });
  };

  //  REAL API CALL TO UPDATE STATUS
  const handleEditSave = async () => {
    try {
      // Call Backend API
      const response = await instance.patch(`/career/applications/${editingId}/status`, {
        status: editForm.status
      });

      if (response.data.success) {
        // Update Local State
        setApplications((prev) =>
          prev.map((app) =>
            app.id === editingId ? { ...app, status: editForm.status } : app
          )
        );
        setEditingId(null);
        alert("Status updated successfully!");
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("Failed to update application status.");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Delete this application permanently?")) {
      try {
        const { data } = await instance.delete(`/career/applications/${id}`);
        if (data.success) {
          setApplications((prev) => prev.filter((app) => app.id !== id));
        }
      } catch (error) {
        alert("Failed to delete application.");
      }
    }
  };

  // Filters
  const filteredApplications = applications.filter((app) => {
    const matchSearch =
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase());
    const matchJob = jobFilter === "All Jobs" || app.position === jobFilter;
    const matchStatus = statusFilter === "All Status" || app.status === statusFilter;
    const matchDate = !dateFilter || app.appliedDate === dateFilter;
    return matchSearch && matchJob && matchStatus && matchDate;
  });

  const getStatusClasses = (status) => {
    switch (status) {
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Shortlisted": return "bg-purple-100 text-purple-800";
      case "New": return "bg-green-100 text-green-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const jobTitles = [...new Set(applications.map((app) => app.position).filter(Boolean))];

  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track candidate applications</p>
        </div>
        {/* Button Removed per request */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<FileText className="text-blue-600" />} title="Total Applications" value={applications.length} />
        <StatCard icon={<PlusCircle className="text-green-600" />} title="New Today" value={applications.filter(a => a.status === "New").length} />
        <StatCard icon={<Clock className="text-orange-600" />} title="Under Review" value={applications.filter(a => a.status === "Under Review").length} />
        <StatCard icon={<Pencil className="text-purple-600" />} title="Shortlisted" value={applications.filter(a => a.status === "Shortlisted").length} />
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <select value={jobFilter} onChange={(e) => setJobFilter(e.target.value)} className="px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:border-blue-500">
          <option>All Jobs</option>
          {jobTitles.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:border-blue-500">
          <option>All Status</option>
          <option>New</option>
          <option>Under Review</option>
          <option>Shortlisted</option>
          <option>Rejected</option>
        </select>
        <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="px-4 py-2 border rounded-lg text-gray-600 focus:outline-none focus:border-blue-500" />
        
        <button onClick={fetchApplications} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Refresh">
          <RefreshCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredApplications.length === 0 ? (
           <div className="text-center py-20 text-gray-500">No applications found matching your filters.</div>
        ) : (
          <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Applicant</th>
                <th className="px-6 py-4 hidden sm:table-cell">Position</th>
                <th className="px-6 py-4 hidden md:table-cell">Exp</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 hidden lg:table-cell">Date</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={app.avatar} className="w-10 h-10 rounded-full bg-gray-200 object-cover" alt="" />
                      <div>
                        <div className="font-semibold text-gray-900">{app.name}</div>
                        <div className="text-xs text-gray-500">{app.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <div className="font-medium text-gray-900">{app.position}</div>
                    <div className="text-xs text-gray-500">{app.department}</div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">{app.experience}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell text-gray-500">{app.appliedDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setSelectedApplicant(app)} className="text-gray-400 hover:text-blue-600 transition-colors" title="View Details">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleEdit(app)} className="text-gray-400 hover:text-green-600 transition-colors" title="Edit Status">
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(app.id)} className="text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>

      {/* Edit Status Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 transform transition-all">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Update Status</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Application Status</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
              >
                <option value="New">New</option>
                <option value="Under Review">Under Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                onClick={handleEditSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail View Modal */}
      {selectedApplicant && (
        <JobApplicantDetailsView
          selectedApplicant={selectedApplicant}
          setSelectedApplicant={setSelectedApplicant}
        />
      )}
    </main>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
    <div className="p-3 bg-gray-50 rounded-full">{icon}</div>
  </div>
);

export default Applications;