import React, { useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import { FaBlog, FaUsers } from "react-icons/fa";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { FaStar, FaNewspaper } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import { AppContext } from "../context/AppContext";

const Sidebar = () => {
  const { activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen } =
    useContext(AppContext);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 640
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen, setIsSidebarOpen]);

  const getItemClasses = (tab) =>
    `flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-blue-100 group ${
      activeTab === tab ? "bg-blue-100" : ""
    }`;

  const getIconClasses = (tab) =>
    `text-2xl group-hover:text-blue-500 ${
      activeTab === tab ? "text-blue-500" : "text-black"
    }`;

  const getTextClasses = (tab) =>
    `font-bold group-hover:text-blue-500 ${
      activeTab === tab ? "text-blue-500" : "text-gray-500"
    }`;

  return (
    <div
      ref={sidebarRef}
      className={`
        fixed top-20 left-0 z-50 h-full bg-white border-r border-gray-300 p-5 flex flex-col md:justify-between
        w-3/4 sm:w-1/4
        transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0 sm:static
      `}
    >
      {/* Navigation Links */}
      <div className="flex flex-col gap-5">
        <Link
          to="/"
          onClick={() => setActiveTab("Dashboard")}
          className={getItemClasses("Dashboard")}
        >
          <BsGraphUp className={getIconClasses("Dashboard")} />
          <h5 className={getTextClasses("Dashboard")}>Dashboard</h5>
        </Link>

        <Link
          to="/blog"
          onClick={() => setActiveTab("Blog Management")}
          className={getItemClasses("Blog Management")}
        >
          <FaBlog className={getIconClasses("Blog Management")} />
          <h5 className={getTextClasses("Blog Management")}>Blog Management</h5>
        </Link>

        <Link
          to="/careers"
          onClick={() => setActiveTab("Careers")}
          className={getItemClasses("Careers")}
        >
          <PiSuitcaseSimpleBold className={getIconClasses("Careers")} />
          <h5 className={getTextClasses("Careers")}>Careers</h5>
        </Link>

        <Link
          to="/services"
          onClick={() => setActiveTab("Services")}
          className={getItemClasses("Services")}
        >
          <MdOutlineMiscellaneousServices
            className={getIconClasses("Services")}
          />
          <h5 className={getTextClasses("Services")}>Services</h5>
        </Link>

        <Link
          to="/reviews"
          onClick={() => setActiveTab("Reviews")}
          className={getItemClasses("Reviews")}
        >
          <FaStar className={getIconClasses("Reviews")} />
          <h5 className={getTextClasses("Reviews")}>Reviews</h5>
        </Link>

        <Link
          to="/contact"
          onClick={() => setActiveTab("Contact Queries")}
          className={getItemClasses("Contact Queries")}
        >
          <IoMdMail className={getIconClasses("Contact Queries")} />
          <h5 className={getTextClasses("Contact Queries")}>Contact Queries</h5>
        </Link>

        <Link
          to="/newsletter"
          onClick={() => setActiveTab("Newsletter")}
          className={getItemClasses("Newsletter")}
        >
          <FaNewspaper className={getIconClasses("Newsletter")} />
          <h5 className={getTextClasses("Newsletter")}>Newsletter</h5>
        </Link>

        <Link
          to="/users"
          onClick={() => setActiveTab("User Management")}
          className={getItemClasses("User Management")}
        >
          <FaUsers className={getIconClasses("User Management")} />
          <h5 className={getTextClasses("User Management")}>User Management</h5>
        </Link>
      </div>

      {/* Admin Section at Bottom */}
      <div className=" pt-4 border-t border-gray-300 flex items-center justify-between gap-3">
        {/* Left: Profile Pic */}
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Admin"
          className="w-10 h-10 rounded-full object-cover"
        />

        {/* Center: Admin Info */}
        <div className="flex flex-col text-center">
          <p className="text-sm font-semibold text-gray-700">Admin</p>
          <p className="text-xs text-gray-500">admin@company.com</p>
        </div>

        {/* Right: Logout Icon */}
        <RxExit
          className="text-xl text-gray-600 hover:text-red-500 cursor-pointer"
          title="Logout"
        />
      </div>
    </div>
  );
};

export default Sidebar;
