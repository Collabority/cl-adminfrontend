import React, { useState, useEffect } from "react";
import instance from "../lib/axios";

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
  Archived: "bg-gray-100 text-gray-500",
};

const priorityColors = {
  High: "bg-red-100 text-red-500",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-gray-100 text-gray-500",
};

const ContactQueries = () => {
  const [queries, setQueries] = useState(mockQueries);
  const [myQueries, setMyQueries] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [priority, setPriority] = useState("All Priority");

  useEffect(() => {
    async function getAllQueries() {
      try {
        const response = await instance.get("/contact/getAllQueries");
        const data = response.data.data;
        // Normalize status and priority to match color keys
        const normalized = data.map((q) => ({
          ...q,
          status: q.status
            ? q.status.charAt(0).toUpperCase() + q.status.slice(1).toLowerCase()
            : "Unread",
          priority: q.priority
            ? q.priority.charAt(0).toUpperCase() +
              q.priority.slice(1).toLowerCase()
            : "Medium",
          avatar:
            q.avatar ||
            q.profile ||
            "https://randomuser.me/api/portraits/men/32.jpg",
          name: q.name || q.from || "",
          email: q.email || q.from || "",
          id: q.id || q._id,
        }));
        setMyQueries(normalized);
      } catch (error) {
        setMyQueries([]);
      }
    }
    getAllQueries();
  }, []);

  // Default value: today's date in yyyy-mm-dd format
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const handleStatusChange = async (id, newStatus) => {
    const response = await instance.put(`/contact/updateStatus/${id}`, {
      status: newStatus,
    });
    if (!response.data.success) {
      alert("Failed to update status");
    }
    setMyQueries((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
  };
  const handlePriorityChange = async (id, newPriority) => {
    const response = await instance.put(`/contact/updatePriority/${id}`, {
      priority: newPriority,
    });
    if (!response.data.success) {
      alert("Failed to update priority");
    }
    setMyQueries((prev) =>
      prev.map((q) => (q.id === id ? { ...q, priority: newPriority } : q))
    );
  };
  const handleView = (q) => {
    alert(
      `Contact Query Details:\n\nName: ${q.name}\nEmail: ${q.email}\nSubject: ${q.subject}\nMessage: ${q.message}\nStatus: ${q.status}\nPriority: ${q.priority}`
    );
  };
  const handleReply = (q) => {
    alert(`Reply to: ${q.name} <${q.email}>`);
    window.location.href = `mailto:${q.email}`;
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this query?")) {
      const response = await instance.delete(`/contact/deleteQuery/${id}`);
      if (!response.data.success) {
        alert("Failed to delete query");
      }
      setMyQueries((prev) => prev.filter((q) => q.id !== id));
    }
  };

  const filteredQueries = myQueries.filter(
    (q) =>
      (status === "All Status" || q.status === status) &&
      (priority === "All Priority" || q.priority === priority) &&
      (q.name.toLowerCase().includes(search.toLowerCase()) ||
        q.email.toLowerCase().includes(search.toLowerCase()) ||
        q.subject.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
        <h1 className="text-2xl font-semibold">Contact Queries</h1>
        <div className="flex gap-2 w-full sm:w-auto"></div>
      </div>
      <div className="flex items-center gap-4 mb-4 flex-col sm:flex-row">
        <span className="flex items-center gap-1 text-base">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
          {myQueries.filter((q) => q.status === "Unread").length} Unread
        </span>
        <span className="flex items-center gap-1 text-base">
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          {myQueries.length} Total
        </span>
      </div>
      {/* Filters/Search Bar Card Start */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:flex-wrap md:gap-4 md:items-center gap-3 mb-6">
        <div className="flex-1 flex flex-col sm:flex-row md:flex-wrap gap-2 md:gap-4 w-full">
          <div className="relative w-full sm:w-72 md:w-64 min-w-0 flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or subject."
              className="w-full border border-gray-200 text-xs sm:text-sm rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-100"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
          </div>
          <select
            className="border border-gray-200 text-xs sm:text-sm rounded-lg py-2 px-3 w-full sm:w-auto md:w-40 min-w-0 flex-1"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Unread</option>
            <option>Read</option>
            <option>Replied</option>
            <option>Archived</option>
          </select>
          <select
            className="border border-gray-200 text-xs sm:text-sm rounded-lg py-2 px-3 w-full sm:w-auto md:w-40 min-w-0 flex-1"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>All Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-200 text-xs sm:text-sm rounded-lg py-2 px-3 w-full sm:w-auto md:w-40 min-w-0 flex-1"
          />
        </div>
      </div>
      {/* Table Section Start */}
      <div className="bg-white rounded-xl shadow p-2 sm:p-4 mb-6 overflow-x-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm">
            <thead>
              <tr className="text-xs text-gray-400 uppercase border-b">
                <th className="py-2 px-8 text-left">Status</th>
                <th className="py-2 px-8 text-left">Contact Info</th>
                <th className="py-2 px-8 text-left">Subject</th>
                <th className="py-2 px-8 text-left">Message</th>
                <th className="py-2 px-8 text-left">Priority</th>
                <th className="py-2 px-8 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQueries.map((q) => (
                <tr key={q._id} className="border-b last:border-b-0">
                  <td className="py-3 px-8">
                    <select
                      className={`px-4 py-1 rounded-full text-xs font-semibold focus:outline-none ${
                        statusColors[q.status]
                      }`}
                      value={q.status}
                      onChange={(e) => handleStatusChange(q.id, e.target.value)}
                      style={{ minWidth: 90 }}
                    >
                      <option value="Unread">● Unread</option>
                      <option value="Read">● Read</option>
                      <option value="Replied">● Replied</option>
                      <option value="Archived">● Archived</option>
                    </select>
                  </td>
                  <td className="py-3 px-8 flex items-center gap-3">
                    <img
                      src={q.avatar}
                      alt={q.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-sm text-black">
                        {q.name}
                      </div>
                      <div className="text-gray-400 text-xs">{q.from}</div>
                    </div>
                  </td>
                  <td className="py-3 px-8 text-black text-sm max-w-xs truncate">
                    {q.subject}
                  </td>
                  <td className="py-3 px-8 text-gray-600 text-sm max-w-xs truncate">
                    {q.message}
                  </td>
                  <td className="py-3 px-8">
                    <select
                      className={`px-3 py-1 rounded-full text-xs font-semibold focus:outline-none ${
                        priorityColors[q.priority]
                      }`}
                      value={q.priority}
                      onChange={(e) =>
                        handlePriorityChange(q.id, e.target.value)
                      }
                      style={{ minWidth: 70 }}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </td>
                  <td className="py-3 px-8 flex items-center gap-1">
                    <button
                      title="View"
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleView(q)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button
                      title="Reply"
                      className="text-green-600 hover:text-green-800"
                      onClick={() => handleReply(q)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10 19l-7-7 7-7v4h8a4 4 0 014 4v6h-2v-6a2 2 0 00-2-2h-8v4z" />
                      </svg>
                    </button>
                    <button
                      title="Delete"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(q.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredQueries.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center text-gray-400 py-6 text-base"
                  >
                    No queries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Table Section End */}
    </div>
  );
};

export default ContactQueries;
