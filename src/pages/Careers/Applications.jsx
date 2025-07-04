import React, { useState } from 'react';
import {
  FileText,
  PlusCircle,
  Clock,
  Star,
  Download,
  Eye,
  XCircle,
  CalendarCheck,
  Search,
  Filter,
  RefreshCcw,
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
      experience: '5 years',
      status: 'Under Review',
      appliedDate: '2025-01-08',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
      position: 'UX/UI Designer',
      department: 'Design',
      experience: '3 years',
      status: 'Shortlisted',
      appliedDate: '2025-01-07',
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'm.chen@email.com',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg',
      position: 'Backend Developer',
      department: 'Engineering',
      experience: '4 years',
      status: 'New',
      appliedDate: '2025-01-09',
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
      position: 'Marketing Intern',
      department: 'Marketing',
      experience: 'Less than 1 year',
      status: 'New',
      appliedDate: '2025-01-09',
    },
  ];

  const [search, setSearch] = useState('');
  const [jobFilter, setJobFilter] = useState('All Jobs');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [dateFilter, setDateFilter] = useState('');

  const filteredApplications = allApplications.filter((app) => {
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

  return (
    <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold">Applications</h1>
        <Link to="/careers/create">
          <button className="text-white rounded hover:bg-blue-700 flex gap-2 bg-blue-600 px-4 py-2">
            <Plus className="w-4 h-4" />
            <span className="text-sm sm:text-base">Create Job</span>
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<FileText className="text-blue-600 w-6 h-6" />} title="Total Applications" value="148" />
        <StatCard icon={<PlusCircle className="text-green-600 w-6 h-6" />} title="New Today" value="7" />
        <StatCard icon={<Clock className="text-orange-600 w-6 h-6" />} title="Under Review" value="34" />
        <StatCard icon={<Star className="text-purple-600 w-6 h-6" />} title="Shortlisted" value="12" />
      </div>

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
              className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto text-gray-600"
            >
              <option>All Jobs</option>
              <option>Senior Frontend Developer</option>
              <option>UX/UI Designer</option>
              <option>Backend Developer</option>
              <option>Marketing Intern</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto text-gray-600"
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
              className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto text-gray-600"
            />
          </div>
          <div className="flex gap-2 justify-end w-full md:w-auto">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Filter">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Refresh">
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-4 py-3 text-left">Applicant</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Position Applied</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Experience</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left hidden lg:table-cell">Applied Date</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Resume</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredApplications.map((applicant) => (
              <tr key={applicant.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <img src={applicant.avatar} alt="Avatar" className="w-9 h-9 rounded-full mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                      <div className="text-xs text-gray-500">{applicant.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <div className="text-sm text-gray-900">{applicant.position}</div>
                  <div className="text-xs text-gray-500">{applicant.department}</div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 hidden md:table-cell">{applicant.experience}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusClasses(applicant.status)}`}>
                    {applicant.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 hidden lg:table-cell">{applicant.appliedDate}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <button className="text-blue-600 hover:text-blue-900 text-sm flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    {applicant.status !== 'Shortlisted' ? (
                      <button className="p-1 text-green-600 hover:text-green-900" title="Shortlist">
                        <Star className="w-4 h-4" />
                      </button>
                    ) : (
                      <button className="p-1 text-green-600 hover:text-green-900" title="Schedule Interview">
                        <CalendarCheck className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-1 text-blue-600 hover:text-blue-900" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-red-600 hover:text-red-900" title="Reject">
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900">{value}</p>
      </div>
      {icon}
    </div>
  );
}

export default Applications;
