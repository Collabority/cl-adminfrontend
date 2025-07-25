import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { LuRefreshCw } from "react-icons/lu";

const MiddleSection = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 border border-gray-300 rounded-xl bg-white shadow-sm w-full">
      {/* Left section: search and filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center w-full">
        {/* Search bar */}
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto">
          <IoMdSearch className="text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none bg-transparent w-full sm:w-60 font-semibold"
          />
        </div>

        {/* Category select */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto text-sm text-gray-700 font-semibold"
        >
          <option>All Categories</option>
          <option>Technology</option>
          <option>Design</option>
          <option>Business</option>
          <option>Marketing</option>
        </select>

        {/* Status select */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto text-sm text-gray-700 font-semibold"
        >
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
          <option>Scheduled</option>
        </select>
      </div>

      {/* Right section: icons */}
      <div className="flex items-center gap-4 text-gray-600 text-xl self-end md:self-auto">
        <FaFilter className="cursor-pointer hover:text-black transition" />
        {/* refresh filter reset to defaults */}
        <LuRefreshCw
          className="cursor-pointer hover:text-black transition"
          onClick={() => {
            setSearchTerm("");
            setSelectedCategory("All Categories");
            setSelectedStatus("All Status");
          }}
        />
      </div>
    </div>
  );
};

export default MiddleSection;
