import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PiNotePencilBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import useGetAllServices from "../hooks/servicesHooks/useGetAllServices";
import useServiceStats from "../hooks/servicesHooks/useServiceStats";
import instance from "../lib/axios";

const ServicesManagement = () => {
  // 1. Fetch Data
  const { services, loading: listLoading, refetch: refetchServices } = useGetAllServices();
  const { stats, loading: statsLoading, refetchStats } = useServiceStats();

  // 2. Add State for Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterStatus, setFilterStatus] = useState("All Status");

  // 3. Filter Logic (The Magic Part)
  const filteredServices = services.filter((service) => {
    const safeTitle = (service.title || "").toLowerCase();
    const safeDesc = (service.description || "").toLowerCase();
    const searchLower = searchTerm.toLowerCase();

    const matchesSearch = 
      safeTitle.includes(searchLower) ||
      safeDesc.includes(searchLower);

    // B. Category Filter
    const matchesCategory = 
      filterCategory === "All Categories" || 
      service.category === filterCategory;

    // C. Status Filter
    const currentStatus = service.publishStatus || service.status || "Draft";
    const matchesStatus = 
      filterStatus === "All Status" || 
      currentStatus.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDeleteService = async (serviceId) => {
    if(!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      await instance.delete(`/services/delete/${serviceId}`);
      await Promise.all([refetchServices(), refetchStats()]);
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete service");
    }
  };

  if (listLoading) {
    return <div className="p-8">Loading services...</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex justify-end">
        <Link
          to="/services/create"
          className="flex items-center gap-3 px-4 py-2 bg-[#1447E6] text-white rounded font-semibold hover:bg-[#0f36a8]"
        >
          + Create New Service
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4 shadow-sm bg-white">
          <div>
            <h2 className="text-base text-gray-600 font-semibold">Total Services</h2>
            <h1 className="text-2xl font-bold">{statsLoading ? "..." : stats.total}</h1>
          </div>
        </div>
        <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4 shadow-sm bg-white">
          <div>
            <h2 className="text-base text-gray-600 font-semibold">Published</h2>
            <h1 className="text-2xl font-bold text-green-600">{statsLoading ? "..." : stats.published}</h1>
          </div>
        </div>
        <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4 shadow-sm bg-white">
          <div>
            <h2 className="text-base text-gray-600 font-semibold">Drafts</h2>
            <h1 className="text-2xl font-bold text-red-600">{statsLoading ? "..." : stats.draft}</h1>
          </div>
        </div>
      </div>

      {/* --- FILTERS SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border border-gray-300 rounded-xl bg-white shadow-sm w-full">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center w-full">
          
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search services..."
            className="outline-none bg-transparent w-full sm:w-60 font-semibold border border-gray-300 rounded-lg px-3 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Category Dropdown */}
          <select 
            className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto text-sm text-gray-700 font-semibold"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Development</option>
            <option>Design</option>
            <option>Consulting</option>
          </select>

          {/* Status Dropdown */}
          <select 
            className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto text-sm text-gray-700 font-semibold"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>

        </div>
        
        {/* Results Count Helper */}
        <div className="text-sm text-gray-500 font-semibold whitespace-nowrap">
          Showing {filteredServices.length} result(s)
        </div>
      </div>

      {/* --- SERVICES GRID --- */}
      {/* 4. Map over filteredServices instead of services */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service._id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
          >
            <div className="relative">
              <img
                src={service.coverImage || "https://via.placeholder.com/400x200?text=No+Image"}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <span
                className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full font-bold ${
                  (service.publishStatus || service.status) === "Published"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {service.publishStatus || service.status}
              </span>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm text-gray-500 font-medium">
                <span>{service.category}</span>
                <span>
                  {service.publishDate 
                    ? new Date(service.publishDate).toLocaleDateString() 
                    : "No Date"}
                </span>
              </div>
              <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {service.title}
              </h2>
              <div
                className="text-sm font-medium text-gray-600 line-clamp-3 min-h-[4.5em]"
                dangerouslySetInnerHTML={{ __html: service.description || "" }}
              />
              <div className="flex justify-end items-center gap-3 text-xl text-gray-500 mt-2">
                <Link to={`/services/edit/${service._id}`}>
                  <PiNotePencilBold className="cursor-pointer text-blue-500 hover:text-blue-800 transition" />
                </Link>
                <button onClick={() => handleDeleteService(service._id)}>
                  <MdDelete className="cursor-pointer text-red-600 hover:text-red-800 transition" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredServices.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-500 font-semibold">
            No services match your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesManagement;