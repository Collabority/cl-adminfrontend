import React, { useState } from 'react';
import { Eye, Pencil, Trash } from 'lucide-react';

const allSubscribers = [
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

  const filteredSubscribers = allSubscribers.filter(sub => {
    const matchesSearch =
      sub.email.toLowerCase().includes(search.toLowerCase()) ||
      sub.name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === 'All Status' || sub.status === status;

    const matchesSegment =
      segment === 'All Segments' || sub.segment === segment;

    return matchesSearch && matchesStatus && matchesSegment;
  });

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Newsletter Management</h1>
          <p className="text-sm text-gray-500">
            Manage subscribers, create campaigns, and track newsletter performance.
          </p>
        </div>
        <div className="flex flex-wrap justify-start sm:justify-end items-center gap-2 mt-2 sm:mt-0">
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
        <button className="text-gray-500 pb-2 whitespace-nowrap">Campaigns</button>
        <button className="text-gray-500 pb-2 whitespace-nowrap">Segments</button>
      </div>

      {/* Filter and Actions */}
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto">+ Add Subscriber</button>
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
                email={sub.email}
                name={sub.name}
                status={sub.status}
                segment={sub.segment}
                date={sub.date}
                color={sub.color}
              />
            ))}
          </tbody>
        </table>
      </div>
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

function Row({ email, name, status, segment, date, color }) {
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
        <span className={`bg-${color}-100 text-${color}-600 px-2 py-1 rounded-full text-xs font-medium`}>
          {segment}
        </span>
      </td>
      <td className="p-3 whitespace-nowrap text-gray-500 hidden lg:table-cell">{date}</td>
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
