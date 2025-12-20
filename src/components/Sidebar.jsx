import React, { useRef, useEffect, useContext, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import { FaBlog, FaUsers, FaLock } from "react-icons/fa"; 
import { PiSuitcaseSimpleBold } from "react-icons/pi";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { FaStar, FaNewspaper } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import { AppContext } from "../context/AppContext";
import { useLogout } from "../hooks/useLogout";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const logout = useLogout();
  const location = useLocation();
  const path = location.pathname;

  // 1. Get User Data
  const user = useSelector((state) => state.auth.user);
  const currentUser = user?.admin || user || {};

  // 2. Extract Permissions (Unified Logic)
  // We merge all permission locations into one array so we find them wherever they are
  const allPerms = [
    ...(currentUser.contentPermissions || []),
    ...(currentUser.adminPermission || []),
    ...(currentUser.AdminPermissions || []) 
  ];

  // Access is granted if Role is 'Admin' OR Email contains 'collabority' 
  const isMainAdmin = 
    (currentUser.role === "Admin") || 
    (currentUser.email && currentUser.email.toLowerCase().includes("collabority"));

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

  // Helper for active state styles
  const isActive = (tabPath) => {
    if (tabPath === "/") return path === "/";
    return path.startsWith(tabPath);
  };

  // 3. Admin Image Logic
  const adminImage =
    currentUser.profilePicture || currentUser.image ||
    "https://res.cloudinary.com/dxo7rbhrl/image/upload/v1756140314/UnknownPerson_ybjokv.jpg";

  const adminName = currentUser?.firstname 
    ? `${currentUser.firstname} ${currentUser.lastname || ""}` 
    : (currentUser?.name || "Guest");

  const adminEmail = currentUser?.email || "No Account";

  // 4. Menu Configuration
  const menuItems = useMemo(() => [
    {
      path: "/",
      label: "Dashboard",
      icon: BsGraphUp,
      hasAccess: true // Everyone sees Dashboard
    },
    {
      path: "/blog",
      label: "Blog Management",
      icon: FaBlog,
      hasAccess: isMainAdmin || allPerms.includes("blogmgmt")
    },
    {
      path: "/careers",
      label: "Careers",
      icon: PiSuitcaseSimpleBold,
      hasAccess: isMainAdmin || allPerms.includes("careermgmt")
    },
    {
      path: "/services",
      label: "Services",
      icon: MdOutlineMiscellaneousServices,
      // Checks both spellings to be safe
      hasAccess: isMainAdmin || allPerms.includes("servicemgmt") || allPerms.includes("servicesmgmt")
    },
    {
      path: "/reviews",
      label: "Reviews",
      icon: FaStar,
      hasAccess: isMainAdmin || allPerms.includes("reviewmgmt")
    },
    {
      path: "/contact",
      label: "Contact Queries",
      icon: IoMdMail,
      hasAccess: isMainAdmin || allPerms.includes("contactmgmt") || allPerms.includes("adminmgmt")
    },
    {
      path: "/newsletter",
      label: "Newsletter",
      icon: FaNewspaper,
      hasAccess: isMainAdmin || allPerms.includes("newslettermgmt")
    },
    {
      path: "/createCampaign",
      label: "Create Campaign",
      icon: IoMdMail,
      hasAccess: isMainAdmin || allPerms.includes("newslettermgmt")
    },
    {
      path: "/users",
      label: "User Management",
      icon: FaUsers,
      hasAccess: isMainAdmin || allPerms.includes("usermgmt")
    },
  ], [isMainAdmin, allPerms]);

  return (
    <div
      ref={sidebarRef}
      className={`
        fixed top-20 left-0 z-50 h-[calc(100vh-80px)] bg-white border-r border-gray-300 p-5 flex flex-col justify-between
        w-3/4 sm:w-64
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0 sm:static sm:h-auto
      `}
      aria-label="Sidebar"
    >
      {/* Navigation Links */}
      <div className="flex flex-col gap-3 overflow-y-auto">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);

          // --- LOGIC FOR DISABLED ITEMS ---
          if (!item.hasAccess) {
            return (
              <div 
                key={item.path}
                className="flex items-center gap-3 p-2 rounded cursor-not-allowed opacity-50 bg-gray-50 text-gray-400 group relative"
                title="You do not have permission to access this module"
              >
                <IconComponent className="text-xl" />
                <h5 className="font-semibold text-sm flex-1">{item.label}</h5>
                <FaLock className="text-xs" /> {/* Lock Icon */}
              </div>
            );
          }

          // --- LOGIC FOR ACTIVE ITEMS ---
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-blue-100 group transition-colors duration-200 ${
                active ? "bg-blue-100" : ""
              }`}
              onClick={() => {
                 if(window.innerWidth < 640) setIsSidebarOpen(false);
              }}
            >
              <IconComponent className={`text-xl group-hover:text-blue-500 ${active ? "text-blue-500" : "text-black"}`} />
              <h5 className={`font-semibold text-sm group-hover:text-blue-500 ${active ? "text-blue-500" : "text-gray-600"}`}>
                {item.label}
              </h5>
            </Link>
          );
        })}
      </div>

      {/* Admin Section at Bottom */}
      <div className="pt-4 mt-4 border-t border-gray-300 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-hidden">
          <img
            src={adminImage}
            alt={adminName}
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />


          <div className="flex flex-col text-left overflow-hidden">
            <p className="text-sm font-semibold text-gray-800 truncate" title={adminName}>
              {adminName}
            </p>
            <p className="text-xs text-gray-500 truncate" title={adminEmail}>
              {adminEmail}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          aria-label="Logout"
          className="bg-gray-100 hover:bg-red-100 p-2 rounded-full transition-colors"
          title="Logout"
        >
          <RxExit className="text-xl text-gray-600 hover:text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;