import React, { useState } from 'react';
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

const initialUsers = [
  {
    id: 1,
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "Super Admin",
    roleColor: "purple",
    status: "Active",
    statusColor: "green",
    lastLogin: "2 hours ago",
    permissions: "All Access",
  },
  {
    id: 2,
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    name: "Mike Chen",
    email: "mike@company.com",
    role: "Admin",
    roleColor: "blue",
    status: "Active",
    statusColor: "green",
    lastLogin: "1 day ago",
    permissions: "Blog, Services",
  },
  {
    id: 3,
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    name: "David Wilson",
    email: "david@company.com",
    role: "Editor",
    roleColor: "yellow",
    status: "Pending",
    statusColor: "yellow",
    lastLogin: "Never",
    permissions: "Blog Only",
  },
  {
    id: 4,
    avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    name: "Emily Davis",
    email: "emily@company.com",
    role: "Viewer",
    roleColor: "gray",
    status: "Inactive",
    statusColor: "gray",
    lastLogin: "3 weeks ago",
    permissions: "None",
  },
];

export default function UserManagementPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [users, setUsers] = useState(initialUsers);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', role: '', status: '', permissions: '' });

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      roleFilter === 'All Roles' || user.role === roleFilter;

    const matchesStatus =
      statusFilter === 'All Status' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleView = (user) => {
    alert(`User Details:\n\nName: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}\nStatus: ${user.status}\nLast Login: ${user.lastLogin}\nPermissions: ${user.permissions}`)
  };

  const handleEdit = (user) => {
    setEditUser(user.id);
    setEditForm({
      name: user.name,
      role: user.role,
      status: user.status,
      permissions: user.permissions,
    });
  };

  const handleEditSave = () => {
    setUsers(prev =>
      prev.map(user =>
        user.id === editUser ? { ...user, ...editForm } : user
      )
    );
    setEditUser(null);
    alert('User updated successfully!');
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

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
          <button className="mb-4 text-white rounded hover:bg-blue-700 flex gap-2 bg-blue-600 p-3">
            <span className="text-sm sm:text-base flex items-center"><Plus className='mr-2' />Add New User</span>
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search user name or email..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-gray-700"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>All Roles</option>
          <option>Super Admin</option>
          <option>Admin</option>
          <option>Editor</option>
          <option>Viewer</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded-lg w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Inactive</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-200">
              <th className="p-3"></th>
              <th className="p-3">User</th>
              <th className="p-3 hidden sm:table-cell">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3 hidden md:table-cell">Last Login</th>
              <th className="p-3 hidden lg:table-cell">Permissions</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="p-3"><input type="checkbox" /></td>
                <td className="p-3 flex items-center space-x-2">
                  <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                  <div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </td>
                <td className="p-3 hidden sm:table-cell">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${user.roleColor}-100 text-${user.roleColor}-600`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${user.statusColor}-100 text-${user.statusColor}-600`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-3 hidden md:table-cell">{user.lastLogin}</td>
                <td className="p-3 hidden lg:table-cell">{user.permissions}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => handleView(user)} className="text-green-600 p-1 rounded hover:bg-green-50" title="View">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleEdit(user)} className="text-blue-500 p-1 rounded hover:bg-blue-50" title="Edit">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-500 p-1 rounded hover:bg-red-50" title="Delete">
                    <Trash className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <div className="mb-2">
              <label className="block text-sm font-semibold">Name</label>
              <input className="w-full border rounded px-3 py-1" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold">Role</label>
              <input className="w-full border rounded px-3 py-1" value={editForm.role} onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))} />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-semibold">Status</label>
              <input className="w-full border rounded px-3 py-1" value={editForm.status} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold">Permissions</label>
              <input className="w-full border rounded px-3 py-1" value={editForm.permissions} onChange={e => setEditForm(f => ({ ...f, permissions: e.target.value }))} />
            </div>
            <div className="flex justify-end gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleEditSave}>Save</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setEditUser(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
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