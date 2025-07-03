import React from 'react';
import {
  Search,
  Users,
  CheckCircle,
  Clock,
  Crown,
  Eye,
  Pencil,
  Trash,
  ArrowDownToLine,
  Settings,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';


export default function UserManagementPage() {
  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className='flex items-center justify-between mb-6'>
      <div>
      <h1 className="text-xl sm:text-2xl font-semibold mb-1">User Management</h1>
      <p className="text-sm text-gray-500 mb-6">
        Manage admin users, roles, and permissions for your portal.
      </p>
      </div>
      <Link to="/users/roles"> 
      <button className="mb-4 text-white rounded hover:bg-blue-700 flex gap-2 bg-blue-600 p-3"> {/* Responsive margin-bottom */}
          <span className="text-sm sm:text-base flex"><span className='mr-2'><Plus/></span>Add New User</span> {/* Responsive font size */}
        </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard icon={<Users className="text-gray-600 w-6 h-6" />} title="Total Users" value="12" />
        <SummaryCard icon={<CheckCircle className="text-green-500 w-6 h-6" />} title="Active Users" value="10" />
        <SummaryCard icon={<Clock className="text-yellow-500 w-6 h-6" />} title="Pending" value="2" />
        <SummaryCard icon={<Crown className="text-purple-500 w-6 h-6" />} title="Super Admins" value="3" />
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-4 items-stretch sm:items-center mt-4">
        <div className="relative w-full sm:flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search user name or email..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-500"
          />
        </div>
        <select className="border px-3 py-2 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Roles</option>
          <option>Super Admin</option>
          <option>Admin</option>
          <option>Editor</option>
        </select>
        <select className="border px-3 py-2 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Inactive</option>
        </select>
        <div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto ml-0 sm:ml-auto'>
            <button className="border border-gray-300 px-4 py-2 rounded-lg flex items-center justify-center gap-1 text-gray-700 hover:bg-gray-50 w-full sm:w-auto">
              <ArrowDownToLine className="w-4 h-4" />
              Export
            </button>
            <button className="border border-gray-300 px-4 py-2 rounded-lg flex items-center justify-center gap-1 text-gray-700 hover:bg-gray-50 w-full sm:w-auto">
              <Settings className="w-4 h-4" />
              Filter
            </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-200">
              <th className="p-3">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="p-3 whitespace-nowrap">User</th>
              <th className="p-3 whitespace-nowrap hidden sm:table-cell">Role</th>
              <th className="p-3 whitespace-nowrap">Status</th>
              <th className="p-3 whitespace-nowrap hidden md:table-cell">Last Login</th>
              <th className="p-3 whitespace-nowrap hidden lg:table-cell">Permissions</th>
              <th className="p-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            <UserRow
              avatar="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
              name="Sarah Johnson"
              email="sarah@company.com"
              role="Super Admin"
              roleColor="purple"
              status="Active"
              statusColor="green"
              lastLogin="2 hours ago"
              permissions="All Access"
            />
            <UserRow
              avatar="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
              name="Mike Chen"
              email="mike@company.com"
              role="Admin"
              roleColor="blue"
              status="Active"
              statusColor="green"
              lastLogin="1 day ago"
              permissions="Blog, Services"
            />
            <UserRow
              avatar="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
              name="David Wilson"
              email="david@company.com"
              role="Editor"
              roleColor="yellow"
              status="Pending"
              statusColor="yellow"
              lastLogin="Never"
              permissions="Blog Only"
            />
            <UserRow
              avatar="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg"
              name="Emily Davis"
              email="emily@company.com"
              role="Viewer"
              roleColor="gray"
              status="Inactive"
              statusColor="gray"
              lastLogin="3 weeks ago"
              permissions="None"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SummaryCard({ icon, title, value }) {
  return (
    <div className="bg-white border p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        {icon}
      </div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}

function UserRow({
  avatar,
  name,
  email,
  role,
  roleColor,
  status,
  statusColor,
  lastLogin,
  permissions,
}) {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="p-3">
        <input type="checkbox" className="rounded border-gray-300" />
      </td>
      <td className="p-3 flex items-center space-x-2 whitespace-nowrap">
        <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full flex-shrink-0" />
        <div>
          <div className="font-medium text-gray-900">{name}</div>
          <div className="text-xs text-gray-500">{email}</div>
        </div>
      </td>
      <td className="p-3 whitespace-nowrap hidden sm:table-cell">
        {role && (
          <span
            className={`bg-${roleColor}-100 text-${roleColor}-600 px-2 py-1 rounded-full text-xs font-medium`}
          >
            {role}
          </span>
        )}
      </td>
      <td className="p-3 whitespace-nowrap">
        {status && (
          <span
            className={`bg-${statusColor}-100 text-${statusColor}-600 px-2 py-1 rounded-full text-xs font-medium`}
          >
            {status}
          </span>
        )}
      </td>
      <td className="p-3 whitespace-nowrap text-gray-500 hidden md:table-cell">{lastLogin}</td>
      <td className="p-3 whitespace-nowrap text-gray-500 hidden lg:table-cell">{permissions}</td>
      <td className="p-3 whitespace-nowrap space-x-2">
        <button className="text-green-600 p-1 rounded hover:bg-green-50" title="View">
          <Eye className="w-4 h-4" />
        </button>
        <button className="text-blue-500 p-1 rounded hover:bg-blue-50" title="Edit">
          <Pencil className="w-4 h-4" />
        </button>
        <button className="text-red-500 p-1 rounded hover:bg-red-50" title="Delete">
          <Trash className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}