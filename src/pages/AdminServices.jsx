import React, { useState } from "react";
import ServiceTable from "../components/admin/ServiceTable";
import ServiceForm from "../components/admin/ServiceForm";

const initialServices = [
  {
    id: 1,
    icon: "FaCode",
    title: "Web Development",
    description: "Custom website development services",
    category: "Development",
    status: "Published",
    order: 1,
    updated: "2025-01-15",
  },
  {
    id: 2,
    icon: "FaMobileAlt",
    title: "Mobile App Development",
    description: "iOS and Android app development",
    category: "Development",
    status: "Published",
    order: 2,
    updated: "2025-01-12",
  },
  {
    id: 3,
    icon: "FaBriefcase",
    title: "Business Consulting",
    description: "Strategic business consultation",
    category: "Consulting",
    status: "Draft",
    order: 3,
    updated: "2025-01-10",
  },
  {
    id: 4,
    icon: "FaPaintBrush",
    title: "UI/UX Design",
    description: "User interface and experience design",
    category: "Design",
    status: "Published",
    order: 4,
    updated: "2025-01-08",
  },
];

const AdminServices = () => {
  const [services, setServices] = useState(initialServices);
  const [showForm, setShowForm] = useState(false);
  const [editService, setEditService] = useState(null);

  // Stats
  const totalServices = services.length;
  const published = services.filter((s) => s.status === "Published").length;
  const draft = services.filter((s) => s.status === "Draft").length;
  const categories = Array.from(new Set(services.map((s) => s.category))).length;

  // CRUD handlers
  const handleAdd = (service) => {
    setServices([
      ...services,
      { ...service, id: Date.now(), order: services.length + 1, updated: new Date().toISOString().slice(0, 10) },
    ]);
    setShowForm(false);
  };
  const handleEdit = (service) => {
    setServices(
      services.map((s) => (s.id === service.id ? { ...service, updated: new Date().toISOString().slice(0, 10) } : s))
    );
    setEditService(null);
    setShowForm(false);
  };
  const handleDelete = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };
  const handleShowEdit = (service) => {
    setEditService(service);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F3] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
          <button
            className="bg-[#008080] text-white px-6 py-2 rounded font-medium hover:bg-gray-900"
            onClick={() => {
              setEditService(null);
              setShowForm(true);
            }}
          >
            + Add New Service
          </button>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <span className="text-2xl font-bold">{totalServices}</span>
            <span className="text-gray-500 text-sm">Total Services</span>
          </div>
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <span className="text-2xl font-bold">{published}</span>
            <span className="text-gray-500 text-sm">Published</span>
          </div>
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <span className="text-2xl font-bold">{draft}</span>
            <span className="text-gray-500 text-sm">Draft</span>
          </div>
          <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <span className="text-2xl font-bold">{categories}</span>
            <span className="text-gray-500 text-sm">Categories</span>
          </div>
        </div>
        {/* Table & Filters */}
        <ServiceTable
          services={services}
          onEdit={handleShowEdit}
          onDelete={handleDelete}
        />
        {/* Modal for Add/Edit */}
        {showForm && (
          <ServiceForm
            onClose={() => setShowForm(false)}
            onSubmit={editService ? handleEdit : handleAdd}
            initialData={editService}
          />
        )}
      </div>
    </div>
  );
};

export default AdminServices; 