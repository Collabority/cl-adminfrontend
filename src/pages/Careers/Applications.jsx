import React, { useState } from 'react';
import {
  FileText,
  PlusCircle,
  Clock,
  Pencil,
  Download,
  Eye,
  XCircle,
  Search,
  Plus
} from "lucide-react";
import { Link } from 'react-router-dom';

const Applications = () => {
  const allApplications = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
      position: 'Senior Frontend Developer',
      department: 'Engineering',
      experience: '5',
      status: 'Under Review',
      appliedDate: '2025-01-08',
      resume: 'https://example.com/resumes/john_smith.pdf'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
      position: 'UX/UI Designer',
      department: 'Design',
      experience: '3',
      status: 'Shortlisted',
      appliedDate: '2025-01-07',
      resume: 'https://example.com/resumes/sarah_johnson.pdf'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'm.chen@email.com',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
      position: 'Backend Developer',
      department: 'Engineering',
      experience: '4',
      status: 'New',
      appliedDate: '2025-01-09',
      resume: 'https://example.com/resumes/michael_chen.pdf'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
      position: 'Marketing Intern',
      department: 'Marketing',
      experience: '1',
      status: 'New',
      appliedDate: '2025-01-09',
      resume: 'https://example.com/resumes/emily_davis.pdf'
    },
  ];

  const [search, setSearch] = useState('');
  const [jobFilter, setJobFilter] = useState('All Jobs');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [dateFilter, setDateFilter] = useState('');
  const [applications, setApplications] = useState(allApplications);
  const [editingReview, setEditingReview] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    position: '',
    department: '',
    experience: '',
    status: '',
  });
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const filteredApplications = applications.filter((app) => {
    const matchSearch =
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase());

    const matchJob = jobFilter === 'All Jobs' || app.position === jobFilter;
    const matchStatus = statusFilter === 'All Status' || app.status === statusFilter;
    const matchDate = !dateFilter || app.appliedDate === dateFilter;

    return matchSearch && matchJob && matchStatus && matchDate;
  });

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Under Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shortlisted':
        return 'bg-purple-100 text-purple-800';
      case 'New':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleView = (app) => {
    setSelectedApplicant(app);
  };

  const handleEditSave = () => {
    setApplications(applications =>
      applications.map(app =>
        app.id === editingReview
          ? { ...app, ...editForm }
          : app
      )
    );
    setEditingReview(null);
    alert('Application updated successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setApplications(applications => applications.filter(app => app.id !== id));
    }
  };

  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Applications</h1>
        <Link to="/careers/create">
          <button className="text-white rounded hover:bg-blue-700 flex items-center gap-2 bg-blue-600 px-4 py-2">
            <Plus className="w-4 h-4" />
            <span className="text-sm sm:text-base">Create Job</span>
          </button>
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<FileText className="text-blue-600 w-6 h-6" />} title="Total Applications" value="148" />
        <StatCard icon={<PlusCircle className="text-green-600 w-6 h-6" />} title="New Today" value="7" />
        <StatCard icon={<Clock className="text-orange-600 w-6 h-6" />} title="Under Review" value="34" />
        <StatCard icon={<Pencil className="text-purple-600 w-6 h-6" />} title="Shortlisted" value="12" />
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
            <select value={jobFilter} onChange={(e) => setJobFilter(e.target.value)} className="px-4 py-2 border rounded-lg text-gray-600">
              <option>All Jobs</option>
              <option>Senior Frontend Developer</option>
              <option>UX/UI Designer</option>
              <option>Backend Developer</option>
              <option>Marketing Intern</option>
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border rounded-lg text-gray-600">
              <option>All Status</option>
              <option>New</option>
              <option>Under Review</option>
              <option>Shortlisted</option>
              <option>Rejected</option>
            </select>
            <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="px-4 py-2 border rounded-lg text-gray-600" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3"><input type="checkbox" /></th>
              <th className="px-4 py-3 text-left">Applicant</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Position</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Experience</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">Applied Date</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Resume</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredApplications.map(applicant => (
              <tr key={applicant.id} className="hover:bg-gray-50">
                <td className="px-4 py-3"><input type="checkbox" /></td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <img src={applicant.avatar} className="w-9 h-9 rounded-full" alt="avatar" />
                  <div>
                    <div className="font-medium">{applicant.name}</div>
                    <div className="text-xs text-gray-500">{applicant.email}</div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <div className="text-sm">{applicant.position}</div>
                  <div className="text-xs text-gray-500">{applicant.department}</div>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">{applicant.experience} years</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 whitespace-nowrap rounded-full ${getStatusClasses(applicant.status)}`}>{applicant.status}</span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-sm">{applicant.appliedDate}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <a href={applicant.resume} target="_blank" className="text-blue-600 text-sm flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="text-blue-600" onClick={() => handleView(applicant)}><Eye className="w-4 h-4" /></button>
                    <button className="text-red-600" onClick={() => handleDelete(applicant.id)}><XCircle className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative shadow-lg">
            <button
              onClick={() => setSelectedApplicant(null)}
              className="absolute top-3 right-4 text-gray-600 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4">Applicant Details</h2>

            <div className="space-y-2 text-gray-700 text-sm">
              <p><span className="font-semibold">Name:</span> {selectedApplicant.name}</p>
              <p><span className="font-semibold">Email:</span> {selectedApplicant.email}</p>
              <p><span className="font-semibold">Position:</span> {selectedApplicant.position}</p>
              <p><span className="font-semibold">Department:</span> {selectedApplicant.department}</p>
              <p><span className="font-semibold">Experience:</span> {selectedApplicant.experience} years</p>
              <p><span className="font-semibold">Status:</span> {selectedApplicant.status}</p>
              <p><span className="font-semibold">Applied On:</span> {selectedApplicant.appliedDate}</p>

              <div className="mt-4">
                <span className="font-semibold">Resume:</span>{" "}
                <a
                  href={selectedApplicant.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

const InputField = ({ label, value, onChange, type = 'text' }) => (
  <div>
    <label className="block text-base font-semibold">{label}</label>
    <input type={type} className="w-full border rounded px-2 py-1" value={value} onChange={e => onChange(e.target.value)} />
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
