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
} from 'lucide-react';

export default function UserManagement() {
  return (
    <div className="min-h-screen bg-white p-6 text-gray-800">
      <h1 className="text-2xl font-semibold mb-1">User Management</h1>
      <p className="text-sm text-gray-500 mb-6">
        Manage admin users, roles, and permissions for your portal.
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <SummaryCard icon={<Users className="text-gray-600" />} title="Total Users" value="12" />
        <SummaryCard icon={<CheckCircle className="text-green-500" />} title="Active Users" value="10" />
        <SummaryCard icon={<Clock className="text-yellow-500" />} title="Pending" value="2" />
        <SummaryCard icon={<Crown className="text-purple-500" />} title="Super Admins" value="3" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4 items-center mt-15">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search applicant name or email..."
            className="pl-10 pr-4 py-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80 text-gray-500"
          />
        </div>
        <select className="border px-3 py-2 rounded">
          <option>All Roles</option>
        </select>
        <select className="border px-3 py-2 rounded">
          <option>All Status</option>
        </select>
        <div className='flex flex-wrap gap-2 items-center ml-170'>
        <button className="border px-4 py-2 rounded flex items-center gap-1">
          <ArrowDownToLine className="w-4 h-4" />
          Export
        </button>
        <button className="border px-4 py-2 rounded flex items-center gap-1">
          <Settings className="w-4 h-4" />
          Filter
        </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm border-t">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="p-2">
              <input type="checkbox" />
            </th>
            <th className="p-2">User</th>
            <th className="p-2">Role</th>
            <th className="p-2">Status</th>
            <th className="p-2">Last Login</th>
            <th className="p-2">Permissions</th>
            <th className="p-2">Actions</th>
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
            role=""
            roleColor="gray"
            status=""
            statusColor="gray"
            lastLogin=""
            permissions=""
          />
        </tbody>
      </table>
    </div>
  );
}

function SummaryCard({ icon, title, value }) {
  return (
    <div className="bg-white border p-4 rounded shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        {icon}
      </div>
      <div className="text-xl font-semibold">{value}</div>
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
    <tr className="border-t">
      <td className="p-2">
        <input type="checkbox" />
      </td>
      <td className="p-2 flex items-center space-x-2">
        <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
        <div>
          <div>{name}</div>
          <div className="text-xs text-gray-500">{email}</div>
        </div>
      </td>
      <td className="p-2">
        {role && (
          <span
            className={`bg-${roleColor}-100 text-${roleColor}-600 px-2 py-1 rounded-full text-xs`}
          >
            {role}
          </span>
        )}
      </td>
      <td className="p-2">
        {status && (
          <span
            className={`bg-${statusColor}-100 text-${statusColor}-600 px-2 py-1 rounded-full text-xs`}
          >
            {status}
          </span>
        )}
      </td>
      <td className="p-2">{lastLogin}</td>
      <td className="p-2">{permissions}</td>
      <td className="p-2 space-x-2">
        <button className="text-green-600">
          <Eye className="w-4 h-4" />
        </button>
        <button className="text-blue-500">
          <Pencil className="w-4 h-4" />
        </button>
        <button className="text-red-500">
          <Trash className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
