import React from 'react';
import { Link } from 'react-router-dom';


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
    <main id="applications-main" className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8"> {/* Responsive padding */}
      <div className='flex items-center justify-between mb-6'> {/* Responsive margin-bottom */}
        <h1 className="text-xl sm:text-2xl font-semibold mb-4">Applications</h1> {/* Responsive font size */}
        <Link to="/careers/create">
        <button className="mb-4 text-white rounded hover:bg-blue-700 flex gap-2 bg-blue-600 p-3"> {/* Responsive margin-bottom */}
          <span className="text-sm sm:text-base flex"><span className='mr-2'><Plus/></span> Create Job</span> {/* Responsive font size */}
        </button>
        </Link>
      </div>
      {/* Application Stats */}
      <div id="application-stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"> {/* Responsive grid */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">148</p> {/* Responsive font size */}
            </div>
            {/* Lucide FileText for Total Applications */}
            <FileText className="text-blue-600 w-6 h-6" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New Today</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">7</p> {/* Responsive font size */}
            </div>
            {/* Lucide PlusCircle for New Today */}
            <PlusCircle className="text-green-600 w-6 h-6" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Under Review</p>
              <p className="text-xl sm:text-2xl font-bold text-orange-600">34</p> {/* Responsive font size */}
            </div>
            {/* Lucide Clock for Under Review */}
            <Clock className="text-orange-600 w-6 h-6" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Shortlisted</p>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">12</p> {/* Responsive font size */}
            </div>
            {/* Lucide Star for Shortlisted */}
            <Star className="text-purple-600 w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div id="application-filters" className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between"> {/* Changed to md:flex-row and items-stretch */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full"> {/* Made flex-col on mobile, flex-row on sm+ */}
            <div className="relative w-full sm:w-auto flex-1"> {/* w-full on mobile, auto on sm+ and flex-1 for better search bar scaling */}
              {/* Lucide Search icon */}
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Search applicant name or email..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-500" /> {/* w-full */}
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"> {/* w-full on mobile, auto on sm+ */}
              <option>All Jobs</option>
              <option>Senior Frontend Developer</option>
              <option>UX/UI Designer</option>
              <option>Backend Developer</option>
              <option>Marketing Intern</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"> {/* w-full on mobile, auto on sm+ */}
              <option>All Status</option>
              <option>New</option>
              <option>Under Review</option>
              <option>Shortlisted</option>
              <option>Rejected</option>
            </select>
            <input type="date" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto" /> {/* w-full on mobile, auto on sm+ */}
          </div>
          <div className="flex gap-2 justify-end w-full md:w-auto"> {/* Justify-end on mobile, auto width on md+ */}
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
        <div className="overflow-x-auto"> {/* This handles horizontal scrolling for the table */}
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> {/* Adjusted padding */}
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th> {/* Adjusted padding */}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Position Applied</th> {/* Hidden on xs, visible sm+ */}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Experience</th> {/* Hidden on sm, visible md+ */}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th> {/* Adjusted padding */}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Applied Date</th> {/* Hidden on md, visible lg+ */}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Resume</th> {/* Hidden on xs, visible sm+ */}
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> {/* Adjusted padding */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap"> {/* Adjusted padding */}
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap"> {/* Adjusted padding */}
                    <div className="flex items-center">
                      <img src={applicant.avatar} alt="Avatar" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 flex-shrink-0" /> {/* Responsive avatar size */}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                        <div className="text-xs text-gray-500">{applicant.email}</div> {/* Smaller email text on mobile */}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap hidden sm:table-cell"> {/* Hidden on xs, visible sm+ */}
                    <div className="text-sm text-gray-900">{applicant.position}</div>
                    <div className="text-xs text-gray-500">{applicant.department}</div> {/* Smaller department text on mobile */}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">{applicant.experience}</td> {/* Hidden on sm, visible md+ */}
                  <td className="px-4 py-3 whitespace-nowrap"> {/* Adjusted padding */}
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusClasses(applicant.status)}`}>
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{applicant.appliedDate}</td> {/* Hidden on md, visible lg+ */}
                  <td className="px-4 py-3 whitespace-nowrap hidden sm:table-cell"> {/* Hidden on xs, visible sm+ */}
                    <button className="text-blue-600 hover:text-blue-900 text-sm flex items-center space-x-1">
                      <Download className="w-4 h-4" /> {/* Lucide Download icon */}
                      <span>Download</span>
                    </button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium"> {/* Adjusted padding */}
                    <div className="flex items-center space-x-2">
                      {applicant.status !== 'Shortlisted' ? (
                        <button className="p-1 text-green-600 hover:text-green-900" title="Shortlist"> {/* Added padding for easier tapping */}
                          <Star className="w-4 h-4" /> {/* Lucide Star icon */}
                        </button>
                      ) : (
                        <button className="p-1 text-green-600 hover:text-green-900" title="Schedule Interview"> {/* Added padding for easier tapping */}
                          <CalendarCheck className="w-4 h-4" /> {/* Lucide CalendarCheck icon */}
                        </button>
                      )}
                      <button className="p-1 text-blue-600 hover:text-blue-900" title="View Details"> {/* Added padding for easier tapping */}
                        <Eye className="w-4 h-4" /> {/* Lucide Eye icon */}
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-900" title="Reject"> {/* Added padding for easier tapping */}
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