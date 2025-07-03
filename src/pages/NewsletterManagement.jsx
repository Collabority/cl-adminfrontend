import React from 'react';

export default function NewsletterManagement() {
  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8"> {/* Responsive padding */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"> {/* Stack on small, row on sm+ */}
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">Newsletter Management</h1> {/* Responsive font size */}
          <p className="text-sm text-gray-500">
            Manage subscribers, create campaigns, and track newsletter performance.
          </p>
        </div>
        <div className="flex flex-wrap justify-start sm:justify-end items-center gap-2 mt-2 sm:mt-0"> {/* Flex wrap for badges, justify-end on sm+ */}
          <span className="text-xs sm:text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full">1,248 Subscribers</span> {/* Responsive text size */}
          <span className="text-xs sm:text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">12 Campaigns</span> {/* Responsive text size */}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"> {/* Responsive grid */}
        <Card title="Total Subscribers" value="1,248" icon="👥" delta="+12.5%" deltaColor="text-green-500" />
        <Card title="Open Rate" value="24.8%" icon="📨" delta="+2.1%" deltaColor="text-blue-500" />
        <Card title="Click Rate" value="3.2%" icon="🖱️" delta="-0.5%" deltaColor="text-red-500" />
        <Card title="Unsubscribe Rate" value="0.8%" icon="👤" delta="-0.2%" deltaColor="text-green-500" />
      </div>

      {/* Tabs */}
      <div className="mb-4 border-b flex flex-wrap gap-x-6 gap-y-2 text-sm"> {/* Flex-wrap for tabs on small screens */}
        <button className="border-b-2 border-blue-500 pb-2 font-medium whitespace-nowrap">Subscribers</button>
        <button className="text-gray-500 pb-2 whitespace-nowrap">Campaigns</button>
        <button className="text-gray-500 pb-2 whitespace-nowrap">Segments</button>
      </div>

      {/* Filter and Actions */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-4 items-stretch sm:items-center"> {/* Stack on small, row on sm+, items-stretch for full height inputs */}
        <input
          type="text"
          placeholder="Search by email or name..."
          className="border px-3 py-2 rounded w-full sm:flex-1 text-gray-500" // w-full on mobile, flex-1 on sm+
        />
        <select className="border px-3 py-2 rounded w-full sm:w-auto"> {/* w-full on mobile, auto on sm+ */}
          <option>All Status</option>
          <option>Active</option>
          <option>Unsubscribed</option>
          <option>Bounced</option>
        </select>
        <select className="border px-3 py-2 rounded w-full sm:w-auto"> {/* w-full on mobile, auto on sm+ */}
          <option>All Segments</option>
          <option>General</option>
          <option>Customers</option>
          <option>Prospects</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto">+ Add Subscriber</button> {/* w-full on mobile, auto on sm+ */}
        <button className="border px-4 py-2 rounded w-full sm:w-auto whitespace-nowrap">:🟰 Bulk Actions</button> {/* w-full on mobile, auto on sm+, whitespace-nowrap */}
      </div>

      {/* Subscribers Table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200"> {/* Added overflow-x-auto here */}
        <table className="w-full text-sm"> {/* Removed border-t from table, added to wrapper */}
          <thead>
            <tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-200"> {/* Added bg and border */}
              <th className="p-3"> {/* Adjusted padding */}
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="p-3 whitespace-nowrap">Email</th> {/* Adjusted padding, nowrap */}
              <th className="p-3 whitespace-nowrap hidden sm:table-cell">Name</th> {/* Hidden on xs, visible sm+ */}
              <th className="p-3 whitespace-nowrap">Status</th>
              <th className="p-3 whitespace-nowrap hidden md:table-cell">Segment</th> {/* Hidden on sm, visible md+ */}
              <th className="p-3 whitespace-nowrap hidden lg:table-cell">Subscribed</th> {/* Hidden on md, visible lg+ */}
              <th className="p-3 whitespace-nowrap">Actions</th>
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
    </div>
  );
}

function Card({ title, value, icon, delta, deltaColor }) {
  return (
    <div className="bg-white border p-4 rounded-lg shadow-sm"> {/* Added rounded-lg for consistency */}
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        <span className="text-xl">{icon}</span> {/* Increased icon size */}
      </div>
      <div className="text-2xl font-semibold">{value}</div> {/* Increased value size */}
      <div className={`text-xs mt-1 ${deltaColor}`}>{delta} from last campaign</div>
    </div>
  );
}

function Row({ email, name, status, segment, date, color }) {
  return (
    <tr className="border-t hover:bg-gray-50"> {/* Added hover effect */}
      <td className="p-3"><input type="checkbox" className="rounded border-gray-300" /></td> {/* Adjusted padding */}
      <td className="p-3 whitespace-nowrap">
        <div className="font-medium text-gray-900">{email}</div>
      </td>
      <td className="p-3 whitespace-nowrap hidden sm:table-cell"> {/* Hidden on xs, visible sm+ */}
        <div className="text-gray-900">{name}</div>
      </td>
      <td className="p-3 whitespace-nowrap">
        <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">{status}</span> {/* Added font-medium */}
      </td>
      <td className="p-3 whitespace-nowrap hidden md:table-cell"> {/* Hidden on sm, visible md+ */}
        <span className={`bg-${color}-100 text-${color}-600 px-2 py-1 rounded-full text-xs font-medium`}>{segment}</span> {/* Added font-medium */}
      </td>
      <td className="p-3 whitespace-nowrap text-gray-500 hidden lg:table-cell">{date}</td> {/* Hidden on md, visible lg+ */}
      <td className="p-3 whitespace-nowrap space-x-2">
        <button className="text-blue-500 p-1 rounded hover:bg-blue-50">✏️</button> {/* Added padding and hover */}
        <button className="text-red-500 p-1 rounded hover:bg-red-50">🗑️</button> {/* Added padding and hover */}
      </td>
    </tr>
  );
}