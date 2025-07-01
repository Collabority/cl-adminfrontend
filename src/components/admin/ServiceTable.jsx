import React from "react";

const ServiceTable = ({ services }) => {
  return (
    <div className="bg-white rounded shadow p-4 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-[#F8F6F3] text-gray-700">
            <th className="py-2 px-4 text-left">Icon</th>
            <th className="py-2 px-4 text-left">Title</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-left">Category</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Order</th>
            <th className="py-2 px-4 text-left">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id} className="border-b hover:bg-[#f0f4f8]">
              <td className="py-2 px-4 text-xs text-gray-500">{service.icon}</td>
              <td className="py-2 px-4 font-semibold">{service.title}</td>
              <td className="py-2 px-4 text-gray-600">{service.description}</td>
              <td className="py-2 px-4">{service.category}</td>
              <td className="py-2 px-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${service.status === "Published" ? "bg-[#008080] text-white" : "bg-gray-300 text-gray-700"}`}>
                  {service.status}
                </span>
              </td>
              <td className="py-2 px-4">{service.order}</td>
              <td className="py-2 px-4">{service.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ServiceTable; 