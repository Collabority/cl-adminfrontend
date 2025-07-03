import React, { useRef, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import { FaBlog, FaUsers } from "react-icons/fa";
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { FaStar, FaNewspaper } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import { AppContext } from "../context/AppContext";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);
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

  const isActive = (tabPath) => {
    if (tabPath === "/") {
      return path === "/";
    }
    return path.startsWith(tabPath);
  };

  const getItemClasses = (tabPath) =>
    `flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-blue-100 group ${
      isActive(tabPath) ? "bg-blue-100" : ""
    }`;

  const getIconClasses = (tabPath) =>
    `text-2xl group-hover:text-blue-500 ${
      isActive(tabPath) ? "text-blue-500" : "text-black"
    }`;

  const getTextClasses = (tabPath) =>
    `font-bold group-hover:text-blue-500 ${
      isActive(tabPath) ? "text-blue-500" : "text-gray-500"
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
        <Link to="/" className={getItemClasses("/")}>
          <BsGraphUp className={getIconClasses("/")} />
          <h5 className={getTextClasses("/")}>Dashboard</h5>
        </Link>

        <Link to="/blog" className={getItemClasses("/blog")}>
          <FaBlog className={getIconClasses("/blog")} />
          <h5 className={getTextClasses("/blog")}>Blog Management</h5>
        </Link>

        <Link to="/careers" className={getItemClasses("/careers")}>
          <PiSuitcaseSimpleBold className={getIconClasses("/careers")} />
          <h5 className={getTextClasses("/careers")}>Careers</h5>
        </Link>

        <Link to="/services" className={getItemClasses("/services")}>
          <MdOutlineMiscellaneousServices className={getIconClasses("/services")} />
          <h5 className={getTextClasses("/services")}>Services</h5>
        </Link>

        <Link to="/reviews" className={getItemClasses("/reviews")}>
          <FaStar className={getIconClasses("/reviews")} />
          <h5 className={getTextClasses("/reviews")}>Reviews</h5>
        </Link>

        <Link to="/contact" className={getItemClasses("/contact")}>
          <IoMdMail className={getIconClasses("/contact")} />
          <h5 className={getTextClasses("/contact")}>Contact Queries</h5>
        </Link>

        <Link to="/newsletter" className={getItemClasses("/newsletter")}>
          <FaNewspaper className={getIconClasses("/newsletter")} />
          <h5 className={getTextClasses("/newsletter")}>Newsletter</h5>
        </Link>

        <Link to="/users" className={getItemClasses("/users")}>
          <FaUsers className={getIconClasses("/users")} />
          <h5 className={getTextClasses("/users")}>User Management</h5>
        </Link>
      </div>

      {/* Admin Section at Bottom */}
      <div className="pt-4 border-t border-gray-300 flex items-center justify-between gap-3">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Admin"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col text-center">
          <p className="text-sm font-semibold text-gray-700">Admin</p>
          <p className="text-xs text-gray-500">admin@company.com</p>
        </div>
        <RxExit
          className="text-xl text-gray-600 hover:text-red-500 cursor-pointer"
          title="Logout"
        />
      </div>
    </div>
  );
};

export default Sidebar;
