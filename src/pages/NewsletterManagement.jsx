import React, { useState, useEffect } from "react";
import { Pencil, Trash, Eye } from "lucide-react";
import instance from "../lib/axios";
import { SubscribersDetails } from "../components/SubscribersDetails";

const colors = {
  Prospects: "bg-blue-100 text-blue-800",
  General: "bg-purple-100 text-purple-800",
  Customers: "bg-green-100 text-green-800",
  Unsubscribed: "bg-red-100 text-red-800",
  Active: "bg-green-100 text-green-800",
};

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
  {
    _id: "local-2",
    email: "sarah.smith@company.com",
    name: "Sarah Smith",
    status: "Active",
    segment: "Prospects",
    createdAt: "2024-12-08T00:00:00.000Z",
    color: "purple",
  },
  {
    _id: "local-3",
    email: "emily.tan@example.com",
    name: "Emily Tan",
    status: "Unsubscribed",
    segment: "General",
    createdAt: "2024-11-30T00:00:00.000Z",
    color: "green",
  },
];

export default function NewsletterManagement() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [segment, setSegment] = useState("All Segments");
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [editingSubscriberId, setEditingSubscriberId] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    status: "Active",
    segment: "General",
  });

  useEffect(() => {
    async function getAllNewsletterMembers() {
      try {
        const response = await instance.get("/newsletter");
        const raw = response?.data?.data;
        if (Array.isArray(raw)) {
          // normalize shape to expected fields
          const normalized = raw.map((s) => ({
            _id:
              s._id || s.id || s.email || Math.random().toString(36).slice(2),
            email: s.email || s.emailAddress || s.email_address || "",
            name: s.name || s.fullName || s.full_name || "",
            status:
              s.status && typeof s.status === "string"
                ? capitalize(s.status)
                : "Active",
            segment:
              s.segment && typeof s.segment === "string"
                ? capitalize(s.segment)
                : "General",
            createdAt:
              s.createdAt ||
              s.subscribedAt ||
              s.date ||
              new Date().toISOString(),
            color: segmentToColor(s.segment || s.segmentName || s.segment),
          }));
          setSubscribers(normalized);
        } else {
          // fallback if payload is not array
          setSubscribers(initialSubscribers);
        }
      } catch (err) {
        console.error("Failed to fetch subscribers:", err);
        setSubscribers(initialSubscribers);
      }
    }
    getAllNewsletterMembers();
  }, []);

  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesSearch =
      (sub.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (sub.name || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "All Status" || sub.status === status;
    const matchesSegment =
      segment === "All Segments" || sub.segment === segment;
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);

  const handleView = (subscriber) => {
    setSelectedSubscriber(subscriber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubscriber(null);
  };

  const handleEdit = (sub) => {
    setEditingSubscriberId(sub._id);
    setEditForm({
      name: sub.name || "",
      email: sub.email || "",
      status: sub.status || "Active",
      segment: sub.segment || "General",
    });
  };

  const handleEditSave = async () => {
    const id = editingSubscriberId;
    if (!id) return;
    try {
      // Optimistic update locally
      setSubscribers((prev) =>
        prev.map((s) => (s._id === id ? { ...s, ...editForm } : s))
      );
      setEditingSubscriberId(null);
      // Call API to persist
      await instance.put(`/newsletter/${id}`, {
        name: editForm.name,
        email: editForm.email,
        segment: editForm.segment,
        status: editForm.status,
      });
    } catch (err) {
      console.error("Failed to save edit:", err);
      alert("Failed to save subscriber. Changes reverted.");
      // revert by refetching or minimal rollback; refetch for simplicity
      try {
        const resp = await instance.get("/newsletter");
        const raw = resp?.data?.data || [];
        const normalized = raw.map((s) => ({
          _id: s._id || s.id || s.email || Math.random().toString(36).slice(2),
          email: s.email || s.emailAddress || "",
          name: s.name || "",
          status: capitalize(s.status),
          segment: capitalize(s.segment),
          createdAt: s.createdAt || new Date().toISOString(),
          color: segmentToColor(s.segment),
        }));
        setSubscribers(normalized);
      } catch (e) {
        console.error("Failed to reload subscribers:", e);
      }
    }
  };

  const handleDelete = async (emailOrId) => {
    if (!window.confirm("Are you sure you want to delete this subscriber?"))
      return;
    try {
      // Accept both id and email; prefer id if present in object
      const id = emailOrId;
      const response = await instance.delete(`/newsletter/${id}`);
      if (response.status === 200 || response.status === 204) {
        setSubscribers((prev) => prev.filter((sub) => sub._id !== id));
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      console.error("Failed to delete subscriber:", err);
      alert("Failed to delete subscriber");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const payload = { status: newStatus };
      const response = await instance.put(`/newsletter/${id}`, payload);
      if (response.status === 200) {
        setSubscribers((prev) =>
          prev.map((s) => (s._id === id ? { ...s, status: newStatus } : s))
        );
      } else {
        throw new Error("Failed to update status");
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status");
    }
  };

  const handleUpdateNewsletter = async (id, updatedFields) => {
    try {
      const response = await instance.put(`/newsletter/${id}`, updatedFields);
      if (response.status === 200) {
        setSubscribers((prev) =>
          prev.map((s) => (s._id === id ? { ...s, ...updatedFields } : s))
        );
      } else {
        throw new Error("Failed to update");
      }
    } catch (err) {
      console.error("Failed to update newsletter subscriber:", err);
      alert("Failed to update subscriber");
    }
  };

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
        <Card
          title="Total Subscribers"
          value={subscribers.length.toLocaleString()}
          icon="👥"
          delta="+12.5%"
          deltaColor="text-green-500"
        />
        <Card
          title="Open Rate"
          value="24.8%"
          icon="📨"
          delta="+2.1%"
          deltaColor="text-blue-500"
        />
        <Card
          title="Click Rate"
          value="3.2%"
          icon="🖱️"
          delta="-0.5%"
          deltaColor="text-red-500"
        />
        <Card
          title="Unsubscribe Rate"
          value="0.8%"
          icon="👤"
          delta="-0.2%"
          deltaColor="text-green-500"
        />
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto">
          + Add Subscriber
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 bg-gray-50 border-b border-gray-200">
              <th className="p-3">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="p-3 whitespace-nowrap">Email</th>
              <th className="p-3 whitespace-nowrap hidden sm:table-cell">
                Name
              </th>
              <th className="p-3 whitespace-nowrap">Status</th>
              <th className="p-3 whitespace-nowrap hidden md:table-cell">
                Segment
              </th>
              <th className="p-3 whitespace-nowrap hidden lg:table-cell">
                Subscribed
              </th>
              <th className="p-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscribers.map((sub, index) => (
              <Row
                key={sub._id || sub.email || index}
                {...sub}
                onView={() => handleView(sub)}
                onEdit={() => handleEdit(sub)}
                onDelete={() => handleDelete(sub._id)}
                onStatusChange={(newStatus) =>
                  handleStatusChange(sub._id, newStatus)
                }
              />
            ))}{" "}
            <SubscribersDetails
              isOpen={isModalOpen}
              onClose={closeModal}
              subscriber={selectedSubscriber}
            />
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingSubscriberId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Subscriber</h2>
            <div className="mb-2">
              <label className="block text-base font-medium">Name</label>
              <input
                className="w-full border rounded px-2 py-1"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div className="mb-2">
              <label className="block text-base font-medium">Email</label>
              <input
                className="w-full border rounded px-2 py-1"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, email: e.target.value }))
                }
              />
            </div>
            <div className="mb-2">
              <label className="block text-base font-medium">Segment</label>
              <input
                className="w-full border rounded px-2 py-1"
                value={editForm.segment}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, segment: e.target.value }))
                }
              />
            </div>
            <div className="mb-2">
              <label className="block text-base font-medium">Status</label>
              <select
                className="w-full border rounded px-2 py-1 text-base"
                value={editForm.status}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, status: e.target.value }))
                }
              >
                <option>Active</option>
                <option>Unsubscribed</option>
                <option>Bounced</option>
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleEditSave}
              >
                Save
              </button>
              <button
                className="bg-gray-200 px-4 py-2 rounded"
                onClick={() => setEditingSubscriberId(null)}
              >
                Cancel
              </button>
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

function Row({
  email,
  name,
  status,
  segment,
  createdAt,
  color,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <tr className="border-t hover:bg-gray-50">
      <td className="p-3">
        <input type="checkbox" className="rounded border-gray-300" />
      </td>
      <td className="p-3 whitespace-nowrap">
        <div className="font-medium text-gray-900">{email}</div>
      </td>
      <td className="p-3 whitespace-nowrap hidden sm:table-cell">
        <div className="text-gray-900">{name}</div>
      </td>
      <td className="p-3 whitespace-nowrap">
        <select
          className={`px-3 py-1 rounded-full text-xs font-semibold focus:outline-none ${
            status === "Active"
              ? "bg-green-100 text-green-600"
              : status === "Unsubscribed"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
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
        <span
          className={`${
            colorMap[color] || "bg-gray-100 text-gray-600"
          } px-2 py-1 rounded-full text-xs font-medium`}
        >
          {segment}
        </span>
      </td>
      <td className="p-3 whitespace-nowrap text-gray-500 hidden lg:table-cell">
        {createdAt
          ? new Date(createdAt).toLocaleString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "-"}
      </td>
      <td className="p-3 whitespace-nowrap space-x-2">
        <button
          className="text-green-600 p-1 rounded hover:bg-green-50"
          title="View"
          onClick={onView}
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          className="text-blue-500 p-1 rounded hover:bg-blue-50"
          title="Edit"
          onClick={onEdit}
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          className="text-red-500 p-1 rounded hover:bg-red-50"
          title="Delete"
          onClick={onDelete}
        >
          <Trash className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
