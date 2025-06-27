import React from 'react';

export default function NewsletterManagement() {
  return (
    <div className="min-h-screen bg-white p-6 text-gray-800">
      <div className="mb-6 flex justify-between items-center">
        <div>
        <h1 className="text-2xl font-semibold">Newsletter Management</h1>
        <p className="text-sm text-gray-500">
          Manage subscribers, create campaigns, and track newsletter performance.
        </p>
        </div>
        <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <span className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full">1,248 Subscribers</span>
          <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">12 Campaigns</span>
        </div>
      </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card title="Total Subscribers" value="1,248" icon="👥" delta="+12.5%" deltaColor="text-green-500" />
        <Card title="Open Rate" value="24.8%" icon="📨" delta="+2.1%" deltaColor="text-blue-500" />
        <Card title="Click Rate" value="3.2%" icon="🖱️" delta="-0.5%" deltaColor="text-red-500" />
        <Card title="Unsubscribe Rate" value="0.8%" icon="👤" delta="-0.2%" deltaColor="text-green-500" />
      </div>



      <div className="mb-4 border-b flex space-x-6 text-sm">
        <button className="border-b-2 border-blue-500 pb-2 font-medium">Subscribers</button>
        <button className="text-gray-500">Campaigns</button>
        <button className="text-gray-500">Segments</button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by email or name..."
          className="border px-3 py-2 rounded w-full md:w-auto text-gray-500"
        />
        <select className="border px-3 py-2 rounded">
          <option>All Status</option>
          <option>Active</option>
          <option>Unsubscribed</option>
          <option>Bounced</option>
        </select>
        <select className="border px-3 py-2 rounded">
          <option>All Segments</option>
          <option>General</option>
          <option>Customers</option>
          <option>Prospects</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">+ Add Subscriber</button>
        <button className="border px-4 py-2 rounded">:🟰 Bulk Actions</button>
      </div>

      <table className="w-full text-sm border-t">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="p-2"><input type="checkbox" /></th>
            <th className="p-2">Email</th>
            <th className="p-2">Name</th>
            <th className="p-2">Status</th>
            <th className="p-2">Segment</th>
            <th className="p-2">Subscribed</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <Row
            email="john.doe@email.com"
            name="John Doe"
            status="Active"
            segment="Customers"
            date="Dec 10, 2024"
            color="blue"
          />
          <Row
            email="sarah.smith@company.com"
            name="Sarah Smith"
            status="Active"
            segment="Prospects"
            date="Dec 8, 2024"
            color="purple"
          />
        </tbody>
      </table>
    </div>
  );
}

function Card({ title, value, icon, delta, deltaColor }) {
  return (
    <div className="bg-white border p-4 rounded shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        <span>{icon}</span>
      </div>
      <div className="text-xl font-semibold">{value}</div>
      <div className={`text-xs mt-1 ${deltaColor}`}>{delta} from last campaign</div>
    </div>
  );
}

function Row({ email, name, status, segment, date, color }) {
  return (
    <tr className="border-t">
      <td className="p-2"><input type="checkbox" /></td>
      <td className="p-2">{email}</td>
      <td className="p-2">{name}</td>
      <td className="p-2">
        <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">{status}</span>
      </td>
      <td className="p-2">
        <span className={`bg-${color}-100 text-${color}-600 px-2 py-1 rounded-full text-xs`}>{segment}</span>
      </td>
      <td className="p-2">{date}</td>
      <td className="p-2 space-x-2">
        <button className="text-blue-500">✏️</button>
        <button className="text-red-500">🗑️</button>
      </td>
    </tr>
  );
}
