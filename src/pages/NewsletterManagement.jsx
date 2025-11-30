import React, { useState, useEffect } from "react";
import { Pencil, Trash, Eye } from "lucide-react";
import instance from "../lib/axios";
import { SubscribersDetails } from "../components/SubscribersDetails";
// ⭐ Import both big forms
import AddNewSubscriber from "./AddNewSubscriber"; 
import EditSubscriber from "./EditSubscriber"; 

const initialSubscribers = [
  {
    _id: "local-1",
    email: "john.doe@email.com",
    name: "John Doe",
    status: "Active",
    segment: "Customers",
    createdAt: "2024-12-10T00:00:00.000Z",
    color: "blue",
  },
];
  
export default function NewsletterManagement() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [segment, setSegment] = useState("All Segments");
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  
  const [editingSubscriber, setEditingSubscriber] = useState(null);

  // View Toggle State for Adding
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // View Modal State (for read-only view)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);

  useEffect(() => {
    async function getAllNewsletterMembers() {
      try {
        const response = await instance.get("/newsletter/getAll");
        const raw = response?.data?.data;
        if (Array.isArray(raw)) {
          const normalized = raw.map((s) => ({
            _id: s._id || s.id,
            email: s.email,
            name: s.name,
            status: s.status ? capitalize(s.status) : "Active",
            segment: s.segment ? capitalize(s.segment) : "General",
            createdAt: s.createdAt || new Date().toISOString(),
            color: segmentToColor(s.segment),
            // Pass through all fields needed for the Big Edit Form
            phone: s.phone,
            company: s.company,
            jobTitle: s.jobTitle,
            location: s.location,
            source: s.source,
            allSegments: s.allSegments,
            tags: s.tags,
            preferences: s.preferences,
            notes: s.notes
          }));
          setSubscribers(normalized);
        }
      } catch (err) {
        console.error("Failed to fetch subscribers:", err);
      }
    }
    getAllNewsletterMembers();
  }, []);

  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesSearch =
      (sub.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (sub.name || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "All Status" || sub.status === status;
    const matchesSegment = segment === "All Segments" || sub.segment === segment;
    return matchesSearch && matchesStatus && matchesSegment;
  });

  function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function segmentToColor(seg) {
    if (!seg) return "gray";
    const key = capitalize(seg);
    if (key === "Customers") return "green";
    if (key === "Prospects") return "blue";
    if (key === "General") return "purple";
    return "gray";
  }

  // --- Handlers ---

  const handleView = (subscriber) => {
    setSelectedSubscriber(subscriber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubscriber(null);
  };

  // 1. ADD Handler
  const handleAddSave = async (formData) => {
    setIsLoading(true);
    try {
      const response = await instance.post("/newsletter/create", formData);
      
      const newSubscriber = {
        ...response.data.data, 
        color: segmentToColor(response.data.data.segment),
      };

      setSubscribers((prev) => [newSubscriber, ...prev]);
      
      setIsAdding(false);
      alert("Subscriber added successfully!");
    } catch (err) {
      console.error("Failed to add subscriber:", err);
      const msg = err.response?.data?.message || "Failed to add subscriber.";
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // 2. EDIT Trigger Handler (Opens the Big Form)
  const handleEditClick = (sub) => {
    setEditingSubscriber(sub); // This triggers the conditional render below
  };

  // 3. UPDATE Save Handler (Called by EditSubscriber.jsx)
  const handleUpdateSubscriber = async (id, updatedData) => {
    setIsLoading(true);
    try {
      await instance.put(`/newsletter/update/${id}`, updatedData);
      
      // Update local list immediately
      setSubscribers((prev) =>
        prev.map((s) => (s._id === id ? { 
            ...s, 
            ...updatedData, 
            color: segmentToColor(updatedData.segment) 
        } : s))
      );
      
      setEditingSubscriber(null); // Close Edit View, go back to table
      alert("Subscriber updated successfully!");
    } catch (err) {
      console.error("Failed to update subscriber:", err);
      alert("Failed to save changes.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subscriber?")) return;
    try {
      await instance.delete(`/newsletter/delete/${id}`);
      setSubscribers((prev) => prev.filter((sub) => sub._id !== id));
    } catch (err) {
      console.error("Failed to delete subscriber:", err);
      alert("Failed to delete subscriber");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const payload = { status: newStatus };
      await instance.put(`/newsletter/update/${id}`, payload);
      setSubscribers((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: newStatus } : s))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status");
    }
  };

  // --- CONDITIONAL VIEWS ---

  // View 1: Adding New Subscriber (Big Form)
  if (isAdding) {
    return (
      <AddNewSubscriber 
        onSave={handleAddSave} 
        onCancel={() => setIsAdding(false)} 
        isLoading={isLoading} 
      />
    );
  }

  // View 2: Editing Existing Subscriber (Big Form)
  // 
  if (editingSubscriber) {
    return (
      <EditSubscriber 
        subscriber={editingSubscriber}
        onSave={handleUpdateSubscriber}
        onCancel={() => setEditingSubscriber(null)}
        isLoading={isLoading}
      />
    );
  }

  // View 3: Main Dashboard (Table)
  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Newsletter Management</h1>
          <p className="text-base text-gray-500">
            Manage subscribers and track newsletter performance.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
          <span className="text-base bg-green-100 text-green-600 px-3 py-1 rounded-full">
            {subscribers.length.toLocaleString()} Subscribers
          </span>
          <span className="text-base bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
            12 Campaigns
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card title="Total Subscribers" value={subscribers.length.toLocaleString()} icon="👥" delta="+12.5%" deltaColor="text-green-500" />
        <Card title="Open Rate" value="24.8%" icon="📨" delta="+2.1%" deltaColor="text-blue-500" />
        <Card title="Click Rate" value="3.2%" icon="🖱️" delta="-0.5%" deltaColor="text-red-500" />
        <Card title="Unsubscribe Rate" value="0.8%" icon="👤" delta="-0.2%" deltaColor="text-green-500" />
      </div>

      {/* Tabs */}
      <div className="mb-4 border-b flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <button className="border-b-2 border-blue-500 pb-2 font-medium text-base whitespace-nowrap">
          Subscribers
        </button>
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
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border px-3 py-2 rounded w-full sm:w-auto">
          <option>All Status</option>
          <option>Active</option>
          <option>Unsubscribed</option>
          <option>Bounced</option>
        </select>
        <select value={segment} onChange={(e) => setSegment(e.target.value)} className="border px-3 py-2 rounded w-full sm:w-auto">
          <option>All Segments</option>
          <option>General</option>
          <option>Customers</option>
          <option>Prospects</option>
        </select>
        
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto hover:bg-blue-700"
        >
          + Add Subscriber
        </button>
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
                key={sub._id || sub.email || index}
                {...sub}
                onView={() => handleView(sub)}
                onEdit={() => handleEditClick(sub)} // ⭐ Triggers the Big Edit Form
                onDelete={() => handleDelete(sub._id)}
                onStatusChange={(newStatus) => handleStatusChange(sub._id, newStatus)}
              />
            ))}
            <SubscribersDetails
              isOpen={isModalOpen}
              onClose={closeModal}
              subscriber={selectedSubscriber}
            />
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
        <h4 className="text-base font-medium text-gray-500">{title}</h4>
        <span className="text-xl">{icon}</span>
      </div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className={`text-base mt-1 ${deltaColor}`}>
        {delta} from last campaign
      </div>
    </div>
  );
}

