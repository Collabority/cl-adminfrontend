import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const AppContext = createContext();

const getTabNameFromPath = (pathname) => {
  // Handle /admin/services and its subroutes
  if (pathname.startsWith("/admin/services")) {
    return "Services";
  }
  switch (pathname) {
    case "/":
      return "Dashboard";
    case "/blog":
      case "/blog/create-blog-post":
      return "Blog Management";
    case "/careers":
    case "/careers/create":
      return "Careers";
    case "/services":
      return "Services";
    case "/reviews":
      return "Reviews";
    case "/contact":
      return "Contact Queries";
    case "/newsletter":
      return "Newsletter";
    case "/users":
    case "/users/roles":
    case "/users/roles":
      return "User Management";
    default:
      return "Dashboard";
  }
};

export const AppProvider = ({ children }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() =>
    getTabNameFromPath(location.pathname)
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 🔁 Automatically update activeTab when route changes
  useEffect(() => {
    const tabName = getTabNameFromPath(location.pathname);
    setActiveTab(tabName);
  }, [location.pathname]);


  return (
    <AppContext.Provider
      value={{ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }}
    >
      {children}
    </AppContext.Provider>
  );
};

