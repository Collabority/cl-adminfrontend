import React, { useState } from "react";

const mockQueries = [
  {
    id: 1,
    status: "Unread",
    name: "John Smith",
    email: "john.smith@email.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    subject: "Website Development Inquiry",
    message: "I'm interested in developing a new e-commerce website...",
    date: "2024-12-15T14:30:00",
    priority: "High",
  },
  {
    id: 2,
    status: "Replied",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    subject: "Mobile App Quote Request",
    message: "We need a mobile application for our restaurant...",
    date: "2024-12-14T10:15:00",
    priority: "Medium",
  },
  {
    id: 3,
    status: "Read",
    name: "Mike Wilson",
    email: "mike.wilson@startup.com",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    subject: "UI/UX Design Services",
    message: "Looking for UI/UX design services for our fintech app...",
    date: "2024-12-13T16:45:00",
    priority: "Low",
  },
];

const statusColors = {
  Unread: "bg-red-100 text-red-500",
  Replied: "bg-green-100 text-green-600",
  Read: "bg-blue-100 text-blue-500",
};

const priorityColors = {
  High: "bg-red-100 text-red-500",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-gray-100 text-gray-500",
};

const ContactQueries = () => {
  const [queries] = useState(mockQueries);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-semibold">Contact Queries</h1>
        <div className="flex gap-2">
          <button className="flex items-center border border-gray-300 rounded-lg px-4 py-2 text-gray-700 font-semibold bg-white shadow-sm hover:bg-gray-50 transition text-base">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Export CSV
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-bold transition text-base shadow-sm">
            Mark All Read
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <span className="flex items-center gap-1 text-sm">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
          12 Unread
        </span>
        <span className="flex items-center gap-1 text-sm">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          45 Total
        </span>
      </div>
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by name, email, or subject."
            className="w-full md:w-1/3 border border-gray-200 text-sm rounded-lg py-2 px-4"
          />
          <select className="border border-gray-200 text-sm rounded-lg py-2 px-3">
            <option>All Status</option>
          </select>
          <select className="border border-gray-200 text-sm rounded-lg py-2 px-3">
            <option>All Priority</option>
          </select>
          <input
            type="date"
            className="border border-gray-200 text-sm rounded-lg py-2 px-3"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-xs text-gray-400 uppercase border-b">
                <th className="py-2 px-4 text-left">
                  <input type="checkbox"  />
                </th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Contact Info</th>
                <th className="py-2 px-4 text-left">Subject</th>
                <th className="py-2 px-4 text-left">Message</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Priority</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((q) => (
                <tr key={q.id} className="border-b last:border-b-0">
                  <td className="py-3 px-4">
                    <input type="checkbox" checked readOnly />
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[q.status]}`}>
                      ● {q.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img src={q.avatar} alt={q.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="font-semibold text-sm text-black">{q.name}</div>
                      <div className="text-gray-400 text-xs">{q.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-black text-sm max-w-xs truncate">{q.subject}</td>
                  <td className="py-3 px-4 text-gray-600 text-sm max-w-xs truncate">{q.message}</td>
                  <td className="py-3 px-4 text-black text-sm">
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {new Date(q.date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
                      </span>
                      <span className="text-xs text-gray-400 font-semibold">
                        {new Date(q.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[q.priority]}`}>{q.priority}</span>
                  </td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <button title="View" className="text-blue-600 hover:text-blue-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </button>
                    <button title="Reply" className="text-green-600 hover:text-green-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l-5 5m0 0l-5-5m5 5V4" /></svg>
                    </button>
                    <button title="Delete" className="text-red-600 hover:text-red-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactQueries;