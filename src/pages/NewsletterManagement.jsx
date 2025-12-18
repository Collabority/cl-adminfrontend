import React, { useState, useEffect } from "react";
import { Pencil, Trash, Eye, Mail, Send, Users } from "lucide-react"; 
import { Link } from "react-router-dom"; 
import instance from "../lib/axios";
import { SubscribersDetails } from "../components/SubscribersDetails";
import AddNewSubscriber from "./AddNewSubscriber"; 
import EditSubscriber from "./EditSubscriber"; 
import { CampaignDetailsModal } from "../components/CampaignDetailsModal";


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
  // --- TABS STATE ---
  const [activeTab, setActiveTab] = useState("subscribers");

  // --- SUBSCRIBER STATE ---
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All Status");
  const [segment, setSegment] = useState("All Segments");
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  
  const [editingSubscriber, setEditingSubscriber] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);

  // --- CAMPAIGN STATE ---
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null); 
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Optional: global loading state
      await Promise.all([
        getAllNewsletterMembers(),
        getAllCampaigns()
      ]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

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
          // Pass fields for edit
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

  // Fetch campaigns
  async function getAllCampaigns() {
    try {
      const response = await instance.get("/campaigns/all");
      setCampaigns(response.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch campaigns:", err);
    }
  }

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

  // --- SUBSCRIBER Handlers ---

  const handleView = (subscriber) => {
    setSelectedSubscriber(subscriber);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubscriber(null);
  };

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

  const handleEditClick = (sub) => {
    setEditingSubscriber(sub); 
  };

  const handleUpdateSubscriber = async (id, updatedData) => {
    setIsLoading(true);
    try {
      await instance.put(`/newsletter/update/${id}`, updatedData);
      setSubscribers((prev) =>
        prev.map((s) => (s._id === id ? { 
            ...s, 
            ...updatedData, 
            color: segmentToColor(updatedData.segment) 
        } : s))
      );
      setEditingSubscriber(null); 
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

  // --- CAMPAIGN HANDLERS ---

  const handleSendCampaign = async (campaignId) => {
    if (!window.confirm("Are you sure you want to send this campaign to ALL subscribers?")) {
      return;
    }

    setIsLoading(true);
    try {
      await instance.post("/campaigns/send", { campaignId });
      alert("Campaign sent successfully!");
      getAllCampaigns(); 
    } catch (err) {
      console.error("Failed to send campaign:", err);
      alert("Failed to send campaign. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  // NEW: Delete Campaign
  const handleDeleteCampaign = async (id) => {
    if (!window.confirm("Are you sure you want to delete this campaign? This cannot be undone.")) {
      return;
    }
    try {
      await instance.delete(`/campaigns/delete/${id}`);
      setCampaigns(prev => prev.filter(c => c._id !== id));
      setIsCampaignModalOpen(false);
      alert("Campaign deleted successfully.");
    } catch (err) {
      console.error("Failed to delete campaign:", err);
      alert("Failed to delete campaign.");
    }
  };

  // NEW: Open Modal
  const handleViewCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setIsCampaignModalOpen(true);
  };

  const stats = React.useMemo(() => {
    let totalSent = 0;
    let totalOpens = 0;
    let totalClicks = 0;

    campaigns.forEach(camp => {
      if (camp.status === 'Sent') {
        totalSent += (camp.recipientCount || 0);
        totalOpens += (camp.stats?.opens || 0);
        totalClicks += (camp.stats?.clicks || 0);
      }
    });

    const openRate = totalSent > 0 ? ((totalOpens / totalSent) * 100).toFixed(1) : 0;
    const clickRate = totalSent > 0 ? ((totalClicks / totalSent) * 100).toFixed(1) : 0;

    const totalSubs = subscribers.length;
    const unsubscribed = subscribers.filter(s => s.status === 'Unsubscribed').length;
    const unsubRate = totalSubs > 0 ? ((unsubscribed / totalSubs) * 100).toFixed(1) : 0;

    return {
      totalSubscribers: totalSubs,
      openRate,
      clickRate,
      unsubRate
    };
  }, [campaigns, subscribers]);

  // --- CONDITIONAL VIEWS ---

  if (isAdding) {
    return (
      <AddNewSubscriber 
        onSave={handleAddSave} 
        onCancel={() => setIsAdding(false)} 
        isLoading={isLoading} 
      />
    );
  }

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
        
        <Link to="/createCampaign">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-2">
            <Mail size={18} />
            Create Campaign
          </button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card 
          title="Total Subscribers" 
          value={stats.totalSubscribers.toLocaleString()} 
          icon="👥" 
          delta="+12.5%" 
          deltaColor="text-green-500" 
        />
        <Card 
          title="Open Rate" 
          value={`${stats.openRate}%`} 
          icon="📨" 
          delta="+2.1%" 
          deltaColor="text-blue-500" 
        />
        <Card 
          title="Click Rate" 
          value={`${stats.clickRate}%`} 
          icon="🖱️" 
          delta="-0.5%" 
          deltaColor="text-red-500" 
        />
        <Card 
          title="Unsubscribe Rate" 
          value={`${stats.unsubRate}%`} 
          icon="👤" 
          delta="-0.2%" 
          deltaColor="text-green-500" 
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("subscribers")}
          className={`pb-2 px-4 font-medium transition-colors relative ${
            activeTab === "subscribers" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Subscribers ({subscribers.length})
        </button>
        <button
          onClick={() => setActiveTab("campaigns")}
          className={`pb-2 px-4 font-medium transition-colors relative ${
            activeTab === "campaigns" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Campaigns ({campaigns.length})
        </button>
      </div>

      {/* --- TAB CONTENT: SUBSCRIBERS --- */}
      {activeTab === "subscribers" && (
        <>
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
                    onEdit={() => handleEditClick(sub)}
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
        </>
      )}

      {/* --- TAB CONTENT: CAMPAIGNS --- */}
      {activeTab === "campaigns" && (
        <>
          <div className="grid gap-4">
            {campaigns.length === 0 ? (
              <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <Mail className="mx-auto text-gray-400 mb-2" size={48} />
                <h3 className="text-lg font-medium text-gray-900">No campaigns yet</h3>
                <p className="text-gray-500 mb-4">Create your first newsletter to engage with your subscribers.</p>
                <Link to="/createCampaign">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Create Campaign</button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                  <div 
                    key={campaign._id} 
                    // Make card clickable
                    onClick={() => handleViewCampaign(campaign)}
                    className="group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between cursor-pointer hover:border-purple-300"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                          campaign.status === 'Sent' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {campaign.status}
                        </span>

                         {/* Delete Icon */}
                         <button 
                          onClick={(e) => {
                            e.stopPropagation(); // Stop click from opening modal
                            handleDeleteCampaign(campaign._id);
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          title="Delete Campaign"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-purple-600">
                        {campaign.campaignName}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">Subject: {campaign.subjectLine}</p>
                    </div>
                    
                    <div className="border-t pt-4 flex justify-between items-center">
                      <div className="flex items-center text-gray-500 text-sm gap-3">
                        <div className="flex items-center gap-1" title="Recipients">
                          <Users size={14} /> {campaign.recipientCount || 0}
                        </div>
                        {/* Show opens if sent */}
                        {campaign.status === 'Sent' && (
                          <div className="flex items-center gap-1 text-green-600" title="Opens">
                            <Mail size={14} /> {campaign.stats?.opens || 0}
                          </div>
                        )}
                      </div>

                      {campaign.status === "Draft" ? (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); 
                            handleSendCampaign(campaign._id);
                          }}
                          disabled={isLoading} 
                          className={`flex items-center gap-2 text-sm text-white px-3 py-1.5 rounded transition-colors ${
                            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          <Send size={14} /> 
                          {isLoading ? "..." : "Send"} 
                        </button>
                      ) : (
                        <span className="flex items-center gap-1 text-sm text-purple-600 font-medium">
                          <Eye size={14} /> View Report
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* CAMPAIGN DETAILS MODAL */}
          <CampaignDetailsModal 
            isOpen={isCampaignModalOpen}
            onClose={() => setIsCampaignModalOpen(false)}
            campaign={selectedCampaign}
            onDelete={handleDeleteCampaign}
          />
        </>
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