function Row({ email, name, status, segment, createdAt, color, onView, onEdit, onDelete, onStatusChange }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="p-3"><input type="checkbox" className="rounded border-gray-300" /></td>
      <td className="p-3 whitespace-nowrap"><div className="font-medium text-gray-900">{email}</div></td>
      <td className="p-3 whitespace-nowrap hidden sm:table-cell"><div className="text-gray-900">{name}</div></td>
      <td className="p-3 whitespace-nowrap">
        <select
          className={`px-3 py-1 rounded-full text-xs font-semibold focus:outline-none ${
            status === "Active" ? "bg-green-100 text-green-600" : 
            status === "Unsubscribed" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
          }`}
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          style={{ minWidth: 100 }}
        >
          <option value="Active">Active</option>
          <option value="Unsubscribed">Unsubscribed</option>
          <option value="Bounced">Bounced</option>
        </select>
      </td>
      <td className="p-3 whitespace-nowrap hidden md:table-cell">
        <span className={`${colorMap[color] || "bg-gray-100 text-gray-600"} px-2 py-1 rounded-full text-xs font-medium`}>
          {segment}
        </span>
      </td>
      <td className="p-3 whitespace-nowrap text-gray-500 hidden lg:table-cell">
        {createdAt ? new Date(createdAt).toLocaleString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "-"}
      </td>
      <td className="p-3 whitespace-nowrap space-x-2">
        <button className="text-green-600 p-1 rounded hover:bg-green-50" title="View" onClick={onView}><Eye className="w-4 h-4" /></button>
        <button className="text-blue-500 p-1 rounded hover:bg-blue-50" title="Edit" onClick={onEdit}><Pencil className="w-4 h-4" /></button>
        <button className="text-red-500 p-1 rounded hover:bg-red-50" title="Delete" onClick={onDelete}><Trash className="w-4 h-4" /></button>
      </td>
    </tr>
  );
}