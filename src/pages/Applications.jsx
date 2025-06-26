import React from 'react';

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
} from "lucide-react";

const Applications = () => {
  const applications = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
      position: 'Senior Frontend Developer',
      department: 'Engineering',
      experience: '5 years',
      status: 'Under Review',
      appliedDate: 'Jan 8, 2025',
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
      appliedDate: 'Jan 7, 2025',
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
      appliedDate: 'Jan 9, 2025',
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
        appliedDate: 'Jan 9, 2025',
      },
  ];

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
    <main id="applications-main" className="flex-1 overflow-auto p-6">
      {/* Application Stats */}
      <div id="application-stats" className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">148</p>
            </div>
            {/* Lucide FileText for Total Applications */}
            <FileText className="text-blue-600 w-6 h-6" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New Today</p>
              <p className="text-2xl font-bold text-green-600">7</p>
            </div>
            {/* Lucide PlusCircle for New Today */}
            <PlusCircle className="text-green-600 w-6 h-6" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-orange-600">34</p>
            </div>
            {/* Lucide Clock for Under Review */}
            <Clock className="text-orange-600 w-6 h-6" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Shortlisted</p>
              <p className="text-2xl font-bold text-purple-600">12</p>
            </div>
            {/* Lucide Star for Shortlisted */}
            <Star className="text-purple-600 w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div id="application-filters" className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              {/* Lucide Search icon */}
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Search applicant name or email..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80 text-gray-500" />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Jobs</option>
              <option>Senior Frontend Developer</option>
              <option>UX/UI Designer</option>
              <option>Backend Developer</option>
              <option>Marketing Intern</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>New</option>
              <option>Under Review</option>
              <option>Shortlisted</option>
              <option>Rejected</option>
            </select>
            <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Filter">
              {/* Lucide Filter icon */}
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Refresh">
              {/* Lucide RefreshCcw icon */}
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div id="applications-table" className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position Applied</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img src={applicant.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                        <div className="text-sm text-gray-500">{applicant.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{applicant.position}</div>
                    <div className="text-sm text-gray-500">{applicant.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{applicant.experience}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusClasses(applicant.status)}`}>
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{applicant.appliedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 text-sm flex items-center space-x-1">
                      <Download className="w-4 h-4" /> {/* Lucide Download icon */}
                      <span>Download</span>
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      {applicant.status !== 'Shortlisted' ? (
                        <button className="text-green-600 hover:text-green-900" title="Shortlist">
                          <Star className="w-4 h-4" /> {/* Lucide Star icon */}
                        </button>
                      ) : (
                        <button className="text-green-600 hover:text-green-900" title="Schedule Interview">
                          <CalendarCheck className="w-4 h-4" /> {/* Lucide CalendarCheck icon */}
                        </button>
                      )}
                      <button className="text-blue-600 hover:text-blue-900" title="View Details">
                        <Eye className="w-4 h-4" /> {/* Lucide Eye icon */}
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Reject">
                        <XCircle className="w-4 h-4" /> {/* Lucide XCircle icon */}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Applications;