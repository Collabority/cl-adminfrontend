import { Link } from "react-router-dom";
import { PiNotePencilBold } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

const services = [
  // Example data
  {
    id: 1,
    title: "Web Development",
    description: "Custom website development services",
    category: "Development",
    status: "Published",
    date: "Jan 15, 2025",
    coverImage:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "iOS and Android app development",
    category: "Development",
    status: "Published",
    date: "Jan 12, 2025",
    coverImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Business Consulting",
    description: "Strategic business consultation",
    category: "Consulting",
    status: "Draft",
    date: "Jan 10, 2025",
    coverImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "UI/UX Design",
    description: "User interface and experience design",
    category: "Design",
    status: "Published",
    date: "Jan 8, 2025",
    coverImage:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
];

const ServicesManagement = () => {
  const [serviceList, setServiceList] = useState(services);
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (!confirmDelete) return;

    const updatedList = serviceList.filter((service) => service.id !== id);
    setServiceList(updatedList);
  };

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
      {/* Top stats section (like blog) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4 shadow-sm bg-white">
          <div>
            <h2 className="text-base text-gray-600 font-semibold">
              Total Services
            </h2>
            <h1 className="text-2xl font-bold">{services.length}</h1>
          </div>
        </div>
        <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4 shadow-sm bg-white">
          <div>
            <h2 className="text-base text-gray-600 font-semibold">Published</h2>
            <h1 className="text-2xl font-bold text-green-600">
              {services.filter((s) => s.status === "Published").length}
            </h1>
          </div>
        </div>
        <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4 shadow-sm bg-white">
          <div>
            <h2 className="text-base text-gray-600 font-semibold">Drafts</h2>
            <h1 className="text-2xl font-bold text-red-600">
              {services.filter((s) => s.status === "Draft").length}
            </h1>
          </div>
        </div>
        <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4 shadow-sm bg-white">
          <div>
            <h2 className="text-base text-gray-600 font-semibold">
              Categories
            </h2>
            <h1 className="text-2xl font-bold text-purple-500">
              {[...new Set(services.map((s) => s.category))].length}
            </h1>
          </div>
        </div>
      </div>
      {/* Filters/search section (like blog) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border border-gray-300 rounded-xl bg-white shadow-sm w-full">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center w-full">
          <input
            type="text"
            placeholder="Search services..."
            className="outline-none bg-transparent w-full sm:w-60 font-semibold border border-gray-300 rounded-lg px-3 py-2"
          />
          <select className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto text-sm text-gray-700 font-semibold">
            <option>All Categories</option>
            <option>Development</option>
            <option>Design</option>
            <option>Consulting</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto text-sm text-gray-700 font-semibold">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
        </div>
      </div>
      {/* Service cards grid (like blog cards) */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
       {serviceList.map((service, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
          >
            {/* Cover Image */}
            <div className="relative">
              <img
                src={service.coverImage}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <span
                className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full ${
                  service.status === "Published"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {service.status}
              </span>
            </div>
            {/* Content */}
            <div className="p-4 flex flex-col gap-2">
              <div className="flex justify-between text-sm text-gray-500 font-medium">
                <span>{service.category}</span>
                <span>{service.date}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                {service.title}
              </h2>
              <p className="text-base font-semibold text-gray-600 line-clamp-3">
                {service.description}
              </p>
              <div className="flex justify-end items-center gap-3 text-xl text-gray-500 mt-2">
                <Link to={`/services/edit/${service.id}`}>
                  <PiNotePencilBold className="cursor-pointer text-blue-500 hover:text-blue-800 transition" />
                </Link>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="cursor-pointer text-red-600 hover:text-red-800 transition"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesManagement;
