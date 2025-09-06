import React, { useState } from 'react';
import { Pencil, Trash, Eye } from 'lucide-react';
import AddSubscriber from './AddSubscriber';
import {Link} from 'react-router-dom';

const initialSubscribers = [
  {
    email: "john.doe@email.com",
    name: "John Doe",
    status: "Active",
    segment: "Customers",
    date: "Dec 10, 2024",
    color: "blue",
  },
  {
    email: "sarah.smith@company.com",
    name: "Sarah Smith",
    status: "Active",
    segment: "Prospects",
    date: "Dec 8, 2024",
    color: "purple",
  },
  {
    email: "emily.tan@example.com",
    name: "Emily Tan",
    status: "Unsubscribed",
    segment: "General",
    date: "Nov 30, 2024",
    color: "green",
  },
];

export default function NewsletterManagement() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All Status');
  const [segment, setSegment] = useState('All Segments');
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [editingSubscriber, setEditingSubscriber] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', status: 'Active', segment: 'General' });

  const filteredSubscribers = subscribers.filter(sub => {
    const matchesSearch =
      sub.email.toLowerCase().includes(search.toLowerCase()) ||
      sub.name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === 'All Status' || sub.status === status;
    const matchesSegment = segment === 'All Segments' || sub.segment === segment;

    return matchesSearch && matchesStatus && matchesSegment;
  });

  const handleView = (sub) => {
    alert(`Name: ${sub.name}\nEmail: ${sub.email}\nStatus: ${sub.status}\nSegment: ${sub.segment}`);
  };

  const handleEdit = (sub) => {
    setEditingSubscriber(sub.email);
    setEditForm({ name: sub.name, email: sub.email, status: sub.status, segment: sub.segment });
  };

  const handleEditSave = () => {
    setSubscribers(prev =>
      prev.map(sub =>
        sub.email === editingSubscriber ? { ...sub, ...editForm } : sub
      )
    );
    setEditingSubscriber(null);
  };

  const handleDelete = (email) => {
    if (window.confirm("Are you sure you want to delete this subscriber?")) {
      setSubscribers(prev => prev.filter(sub => sub.email !== email));
    }
  };

  const handleStatusChange = (email, newStatus) => {
    setSubscribers(prev => prev.map(sub => sub.email === email ? { ...sub, status: newStatus } : sub));
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Newsletter Management</h1>
          <p className="text-sm text-gray-500">Manage subscribers and track newsletter performance.</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          <span className="text-xs sm:text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full">1,248 Subscribers</span>
          <span className="text-xs sm:text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">12 Campaigns</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card title="Total Subscribers" value="1,248" icon="👥" delta="+12.5%" deltaColor="text-green-500" />
        <Card title="Open Rate" value="24.8%" icon="📨" delta="+2.1%" deltaColor="text-blue-500" />
        <Card title="Click Rate" value="3.2%" icon="🖱️" delta="-0.5%" deltaColor="text-red-500" />
        <Card title="Unsubscribe Rate" value="0.8%" icon="👤" delta="-0.2%" deltaColor="text-green-500" />
      </div>

      {/* Tabs */}
      <div className="mb-4 border-b flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <button className="border-b-2 border-blue-500 pb-2 font-medium whitespace-nowrap">Subscribers</button>
    
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-4 items-stretch sm:items-center">
        <input
          type="text"
          placeholder="Search by email or name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:flex-1 text-gray-500"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-auto"
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Unsubscribed</option>
          <option>Bounced</option>
        </select>
        <select
          value={segment}
          onChange={(e) => setSegment(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-auto"
        >
          <option>All Segments</option>
          <option>General</option>
          <option>Customers</option>
          <option>Prospects</option>
        </select>
        <Link to="/newsletter/add-subscriber" className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto text-center">
        <button>
          + Add Subscriber
        </button>
        </Link>
        <button className="border px-4 py-2 rounded w-full sm:w-auto whitespace-nowrap">🟰 Bulk Actions</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-200">
              <th className="p-3"><input type="checkbox" className="rounded border-gray-300" /></th>
              <th className="p-3 whitespace-nowrap">Email</th>
              <th className="p-3 whitespace-nowrap hidden sm:table-cell">Name</th>
              <th className="p-3 whitespace-nowrap">Status</th>
              <th className="p-3 whitespace-nowrap hidden md:table-cell">Segment</th>
              <th className="p-3 whitespace-nowrap hidden lg:table-cell">Subscribed</th>
              <th className="p-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscribers.map((sub, index) => (
              <Row
                key={index}
                {...sub}
                onView={() => handleView(sub)}
                onEdit={() => handleEdit(sub)}
                onDelete={() => handleDelete(sub.email)}
                onStatusChange={(newStatus) => handleStatusChange(sub.email, newStatus)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingSubscriber && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Subscriber</h2>
            <div className="mb-2">
              <label className="block text-sm font-medium">Name</label>
              <input className="w-full border rounded px-2 py-1" value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Email</label>
              <input className="w-full border rounded px-2 py-1" value={editForm.email} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Segment</label>
              <input className="w-full border rounded px-2 py-1" value={editForm.segment} onChange={e => setEditForm(f => ({ ...f, segment: e.target.value }))} />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium">Status</label>
              <select className="w-full border rounded px-2 py-1" value={editForm.status} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))}>
                <option>Active</option>
                <option>Unsubscribed</option>
                <option>Bounced</option>
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleEditSave}>Save</button>
              <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => setEditingSubscriber(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ title, value, icon, delta, deltaColor }) {
  return (
    <div className="bg-white border p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        <span className="text-xl">{icon}</span>
      </div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className={`text-xs mt-1 ${deltaColor}`}>{delta} from last campaign</div>
    </div>
  );
}

function Row({ email, name, status, segment, date, color, onView, onEdit, onDelete }) {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
  };

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="p-3"><input type="checkbox" className="rounded border-gray-300" /></td>
      <td className="p-3 whitespace-nowrap">
        <div className="font-medium text-gray-900">{email}</div>
      </td>
      <td className="p-3 whitespace-nowrap hidden sm:table-cell">
        <div className="text-gray-900">{name}</div>
      </td>
      <td className="p-3 whitespace-nowrap">
        <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">{status}</span>
      </td>
      <td className="p-3 whitespace-nowrap hidden md:table-cell">
        <span className={`${colorMap[color] || 'bg-gray-100 text-gray-600'} px-2 py-1 rounded-full text-xs font-medium`}>
          {segment}
        </span>
      </td>
      <td className="p-3 whitespace-nowrap text-gray-500 hidden lg:table-cell">{date}</td>
      <td className="p-3 whitespace-nowrap space-x-2">
        <button className="text-green-600 p-1 rounded hover:bg-green-50" title="View" onClick={onView}>
          <Eye className="w-4 h-4" />
        </button>
        <button className="text-blue-500 p-1 rounded hover:bg-blue-50" title="Edit" onClick={onEdit}>
          <Pencil className="w-4 h-4" />
        </button>
        <button className="text-red-500 p-1 rounded hover:bg-red-50" title="Delete" onClick={onDelete}>
          <Trash className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
