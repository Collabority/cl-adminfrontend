import React, { useState, useEffect } from "react";
// ✅ 1. Import icons from lucide-react for better visibility and consistency
import { Eye, Mail, Trash2, Search, Filter, AlertCircle } from "lucide-react"; 
import instance from "../lib/axios";
import { ContactQueryView } from "../components/ContactQueryView";

// ✅ 2. Enhanced Color Maps for Status & Priority
const statusColors = {
  Unread: "bg-red-100 text-red-600 border border-red-200",
  Replied: "bg-green-100 text-green-600 border border-green-200",
  Read: "bg-blue-100 text-blue-600 border border-blue-200",
  Archived: "bg-gray-100 text-gray-600 border border-gray-200",
};

const priorityColors = {
  High: "bg-red-50 text-red-600 border border-red-200",
  Medium: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Low: "bg-gray-50 text-gray-600 border border-gray-200",
};

const ContactQueries = () => {
  // --- STATE MANAGEMENT ---
  const [myQueries, setMyQueries] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [priority, setPriority] = useState("All Priority");
  const [loading, setLoading] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState(null);

  // Default date (Today)
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  // --- FETCH DATA ---
  useEffect(() => {
    async function getAllQueries() {
      try {
        setLoading(true);
        const response = await instance.get("/contact/getAllQueries");
        const data = response.data.data;
        
        // Normalize data to ensure safe rendering
        const normalized = data.map((q) => ({
          ...q,
          status: q.status
            ? q.status.charAt(0).toUpperCase() + q.status.slice(1).toLowerCase()
            : "Unread",
          priority: q.priority
            ? q.priority.charAt(0).toUpperCase() + q.priority.slice(1).toLowerCase()
            : "Medium",
          // Use UI Avatars if no image provided
          avatar: q.avatar || q.profile || `https://ui-avatars.com/api/?name=${q.name || "User"}&background=random`,
          name: q.name || q.from || "Unknown User",
          email: q.email || q.from || "No Email",
          id: q.id || q._id,
          date: q.date || q.createdAt,
          subject: q.subject || "No Subject",
          message: q.message || "",
        }));

        setMyQueries(normalized);
      } catch (error) {
        console.error("Error fetching queries:", error);
        setMyQueries([]);
      } finally {
        setLoading(false);
      }
    }
    getAllQueries();
  }, []);

  // --- HANDLERS ---

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await instance.put(`/contact/updateStatus/${id}`, {
        status: newStatus,
      });
      if (response.data.success) {
        setMyQueries((prev) =>
          prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
        );
      }
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const handlePriorityChange = async (id, newPriority) => {
    try {
      const response = await instance.put(`/contact/updatePriority/${id}`, {
        priority: newPriority,
      });
      if (response.data.success) {
        setMyQueries((prev) =>
          prev.map((q) => (q.id === id ? { ...q, priority: newPriority } : q))
        );
      }
    } catch (error) {
      alert("Failed to update priority");
    }
  };

  const handleView = (query) => {
    setSelectedQuery(query);
  };

  const handleReply = (q) => {
    // Opens default email client with Subject pre-filled
    window.location.href = `mailto:${q.email}?subject=Re: ${q.subject}`;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this query?")) {
      try {
        const response = await instance.delete(`/contact/deleteQuery/${id}`);
        if (response.data.success) {
          setMyQueries((prev) => prev.filter((q) => q.id !== id));
        }
      } catch (error) {
        alert("Failed to delete query");
      }
    }
  };

  // --- FILTERING LOGIC ---
  const filteredQueries = myQueries.filter((q) => {
    const matchesSearch = 
      (q.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (q.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (q.subject || "").toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = status === "All Status" || q.status === status;
    const matchesPriority = priority === "All Priority" || q.priority === priority;
    
    // Optional: Filter by date if needed (currently just setting state but not filtering)
    // const matchesDate = q.date.startsWith(date);

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // --- RENDER ---
  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-col sm:flex-row gap-4">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Contact Queries</h1>
            <p className="text-gray-500 text-sm">Manage incoming messages from your website.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex items-center gap-4 mb-6 flex-col sm:flex-row">
        <div className="bg-white px-5 py-3 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <div>
                <span className="block font-bold text-gray-800 text-lg leading-none">
                    {myQueries.filter((q) => q.status === "Unread").length}
                </span>
                <span className="text-gray-500 text-xs uppercase font-semibold tracking-wide">Unread</span>
            </div>
        </div>
        <div className="bg-white px-5 py-3 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
            <div>
                <span className="block font-bold text-gray-800 text-lg leading-none">
                    {myQueries.length}
                </span>
                <span className="text-gray-500 text-xs uppercase font-semibold tracking-wide">Total</span>
            </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or subject..."
              className="w-full border border-gray-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <select
                className="border border-gray-200 text-sm rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500 bg-white cursor-pointer"
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
                className="border border-gray-200 text-sm rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500 bg-white cursor-pointer"
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
                className="border border-gray-200 text-sm rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500 bg-white cursor-pointer"
              />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="py-3 px-6 font-semibold text-gray-600 whitespace-nowrap">Status</th>
                <th className="py-3 px-6 font-semibold text-gray-600 whitespace-nowrap">Contact Info</th>
                <th className="py-3 px-6 font-semibold text-gray-600 whitespace-nowrap">Subject & Message</th>
                <th className="py-3 px-6 font-semibold text-gray-600 whitespace-nowrap">Priority</th>
                <th className="py-3 px-6 font-semibold text-gray-600 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                 <tr>
                    <td colSpan="5" className="text-center py-12">
                        <div className="flex justify-center items-center gap-2 text-gray-500">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                            Loading queries...
                        </div>
                    </td>
                 </tr>
              ) : filteredQueries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12">
                    <div className="flex flex-col items-center text-gray-400">
                        <Mail size={48} className="mb-4 opacity-20" />
                        <p className="text-lg font-medium">No queries found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredQueries.map((q) => (
                    <tr key={q.id} className="hover:bg-gray-50 transition-colors group">
                      
                      {/* Status Column */}
                      <td className="py-4 px-6">
                        <div className="relative">
                            <select
                            className={`px-3 py-1.5 rounded-full text-xs font-bold focus:outline-none cursor-pointer appearance-none text-center min-w-[90px] ${statusColors[q.status]}`}
                            value={q.status}
                            onChange={(e) => handleStatusChange(q.id, e.target.value)}
                            >
                            <option value="Unread">Unread</option>
                            <option value="Read">Read</option>
                            <option value="Replied">Replied</option>
                            <option value="Archived">Archived</option>
                            </select>
                        </div>
                      </td>

                      {/* Contact Info Column */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                            <img
                            src={q.avatar}
                            alt={q.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
                            onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=User"; }}
                            />
                            <div>
                            <div className="font-semibold text-gray-900 line-clamp-1">{q.name}</div>
                            <div className="text-gray-500 text-xs line-clamp-1">{q.email}</div>
                            </div>
                        </div>
                      </td>

                      {/* Subject/Message Column */}
                      <td className="py-4 px-6 max-w-[250px]">
                        <div className="font-medium text-gray-800 truncate" title={q.subject}>
                            {q.subject}
                        </div>
                        <div className="text-xs text-gray-400 mt-1 truncate">
                            {q.message}
                        </div>
                      </td>

                      {/* Priority Column */}
                      <td className="py-4 px-6">
                        <select
                          className={`px-3 py-1.5 rounded-md text-xs font-semibold focus:outline-none cursor-pointer ${priorityColors[q.priority]}`}
                          value={q.priority}
                          onChange={(e) => handlePriorityChange(q.id, e.target.value)}
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </td>
                      
                      {/* Actions Column */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <button
                            title="View Details"
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                            onClick={() => handleView(q)}
                            >
                            <Eye size={18} />
                            </button>
                            
                            <button
                            title="Reply via Email"
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-100"
                            onClick={() => handleReply(q)}
                            >
                            <Mail size={18} />
                            </button>
                            
                            <button
                            title="Delete"
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                            onClick={() => handleDelete(q.id)}
                            >
                            <Trash2 size={18} />
                            </button>
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pop-up Modal */}
      {selectedQuery && (
        <ContactQueryView
          selectedQuery={selectedQuery}
          setSelectedQuery={setSelectedQuery}
        />
      )}
    </div>
  );
};

export default ContactQueries;